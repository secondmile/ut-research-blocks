<?php
/**
 * Main App class for UT Research Blocks plugin.
 *
 * @package UTResearchBlocks
 */

namespace UTResearchBlocks\Core;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load dependent classes.
require_once __DIR__ . '/class-block-styles.php';
require_once __DIR__ . '/class-pattern-exporter.php';

/**
 * Main App class that bootstraps the plugin.
 */
final class App {

	/**
	 * Singleton instance.
	 *
	 * @var self
	 */
	private static $instance = null;

	/**
	 * Get singleton instance.
	 *
	 * @return self
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Array to track which components are used on the current page.
	 *
	 * @var array
	 */
	private $used_components = array();

	/**
	 * Cached list of available component CSS files.
	 *
	 * @var array|null
	 */
	private $component_list = null;

	/**
	 * Boot the plugin.
	 *
	 * @return void
	 */
	public function boot() {
		add_filter( 'block_categories_all', array( $this, 'register_block_category' ), 10, 1 );
		add_action( 'init', array( $this, 'register_blocks' ) );
		add_action( 'init', array( $this, 'register_patterns' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );

		// Track component usage on frontend only.
		if ( ! is_admin() ) {
			add_filter( 'render_block', array( $this, 'track_component_usage' ), 10, 2 );
		}

		// Register block styles and pattern exporter.
		( new Block_Styles() )->register();
		( new Pattern_Exporter() )->register();
	}

	/**
	 * Get available component CSS files with caching.
	 *
	 * @return array Array of component CSS file paths.
	 */
	private function get_available_components() {
		// Return cached list if already loaded.
		if ( null !== $this->component_list ) {
			return $this->component_list;
		}

		$components_dir  = UT_RESEARCH_BLOCKS_DIR . 'build/components/';
		$component_files = glob( $components_dir . '*.css' );

		// Cache the result (even if empty) to avoid repeated glob() calls.
		$this->component_list = is_array( $component_files ) ? $component_files : array();

		return $this->component_list;
	}

	/**
	 * Register custom block category.
	 *
	 * @param array $categories Existing categories.
	 * @return array Modified categories.
	 */
	public function register_block_category( $categories ) {
		// Ensure $categories is always an array.
		if ( ! is_array( $categories ) ) {
			$categories = array();
		}

		return array_merge(
			array(
				array(
					'slug'  => 'ut-research',
					'title' => __( 'UT Research', 'ut-research-blocks' ),
					'icon'  => 'welcome-learn-more',
				),
			),
			$categories
		);
	}

	/**
	 * Register custom blocks.
	 *
	 * @return void
	 */
	public function register_blocks() {
		// Auto-register all blocks from build/blocks/.
		$block_json_files = glob( UT_RESEARCH_BLOCKS_DIR . 'build/blocks/*/block.json' );

		if ( is_array( $block_json_files ) && ! empty( $block_json_files ) ) {
			foreach ( $block_json_files as $block_json ) {
				register_block_type( dirname( $block_json ) );
			}
		}
	}

	/**
	 * Register block patterns.
	 *
	 * @return void
	 */
	public function register_patterns() {
		// Register category.
		register_block_pattern_category(
			'ut-research-patterns',
			array(
				'label'       => __( 'UT Research', 'ut-research-blocks' ),
				'description' => __( 'Research-focused layouts and components', 'ut-research-blocks' ),
			)
		);

		// Auto-register all pattern files.
		$pattern_files = glob( UT_RESEARCH_BLOCKS_DIR . 'src/patterns/*.php' );

		if ( is_array( $pattern_files ) && ! empty( $pattern_files ) ) {
			foreach ( $pattern_files as $file ) {
				$headers = get_file_data(
					$file,
					array(
						'title'       => 'Title',
						'slug'        => 'Slug',
						'description' => 'Description',
						'categories'  => 'Categories',
						'keywords'    => 'Keywords',
						'viewport'    => 'Viewport Width',
					)
				);

				if ( empty( $headers['title'] ) || empty( $headers['slug'] ) ) {
					continue;
				}

				ob_start();
				include $file;
				$content = ob_get_clean();

				register_block_pattern(
					$headers['slug'],
					array(
						'title'         => $headers['title'],
						'description'   => $headers['description'] ?? '',
						'content'       => $content,
						'categories'    => array_map( 'trim', explode( ',', $headers['categories'] ) ),
						'keywords'      => array_map( 'trim', explode( ',', $headers['keywords'] ) ),
						'viewportWidth' => (int) ( $headers['viewport'] ?? 1500 ),
					)
				);
			}
		}
	}

	/**
	 * Enqueue frontend assets.
	 *
	 * @return void
	 */
	public function enqueue_frontend_assets() {
		$asset_file = UT_RESEARCH_BLOCKS_DIR . 'build/global.asset.php';
		$css_file   = UT_RESEARCH_BLOCKS_DIR . 'build/global.css';
		$js_file    = UT_RESEARCH_BLOCKS_DIR . 'build/global.js';

		// Check for existence of all required files before proceeding.
		if ( ! file_exists( $asset_file ) || ! file_exists( $css_file ) || ! file_exists( $js_file ) ) {
			return;
		}

		$metadata = $this->get_asset_metadata( $asset_file );

		$handle = 'ut-research-blocks';

		wp_enqueue_style(
			$handle,
			UT_RESEARCH_BLOCKS_URL . 'build/global.css',
			$metadata['dependencies'],
			$metadata['version']
		);

		$this->enqueue_component_styles();

		$this->enqueue_inline_css( $handle );

		wp_enqueue_script(
			$handle,
			UT_RESEARCH_BLOCKS_URL . 'build/global.js',
			$metadata['dependencies'],
			$metadata['version'],
			true // In footer for better performance.
		);
	}

	/**
	 * Track which components are used on the current page by detecting CSS class names.
	 *
	 * @param string $block_content The block content.
	 * @param array  $block The block being rendered.
	 * @return string The unmodified block content.
	 */
	public function track_component_usage( $block_content, $block ) {
		// Skip tracking for hidden blocks. Note: only skips if the block itself is hidden,
		// not if only its parent is hidden.
		if ( isset( $block['attrs']['metadata']['blockVisibility'] ) && ! $block['attrs']['metadata']['blockVisibility'] ) {
			return $block_content;
		}

		// Get all available component CSS files (cached) to build a list of component names.
		$component_files = $this->get_available_components();

		if ( empty( $component_files ) ) {
			return $block_content;
		}

		// Check if any component CSS class is present in the block content.
		foreach ( $component_files as $css_file ) {
			$component_name = basename( $css_file, '.css' );
			$class_name     = 'utrb-' . $component_name;

			// If the component's CSS class is found in the block content, mark it as used.
			if ( strpos( $block_content, $class_name ) !== false ) {
				$this->used_components[ $component_name ] = true;
			}
		}

		return $block_content;
	}

	/**
	 * Get list of components to enqueue based on context (frontend vs editor).
	 *
	 * @return array Array of component names to enqueue.
	 */
	private function get_components_to_enqueue() {
		// In editor, enqueue all components for WYSIWYG.
		if ( is_admin() ) {
			$component_files = $this->get_available_components();
			$components      = array();

			foreach ( $component_files as $css_file ) {
				$components[] = basename( $css_file, '.css' );
			}

			return $components;
		}

		// On frontend, only enqueue components that are actually used.
		$components = array();
		foreach ( $this->used_components as $component_name => $used ) {
			if ( $used ) {
				$components[] = $component_name;
			}
		}

		return $components;
	}

	/**
	 * Enqueue a single component CSS file.
	 *
	 * @param string $component_name The component name (without .css extension).
	 * @return void
	 */
	private function enqueue_single_component( $component_name ) {
		$components_dir = UT_RESEARCH_BLOCKS_DIR . 'build/components/';
		$css_file       = $components_dir . $component_name . '.css';

		// Only enqueue if the CSS file exists.
		if ( ! file_exists( $css_file ) ) {
			return;
		}

		$handle     = 'ut-research-blocks-' . $component_name;
		$asset_file = $components_dir . $component_name . '.asset.php';
		$metadata   = $this->get_asset_metadata( $asset_file );

		wp_enqueue_style(
			$handle,
			UT_RESEARCH_BLOCKS_URL . 'build/components/' . $component_name . '.css',
			$metadata['dependencies'],
			$metadata['version']
		);
	}

	/**
	 * Enqueue individual component CSS files.
	 *
	 * @return void
	 */
	private function enqueue_component_styles() {
		$components = $this->get_components_to_enqueue();

		foreach ( $components as $component_name ) {
			$this->enqueue_single_component( $component_name );
		}
	}

	/**
	 * Enqueue editor assets.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets() {
		// Same styles in editor for WYSIWYG.
		$css_file   = UT_RESEARCH_BLOCKS_DIR . 'build/global.css';
		$asset_file = UT_RESEARCH_BLOCKS_DIR . 'build/global.asset.php';

		// Check for existence of all required files before proceeding.
		if ( ! file_exists( $css_file ) || ! file_exists( $asset_file ) ) {
			return;
		}

		$metadata = $this->get_asset_metadata( $asset_file );

		$handle = 'ut-research-blocks-editor';

		wp_enqueue_style(
			$handle,
			UT_RESEARCH_BLOCKS_URL . 'build/global.css',
			$metadata['dependencies'],
			$metadata['version']
		);

		$this->enqueue_component_styles();

		$this->enqueue_inline_css( $handle );
	}

	/**
	 * Get asset metadata from asset.php file.
	 *
	 * @param string $asset_file Path to the asset.php file.
	 * @return array Array with 'version' and 'dependencies' keys.
	 */
	private function get_asset_metadata( $asset_file ) {
		$version      = UT_RESEARCH_BLOCKS_VERSION;
		$dependencies = array();

		if ( file_exists( $asset_file ) ) {
			$asset = include $asset_file;
			if ( is_array( $asset ) && isset( $asset['version'] ) ) {
				$version = $asset['version'];
			}
			if ( is_array( $asset ) && isset( $asset['dependencies'] ) ) {
				$dependencies = $asset['dependencies'];
			}
		}

		return array(
			'version'      => $version,
			'dependencies' => $dependencies,
		);
	}

	/**
	 * Enqueue inline CSS with custom CSS variables.
	 *
	 * @param string $handle The style handle to add inline CSS to.
	 * @return void
	 */
	private function enqueue_inline_css( string $handle ) {
		// Inject plugin URL and image URL as CSS variables.
		$carbon_fiber_bg_768x30_url    = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-768x30.webp' );
		$carbon_fiber_bg_1024x30_url   = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-1024x30.webp' );
		$carbon_fiber_bg_3840x30_url   = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-3840x30.webp' );
		$carbon_fiber_bg_768x512_url   = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-768x512.webp' );
		$carbon_fiber_bg_1024x683_url  = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-1024x683.webp' );
		$carbon_fiber_bg_2000x1334_url = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-2000x1334.webp' );
		$carbon_fiber_bg_920x243_url   = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-920x243.webp' );
		$carbon_fiber_bg_1033x227_url  = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-1033x227.webp' );
		$carbon_fiber_bg_1274x222_url  = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-1274x222.webp' );
		$carbon_fiber_bg_767x45_url    = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-767x45.webp' );
		$carbon_fiber_bg_4275x781_url  = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-orange-carbon-fiber-bg-4275x781.webp' );
		$wireframe_pattern_1_url       = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-wireframe-pattern-1-ongray.svg' );
		$wireframe_pattern_2_url       = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-wireframe-pattern-2-onwhite.svg' ) . '?v=?2';
		$wireframe_pattern_3_url       = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-wireframe-pattern-3-onwhite.svg' );
		$wireframe_pattern_4_gray_url  = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-wireframe-pattern-4-ongray.svg' );
		$wireframe_pattern_4_white_url = esc_url( UT_RESEARCH_BLOCKS_URL . 'src/assets/images/ut-research-wireframe-pattern-4-onwhite.svg' ) . '?v=?2';

		$custom_css = ':root { ' .
			'--utrb-plugin-url: ' . esc_url( UT_RESEARCH_BLOCKS_URL ) . '; ' .
			'--utrb-carbon-fiber-bg-768x30-url: url(' . $carbon_fiber_bg_768x30_url . '); ' .
			'--utrb-carbon-fiber-bg-1024x30-url: url(' . $carbon_fiber_bg_1024x30_url . '); ' .
			'--utrb-carbon-fiber-bg-3840x30-url: url(' . $carbon_fiber_bg_3840x30_url . '); ' .
			'--utrb-carbon-fiber-bg-768x512-url: url(' . $carbon_fiber_bg_768x512_url . '); ' .
			'--utrb-carbon-fiber-bg-1024x683-url: url(' . $carbon_fiber_bg_1024x683_url . '); ' .
			'--utrb-carbon-fiber-bg-2000x1334-url: url(' . $carbon_fiber_bg_2000x1334_url . '); ' .
			'--utrb-carbon-fiber-bg-920x243-url: url(' . $carbon_fiber_bg_920x243_url . '); ' .
			'--utrb-carbon-fiber-bg-1033x227-url: url(' . $carbon_fiber_bg_1033x227_url . '); ' .
			'--utrb-carbon-fiber-bg-1274x222-url: url(' . $carbon_fiber_bg_1274x222_url . '); ' .
			'--utrb-carbon-fiber-bg-767x45-url: url(' . $carbon_fiber_bg_767x45_url . '); ' .
			'--utrb-carbon-fiber-bg-4275x781-url: url(' . $carbon_fiber_bg_4275x781_url . '); ' .
			'--utrb-wireframe-pattern-1: url(' . $wireframe_pattern_1_url . '); ' .
			'--utrb-wireframe-pattern-2: url(' . $wireframe_pattern_2_url . '); ' .
			'--utrb-wireframe-pattern-3: url(' . $wireframe_pattern_3_url . '); ' .
			'--utrb-wireframe-pattern-4-gray: url(' . $wireframe_pattern_4_gray_url . '); ' .
			'--utrb-wireframe-pattern-4-white: url(' . $wireframe_pattern_4_white_url . '); ' .
		'}';

		wp_add_inline_style( $handle, $custom_css );
	}
}
