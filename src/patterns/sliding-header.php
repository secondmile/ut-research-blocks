<?php
/**
 * Title: Sliding Header
 * Slug: ut-research-blocks/sliding-header
 * Description: Full-width header with geometric background pattern, featuring a heading, descriptive text, and an image that can be positioned on the left or right side. Optional: add utrb-sliding-header--animated to Additional CSS Classes on the outer group to enable image slide-in animation.
 * Categories: ut-research-patterns
 * Keywords: header, geometric, image, research
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */

?>

<!-- wp:group {"align":"full","className":"utrb-sliding-header is-style-utrb-wireframe-pattern-2","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull utrb-sliding-header is-style-utrb-wireframe-pattern-2"><!-- wp:group {"metadata":{"name":"Container"},"align":"wide","className":"utrb-sliding-header__container is-style-utrb-show-media-on-right","style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","flexWrap":"wrap","verticalAlignment":"center"}} -->
	<div class="wp-block-group alignwide utrb-sliding-header__container is-style-utrb-show-media-on-right"><!-- wp:group {"metadata":{"name":"Content"},"className":"utrb-geometric-bg__content utrb-sliding-header__content","layout":{"type":"default"}} -->
		<div class="wp-block-group utrb-geometric-bg__content utrb-sliding-header__content"><!-- wp:heading {"level":1} -->
			<h1 class="wp-block-heading">Advanced<br>Manufacturing</h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"metadata":{"name":"Image Wrapper"},"className":"utrb-sliding-header__img-wrapper","layout":{"type":"default"}} -->
		<div class="wp-block-group utrb-sliding-header__img-wrapper"><!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->
			<figure class="wp-block-image size-full"><img src="<?php echo esc_url( plugins_url( 'src/assets/images/image-placeholder-large.png', UT_RESEARCH_BLOCKS_FILE ) ); ?>" alt="" /></figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->