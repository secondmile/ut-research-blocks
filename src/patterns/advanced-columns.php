<?php
/**
 * Title: Advanced Columns
 * Slug: ut-research-blocks/advanced-columns
 * Description: Two-column layout with image and content
 * Categories: ut-research-patterns
 * Keywords: columns, two-column, image, content
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */

?>

<!-- wp:group {"metadata":{"categories":["ut-research-patterns"],"patternName":"ut-research-blocks/advanced-columns","name":"Advanced Columns"},"align":"full","className":"utrb-advanced-columns is-style-utrb-wireframe-pattern-2","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull utrb-advanced-columns is-style-utrb-wireframe-pattern-2"><!-- wp:group {"metadata":{"name":"Container"},"align":"wide","className":"utrb-advanced-columns__container is-style-utrb-show-media-on-right","layout":{"type":"flex","flexWrap":"nowrap"}} -->
	<div class="wp-block-group alignwide utrb-advanced-columns__container is-style-utrb-show-media-on-right"><!-- wp:group {"metadata":{"name":"Media"},"className":"utrb-advanced-columns__img-wrapper","layout":{"type":"constrained"}} -->
		<div class="wp-block-group utrb-advanced-columns__img-wrapper"><!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->
			<figure class="wp-block-image size-full"><img src="<?php echo esc_url( plugins_url( 'src/assets/images/image-placeholder-large.png', UT_RESEARCH_BLOCKS_FILE ) ); ?>" alt="" /></figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"metadata":{"name":"Content"},"className":"utrb-advanced-columns__content utrb-geometric-bg__content","layout":{"type":"constrained"}} -->
		<div class="wp-block-group utrb-advanced-columns__content utrb-geometric-bg__content"><!-- wp:heading {"level":1,"className":"utrb-advanced-columns__title"} -->
			<h1 class="wp-block-heading utrb-advanced-columns__title">World-Class Faculty</h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"utrb-advanced-columns__paragraph"} -->
			<p class="utrb-advanced-columns__paragraph">Faculty at the institute are leaders in their fields, advancing our fundamental understanding of matter and designing and engineering solutions for industry and other partners.<br><br>The university is recruiting faculty who share a passion for working together to tackle grand challenges facing Tennessee and beyond as part of its Cluster Hire Initiatives.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"is-style-utkwds-cta-link"} -->
			<p class="is-style-utkwds-cta-link"><a href="https://www.utk.edu/">Meet Our Faculty</a></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"utrb-advanced-columns__link"} -->
			<p class="utrb-advanced-columns__link"><a href="https://www.utk.edu/">Explore the Cluster Hire Initiatives to learn more.</a></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->

	<!-- wp:query {"queryId":1,"query":{"perPage":1,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"taxQuery":null,"parents":[],"format":[]},"metadata":{"blockVisibility":false},"align":"wide"} -->
	<div class="wp-block-query alignwide"><!-- wp:post-template -->
		<!-- wp:group {"metadata":{"name":"Container"},"align":"wide","className":"utrb-advanced-columns__container is-style-utrb-show-media-on-right","layout":{"type":"flex","flexWrap":"nowrap"}} -->
		<div class="wp-block-group alignwide utrb-advanced-columns__container is-style-utrb-show-media-on-right"><!-- wp:group {"metadata":{"name":"Media"},"className":"utrb-advanced-columns__img-wrapper","layout":{"type":"constrained"}} -->
			<div class="wp-block-group utrb-advanced-columns__img-wrapper"><!-- wp:post-featured-image /--></div>
			<!-- /wp:group -->

			<!-- wp:group {"metadata":{"name":"Content"},"className":"utrb-advanced-columns__content utrb-geometric-bg__content","layout":{"type":"constrained"}} -->
			<div class="wp-block-group utrb-advanced-columns__content utrb-geometric-bg__content"><!-- wp:post-title {"className":"utrb-advanced-columns__title"} /-->

				<!-- wp:post-excerpt {"moreText":"Read more"} /-->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
		<!-- /wp:post-template -->
	</div>
	<!-- /wp:query -->
</div>
<!-- /wp:group -->