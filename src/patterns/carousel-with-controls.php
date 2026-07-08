<?php
/**
 * Title: Carousel with Controls
 * Slug: ut-research-blocks/carousel-with-controls
 * Description: Interactive carousel slider with previous/next navigation controls, displaying cards with images, dates, titles, and descriptions
 * Categories: ut-research-patterns
 * Keywords: slider, carousel, navigation, controls, cards
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */

?>

<!-- wp:group {"align":"full","className":"utrb-carousel-with-controls","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull utrb-carousel-with-controls"><!-- wp:group {"metadata":{"name":"Container"},"align":"wide","className":"utrb-carousel-with-controls__container","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
	<div class="wp-block-group alignwide utrb-carousel-with-controls__container"><!-- wp:group {"metadata":{"name":"Content"},"className":"utrb-carousel-with-controls__content","layout":{"type":"constrained"}} -->
		<div class="wp-block-group utrb-carousel-with-controls__content"><!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"800"}}} -->
			<h2 class="wp-block-heading" style="font-style:normal;font-weight:800">Timeline of strategic roadmap</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
			<!-- /wp:paragraph -->

			<!-- wp:ut-research-blocks/slider-controls {"bindToSlider":"slider-1"} -->
			<div class="wp-block-ut-research-blocks-slider-controls utrb-slider-controls" data-bind-to-slider="slider-1"><button type="button" aria-label="Previous slide" class="utrb-slider-controls__button utrb-slider-controls__button--previous"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" fill="none" viewBox="0 0 25 16">
						<g fill="#FF8200" clip-path="url(#a)">
							<path d="M25 6.403h-2.475v3.103H25V6.403Zm-4.95 0h-2.475v3.103h2.475V6.403Zm-4.975 0H12.6v3.103h2.475V6.403Zm-4.95 0H7.65v3.103h2.475V6.403ZM5.1 3.177H2.55v3.177H5.1V3.177ZM2.55 6.354H0V9.53h2.55V6.354ZM7.625 0h-2.55v3.177h2.55V0ZM5.1 9.53H2.55v3.178H5.1V9.53Z"></path>
							<path d="M2.55 6.354H0V9.53h2.55V6.354Zm5.075 6.353h-2.55v3.177h2.55v-3.177Z"></path>
						</g>
						<defs>
							<clipPath id="a">
								<path fill="#fff" d="M25 0H0v15.909h25z"></path>
							</clipPath>
						</defs>
					</svg></button><button type="button" aria-label="Next slide" class="utrb-slider-controls__button utrb-slider-controls__button--next"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" fill="none" viewBox="0 0 25 16">
						<g fill="#FF8200" clip-path="url(#a)">
							<path d="M0 6.403h2.475v3.103H0V6.403Zm4.95 0h2.475v3.103H4.95V6.403Zm4.975 0H12.4v3.103H9.925V6.403Zm4.95 0h2.475v3.103h-2.475V6.403ZM19.9 3.177h2.55v3.177H19.9V3.177Zm2.55 3.177H25V9.53h-2.55V6.354ZM17.375 0h2.55v3.177h-2.55V0ZM19.9 9.53h2.55v3.178H19.9V9.53Z"></path>
							<path d="M22.45 6.354H25V9.53h-2.55V6.354Zm-5.075 6.353h2.55v3.177h-2.55v-3.177Z"></path>
						</g>
						<defs>
							<clipPath id="a">
								<path fill="#fff" d="M0 0h25v15.909H0z"></path>
							</clipPath>
						</defs>
					</svg></button></div>
			<!-- /wp:ut-research-blocks/slider-controls -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"metadata":{"name":"Slider Wrapper"},"className":"utrb-carousel-with-controls__slider-wrapper","layout":{"type":"default"}} -->
		<div class="wp-block-group utrb-carousel-with-controls__slider-wrapper"><!-- wp:ut-research-blocks/slider {"containerGapTablet":"1.125rem","containerGapDesktop":"1.5rem","className":"slider-1"} -->
			<div class="wp-block-ut-research-blocks-slider slider-1 utrb-slider" data-loop="true" data-align="start" style="--utrb-slides-per-view-mobile:1.2;--utrb-slides-per-view-tablet:2.3;--utrb-slides-per-view-desktop:3;--utrb-container-gap-mobile:0.75rem;--utrb-container-gap-tablet:1.125rem;--utrb-container-gap-desktop:1.5rem">
				<div class="utrb-slider__container"><!-- wp:ut-research-blocks/slide -->
					<div class="wp-block-ut-research-blocks-slide utrb-slide"><!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
						<figure class="wp-block-image size-full" style="margin-top:0;margin-bottom:0"><img src="<?php echo esc_url( plugins_url( 'src/assets/images/image-placeholder-large.png', UT_RESEARCH_BLOCKS_FILE ) ); ?>" alt="" /></figure>
						<!-- /wp:image -->

						<!-- wp:group {"metadata":{"name":"Slide Content"},"className":"utrb-slide__content","layout":{"type":"constrained"}} -->
						<div class="wp-block-group utrb-slide__content"><!-- wp:paragraph {"className":"utrb-slide__date","style":{"typography":{"fontSize":"14px"}}} -->
							<p class="utrb-slide__date" style="font-size:14px">June 27, 2025</p>
							<!-- /wp:paragraph -->

							<!-- wp:heading {"level":3} -->
							<h3 class="wp-block-heading">Slide 1 title name here</h3>
							<!-- /wp:heading -->

							<!-- wp:paragraph -->
							<p>Mi nisl eros vivamus tortor morbi arcu rutrum eget euismod fusce ac adipiscing tristique purus eget amet elementum gravida eros varius maximus elementum lorem tortor.</p>
							<!-- /wp:paragraph -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:ut-research-blocks/slide -->

					<!-- wp:ut-research-blocks/slide -->
					<div class="wp-block-ut-research-blocks-slide utrb-slide"><!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
						<figure class="wp-block-image size-full" style="margin-top:0;margin-bottom:0"><img src="<?php echo esc_url( plugins_url( 'src/assets/images/image-placeholder-large.png', UT_RESEARCH_BLOCKS_FILE ) ); ?>" alt="" /></figure>
						<!-- /wp:image -->

						<!-- wp:group {"metadata":{"name":"Slide Content"},"className":"utrb-slide__content","layout":{"type":"constrained"}} -->
						<div class="wp-block-group utrb-slide__content"><!-- wp:paragraph {"className":"utrb-slide__date","style":{"typography":{"fontSize":"14px"}}} -->
							<p class="utrb-slide__date" style="font-size:14px">June 28, 2025</p>
							<!-- /wp:paragraph -->

							<!-- wp:heading {"level":3} -->
							<h3 class="wp-block-heading">Slide 2 title name here</h3>
							<!-- /wp:heading -->

							<!-- wp:paragraph -->
							<p>Quisque purus facilisis facilisis id elementum mi enim maximus elementum elit varius scelerisque nisl purus urna orci magna quisque dolor maecenas euismod metus tincidunt maecenas.</p>
							<!-- /wp:paragraph -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:ut-research-blocks/slide -->

					<!-- wp:ut-research-blocks/slide -->
					<div class="wp-block-ut-research-blocks-slide utrb-slide"><!-- wp:image {"sizeSlug":"full","linkDestination":"none","style":{"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
						<figure class="wp-block-image size-full" style="margin-top:0;margin-bottom:0"><img src="<?php echo esc_url( plugins_url( 'src/assets/images/image-placeholder-large.png', UT_RESEARCH_BLOCKS_FILE ) ); ?>" alt="" /></figure>
						<!-- /wp:image -->

						<!-- wp:group {"metadata":{"name":"Slide Content"},"className":"utrb-slide__content","layout":{"type":"constrained"}} -->
						<div class="wp-block-group utrb-slide__content"><!-- wp:paragraph {"className":"utrb-slide__date","style":{"typography":{"fontSize":"14px"}}} -->
							<p class="utrb-slide__date" style="font-size:14px">June 29, 2025</p>
							<!-- /wp:paragraph -->

							<!-- wp:heading {"level":3} -->
							<h3 class="wp-block-heading">Slide 3 title name here</h3>
							<!-- /wp:heading -->

							<!-- wp:paragraph -->
							<p>Tincidunt euismod et consectetur consectetur sed maximus phasellus proin maximus condimentum nunc phasellus purus mi nunc amet sed condimentum erat sed urna nulla adipiscing aliquam.</p>
							<!-- /wp:paragraph -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:ut-research-blocks/slide -->
				</div>
			</div>
			<!-- /wp:ut-research-blocks/slider -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->