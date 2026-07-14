<?php
/**
 * Plugin Name: UT Research Blocks
 * Description: Research-focused blocks, patterns, and styles for University of Tennessee
 * Version: 1.1.0
 * Author: Second Mile
 * Author URI: https://www.thesecondmile.com/
 * Text Domain: ut-research-blocks
 * Requires at least: 6.4
 * Requires PHP: 8.0
 *
 * @package UTResearchBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'UT_RESEARCH_BLOCKS_DIR', plugin_dir_path( __FILE__ ) );
define( 'UT_RESEARCH_BLOCKS_URL', plugin_dir_url( __FILE__ ) );
define( 'UT_RESEARCH_BLOCKS_FILE', __FILE__ );
define( 'UT_RESEARCH_BLOCKS_VERSION', '1.1.0' );

require_once UT_RESEARCH_BLOCKS_DIR . 'src/Core/class-app.php';

\UTResearchBlocks\Core\App::instance()->boot();
