<?php
/**
 * Title: PullQuote with Photo Side-by-Side Layout
 * Slug: ut-research-blocks/pullquote-with-photo-side-by-side-layout
 * Description: A side-by-side layout featuring a pullquote alongside a photo using media-text block, perfect for showcasing researcher testimonials with accompanying imagery.
 * Categories: ut-research-patterns
 * Keywords: research, quote, pullquote, media
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */

?>

<!-- wp:group {"metadata":{"categories":["ut-research-patterns"],"patternName":"ut-research-blocks/pullquote-with-photo-side-by-side-layout","name":"PullQuote with Photo Side-by-Side Layout"},"align":"full","className":"utrb-pullquote-with-photo-side-by-side-layout","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull utrb-pullquote-with-photo-side-by-side-layout"><!-- wp:media-text {"align":"","mediaType":"image","isStackedOnMobile":false,"verticalAlignment":"top","metadata":{"name":"Quote u0026amp; media light gray","categories":["quotes"],"patternName":"utkwds/quote-media-light-gray"},"className":"utrb-pullquote-with-photo-side-by-side-layout__container"} -->
	<div class="wp-block-media-text is-vertically-aligned-top utrb-pullquote-with-photo-side-by-side-layout__container">
		<figure class="wp-block-media-text__media"><img src="<?php echo esc_url( plugins_url( 'src/assets/images/image-placeholder-large.png', UT_RESEARCH_BLOCKS_FILE ) ); ?>" alt="" /></figure>
		<div class="wp-block-media-text__content"><!-- wp:quote {"className":"utkwds-quote is-style-default"} -->
			<blockquote class="wp-block-quote utkwds-quote is-style-default"><!-- wp:paragraph -->
				<p>Our goals with the institute are to create a broad tapestry of researchers not constrained by a physical location while creating opportunities for collaboration with industry partners, national labs, and other universities, colleges, and K-12 partners."</p>
				<!-- /wp:paragraph --><cite><span class="name">Jon Phipps, IAMM</span><br><span class="title">Director of Operations</span><br><span class="college"></span></cite>
			</blockquote>
			<!-- /wp:quote -->
		</div>
	</div>
	<!-- /wp:media-text -->
</div>
<!-- /wp:group -->