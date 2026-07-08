<?php
/**
 * Title: Research Spotlight
 * Slug: ut-research-blocks/research-spotlight
 * Description: Mid-depth research spotlight with associated media and related links
 * Categories: ut-research-patterns
 * Keywords: research, spotlight, media, links, sidebar
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */

?>

<!-- wp:group {"metadata":{"categories":["ut-research-patterns"],"patternName":"ut-research-blocks/research-spotlight","name":"Research Spotlight"},"align":"full","className":"utrb-research-spotlight is-style-utrb-wireframe-pattern-2","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull utrb-research-spotlight is-style-utrb-wireframe-pattern-2"><!-- wp:group {"metadata":{"name":"Container"},"align":"wide","className":"utrb-research-spotlight__container is-style-utrb-show-media-on-left","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center","justifyContent":"center"}} -->
	<div class="wp-block-group alignwide utrb-research-spotlight__container is-style-utrb-show-media-on-left"><!-- wp:group {"metadata":{"name":"Content"},"className":"utrb-research-spotlight__content","layout":{"type":"default"}} -->
		<div class="wp-block-group utrb-research-spotlight__content"><!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->
			<figure class="wp-block-image size-full"><img src="<?php echo esc_url( plugins_url( 'src/assets/images/image-placeholder-large.png', UT_RESEARCH_BLOCKS_FILE ) ); ?>" alt="" /></figure>
			<!-- /wp:image -->

			<!-- wp:heading -->
			<h2 class="wp-block-heading">A mid-depth research spotlight with associated media and links</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph -->
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph -->
			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph -->
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"metadata":{"name":"Sidebar"},"className":"utrb-research-spotlight__sidebar utrb-geometric-bg__content","layout":{"type":"default"}} -->
		<div class="wp-block-group utrb-research-spotlight__sidebar utrb-geometric-bg__content"><!-- wp:heading {"level":3} -->
			<h3 class="wp-block-heading">Optional Header</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"is-style-utkwds-single-link"} -->
			<p class="is-style-utkwds-single-link"><a href="https://www.utk.edu/">Read The Story</a></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"is-style-utkwds-single-link"} -->
			<p class="is-style-utkwds-single-link"><a href="https://www.utk.edu/">Another Related Story</a></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"is-style-utkwds-single-link"} -->
			<p class="is-style-utkwds-single-link"><a href="https://www.utk.edu/">A Related Publication</a></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"is-style-utkwds-single-link"} -->
			<p class="is-style-utkwds-single-link"><a href="https://www.utk.edu/">Another Related Link</a></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
