<?php
/**
 * Title: Student Experience
 * Slug: ut-research-blocks/student-experience
 * Description: Tabbed student experience section with flexible media-text layout, carbon fiber background, and responsive design
 * Categories: ut-research-patterns
 * Keywords: student, experience, tabs, media text, immersion
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */

?>

<!-- wp:group {"metadata":{"categories":["ut-research-patterns"],"patternName":"ut-research-blocks/student-experience","name":"Student Experience"},"align":"full","className":"utrb-student-experience","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull utrb-student-experience"><!-- wp:heading {"align":"wide"} -->
	<h2 class="wp-block-heading alignwide">Explore student experience</h2>
	<!-- /wp:heading -->

	<!-- wp:group {"align":"full","className":"utrb-student-experience__container","layout":{"type":"default"}} -->
	<div class="wp-block-group alignfull utrb-student-experience__container"><!-- wp:utk-wds/tab-group {"tabNames":[{"tabName":"Immersion","tabSlug":"tab-immersion"},{"tabName":"Leadership","tabSlug":"tab-leadership"}]} -->
		<div class="wp-block-utk-wds-tab-group">
			<ul class="nav nav-tabs main-tabs" id="utk-tab" role="tablist">
				<li class="nav-item block" role="presentation"><button class="nav-link active" id="tab-immersion-tab" data-toggle="tab" data-target="#tab-immersion" type="button" role="tab" aria-controls="tab-immersion" tabindex="0">Immersion</button></li>
				<li class="nav-item block" role="presentation"><button class="nav-link " id="tab-leadership-tab" data-toggle="tab" data-target="#tab-leadership" type="button" role="tab" aria-controls="tab-leadership" tabindex="-1">Leadership</button></li>
			</ul>
			<div data-tab="true" class="utk-wds-tab-wrapper main-tabs-content tab-content"><!-- wp:utk-wds/tab {"tabName":"Immersion","tabSlug":"tab-immersion","tabActive":"active","tabShow":"show"} -->
				<div class="wp-block-utk-wds-tab active show tab-pane fade" role="tabpanel" id="tab-immersion" aria-labelledby="tab-immersion-tab">
					<section data-tab-section="true">
						<div class="utk-wds-tab__panel-body"><!-- wp:group {"metadata":{"name":"Container"},"className":"utrb-student-experience__tab-container","layout":{"type":"flex","flexWrap":"nowrap"}} -->
							<div class="wp-block-group utrb-student-experience__tab-container"><!-- wp:group {"metadata":{"name":"Content"},"layout":{"type":"constrained"}} -->
								<div class="wp-block-group"><!-- wp:heading {"level":3} -->
									<h3 class="wp-block-heading">Immersion</h3>
									<!-- /wp:heading -->

									<!-- wp:paragraph -->
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
									<!-- /wp:paragraph -->

									<!-- wp:paragraph {"className":"is-style-utkwds-cta-link"} -->
									<p class="is-style-utkwds-cta-link"><a href="https://www.utk.edu/">Learn More</a></p>
									<!-- /wp:paragraph -->
								</div>
								<!-- /wp:group -->

								<!-- wp:ut-research-blocks/lazy-youtube {"videoId":"lY8h0P3mQoY","thumbnailUrl":"https://i.ytimg.com/vi_webp/lY8h0P3mQoY/maxresdefault.webp","imgAlt":"","playbackMode":"modal"} -->
								<div class="wp-block-ut-research-blocks-lazy-youtube wp-block-ut-research-blocks-lazy-youtube wp-block-ut-research-blocks-lazy-youtube--landscape" style="--ut-play-button-alignment:center;--ut-play-button-margin-top:auto;--ut-play-button-margin-bottom:auto;--ut-play-button-width:20%;--ut-caption-flex-direction:column;--ut-custom-play-button-left:auto;--ut-custom-play-button-right:20px;--ut-custom-play-button-top:auto;--ut-custom-play-button-bottom:20px;--ut-custom-play-button-transform:none;--ut-custom-play-button-width:72px" data-video-id="lY8h0P3mQoY" data-playback-mode="modal" data-auto-play-on-viewport="false" data-player-controls="youtube" data-player-related="false" data-player-fullscreen="true" data-player-loop="false" data-player-mute="false" data-custom-play-button-visibility="always"><img src="https://i.ytimg.com/vi_webp/lY8h0P3mQoY/maxresdefault.webp" alt="" class="wp-block-ut-research-blocks-lazy-youtube__thumbnail" width="1280" height="720" loading="lazy" />
									<div class="wp-block-ut-research-blocks-lazy-youtube__overlay"><button class="wp-block-ut-research-blocks-lazy-youtube__play-button" type="button" aria-label="Play YouTube video"><svg xmlns="http://www.w3.org/2000/svg" width="98" height="98" fill="none" viewBox="0 0 98 98">
												<path fill="#fff" d="M43.392 30.16c-4.082-2.262-9.092.69-9.092 5.357v26.966c0 4.667 5.01 7.619 9.092 5.358l28.214-15.626a3.675 3.675 0 0 0 0-6.43L43.392 30.16ZM49 0C21.938 0 0 21.938 0 49s21.938 49 49 49 49-21.938 49-49S76.062 0 49 0ZM7.35 49C7.35 25.997 25.997 7.35 49 7.35S90.65 25.997 90.65 49 72.003 90.65 49 90.65 7.35 72.003 7.35 49Z"></path>
											</svg></button></div>
								</div>
								<!-- /wp:ut-research-blocks/lazy-youtube -->
							</div>
							<!-- /wp:group -->
						</div>
					</section>
				</div>
				<!-- /wp:utk-wds/tab -->

				<!-- wp:utk-wds/tab {"tabName":"Leadership","tabSlug":"tab-leadership"} -->
				<div class="wp-block-utk-wds-tab   tab-pane fade" role="tabpanel" id="tab-leadership" aria-labelledby="tab-leadership-tab">
					<section data-tab-section="true">
						<div class="utk-wds-tab__panel-body"><!-- wp:group {"metadata":{"name":"Container"},"className":"utrb-student-experience__tab-container is-style-utrb-show-media-on-left","layout":{"type":"flex","flexWrap":"nowrap"}} -->
							<div class="wp-block-group utrb-student-experience__tab-container is-style-utrb-show-media-on-left"><!-- wp:group {"metadata":{"name":"Content"},"layout":{"type":"constrained"}} -->
								<div class="wp-block-group"><!-- wp:heading {"level":3} -->
									<h3 class="wp-block-heading">Leadership</h3>
									<!-- /wp:heading -->

									<!-- wp:paragraph -->
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
									<!-- /wp:paragraph -->

									<!-- wp:paragraph {"className":"is-style-utkwds-cta-link"} -->
									<p class="is-style-utkwds-cta-link"><a href="https://www.utk.edu/">Learn More</a></p>
									<!-- /wp:paragraph -->
								</div>
								<!-- /wp:group -->

								<!-- wp:image {"sizeSlug":"full","linkDestination":"none"} -->
								<figure class="wp-block-image size-full"><img src="<?php echo esc_url( plugins_url( 'src/assets/images/image-placeholder-large.png', UT_RESEARCH_BLOCKS_FILE ) ); ?>" alt="" /></figure>
								<!-- /wp:image -->
							</div>
							<!-- /wp:group -->
						</div>
					</section>
				</div>
				<!-- /wp:utk-wds/tab -->
			</div>
		</div>
		<!-- /wp:utk-wds/tab-group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->