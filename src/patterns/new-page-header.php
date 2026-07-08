<?php
/**
 * Title: New Page Header
 * Slug: ut-research-blocks/new-page-header
 * Description: Full-width page header with geometric background pattern, featuring a heading, descriptive text, and an image that can be positioned on the left or right side.
 * Categories: ut-research-patterns
 * Keywords: header, geometric, page header, media text
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */

?>

<!-- wp:group {"metadata":{"categories":["ut-research-patterns"],"patternName":"ut-research-blocks/new-page-header","name":"New Page Header"},"align":"full","className":"utrb-new-page-header is-style-utrb-wireframe-pattern-2","layout":{"type":"default"}} -->
<div class="wp-block-group alignfull utrb-new-page-header is-style-utrb-wireframe-pattern-2"><!-- wp:media-text {"align":"full","mediaPosition":"right","mediaType":"image","verticalAlignment":"center"} -->
	<div class="wp-block-media-text alignfull has-media-on-the-right is-stacked-on-mobile is-vertically-aligned-center">
		<div class="wp-block-media-text__content"><!-- wp:group {"className":"utrb-geometric-bg__content","layout":{"type":"default"}} -->
			<div class="wp-block-group utrb-geometric-bg__content"><!-- wp:heading {"level":1} -->
				<h1 class="wp-block-heading">Education</h1>
				<!-- /wp:heading -->

				<!-- wp:paragraph -->
				<p>UT students work closely with UT's world-class faculty at IAMM and have unrivaled access to cutting-edge research facilities on campus and at our partner organizations. UT graduates are sought after for their fundamental knowledge as well as for their ability to solve complex problems and work collaboratively in teams.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<figure class="wp-block-media-text__media"><img src="<?php echo esc_url( plugins_url( 'src/assets/images/image-placeholder-large.png', UT_RESEARCH_BLOCKS_FILE ) ); ?>" alt="" /></figure>
	</div>
	<!-- /wp:media-text -->
</div>
<!-- /wp:group -->