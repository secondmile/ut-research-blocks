<?php
/**
 * Title: News Grid
 * Slug: ut-research-blocks/news-grid
 * Description: Grid layout for displaying news posts using Query Loop
 * Categories: ut-research-patterns
 * Keywords: news, grid, posts, query loop
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */

?>

<!-- wp:group {"metadata":{"categories":["ut-research-patterns"],"patternName":"ut-research-blocks/news-grid","name":"News Grid"},"align":"full","className":"utrb-news-grid","backgroundColor":"light","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull utrb-news-grid has-light-background-color has-background"><!-- wp:heading {"align":"wide"} -->
	<h2 class="wp-block-heading alignwide">News</h2>
	<!-- /wp:heading -->

	<!-- wp:query {"queryId":2,"query":{"perPage":9,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"taxQuery":null,"parents":[],"format":[]},"align":"wide","className":"utrb-news-grid__grid"} -->
	<div class="wp-block-query alignwide utrb-news-grid__grid"><!-- wp:post-template {"className":"is-style-utrb-news-grid-align-center","style":{"spacing":{"blockGap":"0"}},"layout":{"type":"grid","columnCount":3}} -->
		<!-- wp:post-featured-image /-->

		<!-- wp:group {"metadata":{"name":"Card Body"},"className":"utrb-news-grid__card-body","style":{"elements":{"link":{"color":{"text":"var:preset|color|smokey"}}}},"backgroundColor":"white","textColor":"smokey","layout":{"type":"default"}} -->
		<div class="wp-block-group utrb-news-grid__card-body has-smokey-color has-white-background-color has-text-color has-background has-link-color"><!-- wp:post-title {"level":3,"isLink":true} /-->

			<!-- wp:post-date {"metadata":{"bindings":{"datetime":{"source":"core/post-data","args":{"field":"date"}}}}} /-->
		</div>
		<!-- /wp:group -->
		<!-- /wp:post-template -->

		<!-- wp:query-pagination -->
		<!-- wp:query-pagination-previous /-->

		<!-- wp:query-pagination-numbers /-->

		<!-- wp:query-pagination-next /-->
		<!-- /wp:query-pagination -->

		<!-- wp:query-no-results -->
		<!-- wp:paragraph {"placeholder":"Add text or blocks that will display when a query returns no results."} -->
		<p></p>
		<!-- /wp:paragraph -->
		<!-- /wp:query-no-results -->
	</div>
	<!-- /wp:query -->
</div>
<!-- /wp:group -->