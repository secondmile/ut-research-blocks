<?php
/**
 * Register block style variations.
 *
 * @package UTResearchBlocks
 */

namespace UTResearchBlocks\Core;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block_Styles class for registering block style variations.
 */
class Block_Styles {

	/**
	 * Register block styles.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'init', array( $this, 'enqueue_block_styles' ) );
		add_action( 'init', array( $this, 'register_block_styles' ) );
	}

	/**
	 * Enqueue block style CSS files.
	 *
	 * @return void
	 */
	public function enqueue_block_styles() {
		// Geometric Background Patterns.
		$geometric_asset = include plugin_dir_path( UT_RESEARCH_BLOCKS_FILE ) . 'build/block-styles/geometric-background-patterns.asset.php';
		wp_enqueue_style(
			'utrb-geometric-background-patterns',
			plugin_dir_url( UT_RESEARCH_BLOCKS_FILE ) . 'build/block-styles/geometric-background-patterns.css',
			$geometric_asset['dependencies'],
			$geometric_asset['version']
		);

		// Orange Carbon Fiber Frame.
		$orange_asset = include plugin_dir_path( UT_RESEARCH_BLOCKS_FILE ) . 'build/block-styles/orange-carbon-fiber-frame.asset.php';
		wp_enqueue_style(
			'utrb-orange-carbon-fiber-frame',
			plugin_dir_url( UT_RESEARCH_BLOCKS_FILE ) . 'build/block-styles/orange-carbon-fiber-frame.css',
			$orange_asset['dependencies'],
			$orange_asset['version']
		);
	}

	/**
	 * Register block style variations.
	 *
	 * @return void
	 */
	public function register_block_styles() {
		// Gallery Frame Style.
		register_block_style(
			'core/gallery',
			array(
				'name'  => 'utrb-framed',
				'label' => __( 'Framed', 'ut-research-blocks' ),
			)
		);

		// Wireframe Pattern Backgrounds.
		register_block_style(
			'core/group',
			array(
				'name'         => 'utrb-wireframe-pattern-1',
				'label'        => __( 'Wireframe Pattern 1 (On Gray)', 'ut-research-blocks' ),
				'style_handle' => 'utrb-geometric-background-patterns',
			)
		);

		register_block_style(
			'core/group',
			array(
				'name'         => 'utrb-wireframe-pattern-2',
				'label'        => __( 'Wireframe Pattern 2 (On White)', 'ut-research-blocks' ),
				'style_handle' => 'utrb-geometric-background-patterns',
			)
		);

		register_block_style(
			'core/group',
			array(
				'name'         => 'utrb-wireframe-pattern-3',
				'label'        => __( 'Wireframe Pattern 3 (On White)', 'ut-research-blocks' ),
				'style_handle' => 'utrb-geometric-background-patterns',
			)
		);

		register_block_style(
			'core/group',
			array(
				'name'         => 'utrb-wireframe-pattern-4-gray',
				'label'        => __( 'Wireframe Pattern 4 (On Gray)', 'ut-research-blocks' ),
				'style_handle' => 'utrb-geometric-background-patterns',
			)
		);

		register_block_style(
			'core/group',
			array(
				'name'         => 'utrb-wireframe-pattern-4-white',
				'label'        => __( 'Wireframe Pattern 4 (On White)', 'ut-research-blocks' ),
				'style_handle' => 'utrb-geometric-background-patterns',
			)
		);

		// Row Media Variants.
		register_block_style(
			'core/group',
			array(
				'name'  => 'utrb-show-media-on-left',
				'label' => __( 'Show Media on Left', 'ut-research-blocks' ),
			)
		);

		register_block_style(
			'core/group',
			array(
				'name'  => 'utrb-show-media-on-right',
				'label' => __( 'Show Media on Right', 'ut-research-blocks' ),
			)
		);

		register_block_style(
			'core/separator',
			array(
				'name'  => 'utrb-skewed-left',
				'label' => __( 'Skewed Left', 'ut-research-blocks' ),
			)
		);

		register_block_style(
			'core/separator',
			array(
				'name'  => 'utrb-skewed-right',
				'label' => __( 'Skewed Right', 'ut-research-blocks' ),
			)
		);

		// Orange Carbon Fiber Frame Styles.
		register_block_style(
			array( 'core/post-featured-image', 'core/image' ),
			array(
				'name'         => 'utrb-left-orange-carbon-fiber-frame',
				'label'        => __( 'Left Orange Carbon Fiber Frame', 'ut-research-blocks' ),
				'style_handle' => 'utrb-orange-carbon-fiber-frame',
			)
		);

		register_block_style(
			array( 'core/post-featured-image', 'core/image' ),
			array(
				'name'         => 'utrb-right-orange-carbon-fiber-frame',
				'label'        => __( 'Right Orange Carbon Fiber Frame', 'ut-research-blocks' ),
				'style_handle' => 'utrb-orange-carbon-fiber-frame',
			)
		);

		register_block_style(
			'core/post-template',
			array(
				'name'  => 'utrb-news-grid-align-left',
				'label' => __( 'News Grid: Align Left', 'ut-research-blocks' ),
			)
		);

		register_block_style(
			'core/post-template',
			array(
				'name'  => 'utrb-news-grid-align-center',
				'label' => __( 'News Grid: Align Center', 'ut-research-blocks' ),
			)
		);

		register_block_style(
			'core/post-template',
			array(
				'name'  => 'utrb-news-grid-align-right',
				'label' => __( 'News Grid: Align Right', 'ut-research-blocks' ),
			)
		);
	}
}
