<?php
/**
 * Title: PullQuote with Photo Background
 * Slug: ut-research-blocks/pullquote-with-photo-bg
 * Description: A full-width pullquote with a background photo and overlaid quote content, ideal for highlighting impactful statements from researchers or faculty.
 * Categories: ut-research-patterns
 * Keywords: research
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */

?>

<!-- wp:media-text {"align":"full","mediaType":"image","metadata":{"categories":["ut-research-patterns"],"patternName":"ut-research-blocks/pullquote-with-photo-bg","name":"PullQuote with Photo Background"},"className":"utrb-pullquote-with-photo-bg"} -->
<div class="wp-block-media-text alignfull utrb-pullquote-with-photo-bg">
	<figure class="wp-block-media-text__media"><img src="<?php echo esc_url( plugins_url( 'src/assets/images/image-placeholder-large.png', UT_RESEARCH_BLOCKS_FILE ) ); ?>" alt="" /></figure>
	<div class="wp-block-media-text__content"><!-- wp:quote {"className":"utkwds-quote utkwds-quote\u002d\u002dwhite is-style-default"} -->
		<blockquote class="wp-block-quote utkwds-quote utrb-quote--white is-style-default"><!-- wp:paragraph -->
			<p>Our goals with the institute are to create a broad tapestry of researchers not constrained by a physical location while creating opportunities for collaboration with industry partners, national labs, and other universities, colleges, and K-12 partners."</p>
			<!-- /wp:paragraph --><cite><span class="name">Jon Phipps, IAMM</span><br>Director of Operations</cite>
		</blockquote>
		<!-- /wp:quote -->
	</div>
</div>
<!-- /wp:media-text -->