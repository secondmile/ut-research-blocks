<?php
/**
 * Pattern Exporter utility for converting WordPress blocks to pattern files.
 *
 * @package UTResearchBlocks
 */

namespace UTResearchBlocks\Core;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Pattern_Exporter class for exporting patterns from WordPress UI.
 */
class Pattern_Exporter {

	/**
	 * Register the exporter.
	 *
	 * @return void
	 */
	public function register() {
		add_action( 'admin_menu', array( $this, 'add_admin_page' ) );
	}

	/**
	 * Add admin page for pattern export.
	 *
	 * @return void
	 */
	public function add_admin_page() {
		add_submenu_page(
			'tools.php',
			__( 'Export Block Pattern', 'ut-research-blocks' ),
			__( 'Export Pattern', 'ut-research-blocks' ),
			'manage_options',
			'export-block-pattern',
			array( $this, 'render_export_page' )
		);
	}

	/**
	 * Render the export page.
	 *
	 * @return void
	 */
	public function render_export_page() {
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'Export Block Pattern', 'ut-research-blocks' ); ?></h1>
			<p><?php esc_html_e( 'Copy pattern content from post editor, paste below, and generate PHP pattern file.', 'ut-research-blocks' ); ?></p>

			<form method="post">
				<table class="form-table">
					<tr>
						<th><label for="pattern_title"><?php esc_html_e( 'Pattern Title', 'ut-research-blocks' ); ?></label></th>
						<td><input type="text" name="pattern_title" id="pattern_title" class="regular-text" required /></td>
					</tr>
					<tr>
						<th><label for="pattern_slug"><?php esc_html_e( 'Pattern Slug', 'ut-research-blocks' ); ?></label></th>
						<td><input type="text" name="pattern_slug" id="pattern_slug" class="regular-text" required /></td>
					</tr>
					<tr>
						<th><label for="pattern_desc"><?php esc_html_e( 'Description', 'ut-research-blocks' ); ?></label></th>
						<td><textarea name="pattern_desc" id="pattern_desc" rows="3" class="large-text"></textarea></td>
					</tr>
					<tr>
						<th><label for="pattern_content"><?php esc_html_e( 'Block Content', 'ut-research-blocks' ); ?></label></th>
						<td><textarea name="pattern_content" id="pattern_content" rows="20" class="large-text code" required></textarea></td>
					</tr>
				</table>

				<?php wp_nonce_field( 'export_pattern' ); ?>
				<input type="submit" name="generate_pattern" class="button button-primary" value="<?php esc_attr_e( 'Generate Pattern File', 'ut-research-blocks' ); ?>" />
			</form>

			<?php $this->handle_export(); ?>
		</div>
		<?php
	}

	/**
	 * Handle pattern export.
	 *
	 * @return void
	 */
	private function handle_export() {
		if ( ! isset( $_POST['generate_pattern'] ) ) {
			return;
		}

		// Check user capabilities.
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You do not have permission to access this page.', 'ut-research-blocks' ) );
		}

		check_admin_referer( 'export_pattern' );

		// Validate and sanitize POST data with proper unslashing.
		$title   = isset( $_POST['pattern_title'] ) ? sanitize_text_field( wp_unslash( $_POST['pattern_title'] ) ) : '';
		$slug    = isset( $_POST['pattern_slug'] ) ? sanitize_title( wp_unslash( $_POST['pattern_slug'] ) ) : '';
		$desc    = isset( $_POST['pattern_desc'] ) ? sanitize_textarea_field( wp_unslash( $_POST['pattern_desc'] ) ) : '';
		$content = isset( $_POST['pattern_content'] ) ? wp_kses_post( wp_unslash( $_POST['pattern_content'] ) ) : '';

		$pattern_file = $this->generate_pattern_file( $title, $slug, $desc, $content );

		echo '<div class="notice notice-success"><p>' . esc_html__( 'Pattern generated! Save this to', 'ut-research-blocks' ) . ' <code>src/patterns/' . esc_html( $slug ) . '.php</code></p></div>';
		echo '<textarea readonly rows="30" class="large-text code" style="font-family:monospace;">' . esc_textarea( $pattern_file ) . '</textarea>';
	}

	/**
	 * Generate pattern file content.
	 *
	 * @param string $title   Pattern title.
	 * @param string $slug    Pattern slug.
	 * @param string $desc    Pattern description.
	 * @param string $content Block content.
	 * @return string Pattern file content.
	 */
	private function generate_pattern_file( $title, $slug, $desc, $content ) {
		$escaped_title = esc_html( $title );
		$escaped_slug  = esc_html( $slug );
		$escaped_desc  = esc_html( $desc );

		return <<<PHP
<?php
/**
 * Title: $escaped_title
 * Slug: ut-research-blocks/$escaped_slug
 * Description: $escaped_desc
 * Categories: ut-research-patterns
 * Keywords: research
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */
?>

$content
PHP;
	}
}
