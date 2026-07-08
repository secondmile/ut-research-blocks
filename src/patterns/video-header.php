<?php
/**
 * Title: Video Header
 * Slug: ut-research-blocks/video-header
 * Description: Full-width video header with research institute branding, featuring a prominent heading, descriptive text, and call-to-action link with orange accent borders.
 * Categories: ut-research-patterns
 * Keywords: research
 * Viewport Width: 1500
 * Inserter: true
 *
 * @package UTResearchBlocks
 */

?>

<!-- wp:group {"metadata":{"categories":["ut-research-patterns"],"patternName":"ut-research-blocks/video-header","name":"Video Header"},"align":"full","className":"utrb-video-header","style":{"border":{"bottom":{"color":"var:preset|color|orange","width":"8px"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull utrb-video-header" style="border-bottom-color:var(--wp--preset--color--orange);border-bottom-width:8px"><!-- wp:group {"align":"wide","className":"utrb-video-header__container","layout":{"type":"constrained"}} -->
	<div class="wp-block-group alignwide utrb-video-header__container"><!-- wp:group {"metadata":{"name":"Video Wrapper","blockVisibility":false},"align":"full","className":"utrb-video-header__video_wrapper","layout":{"type":"default"}} -->
		<div class="wp-block-group alignfull utrb-video-header__video_wrapper"><!-- wp:video {"align":"full","className":"utrb-video-header__video"} -->
			<figure class="wp-block-video alignfull utrb-video-header__video"><video autoplay loop muted src="<?php echo esc_url( plugins_url( 'src/assets/videos/video-placeholder-sd.mp4', UT_RESEARCH_BLOCKS_FILE ) ); ?>" playsinline></video></figure>
			<!-- /wp:video -->

			<!-- wp:ut-research-blocks/video-play-pause -->
			<button class="wp-block-ut-research-blocks-video-play-pause utrb-video-play-pause" type="button" aria-label="Play video" aria-pressed="false"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none" aria-hidden="true" focusable="false">
					<path d="M1 0.5 L18 10.5 L1 20.5 Z" fill="#fff"></path>
				</svg><svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none" aria-hidden="true" focusable="false">
					<path fill="#fff" d="M2.042 0A2.042 2.042 0 0 0 0 2.042v16.916C0 20.086.914 21 2.042 21h4.083a2.042 2.042 0 0 0 2.042-2.042V2.042A2.042 2.042 0 0 0 6.125 0H2.042Zm10.5 0A2.042 2.042 0 0 0 10.5 2.042v16.916c0 1.128.914 2.042 2.042 2.042h4.083a2.042 2.042 0 0 0 2.042-2.042V2.042A2.042 2.042 0 0 0 16.625 0h-4.083Z"></path>
				</svg></button>
			<!-- /wp:ut-research-blocks/video-play-pause -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"metadata":{"name":"Video Wrapper (YouTube)"},"align":"full","className":"utrb-video-header__video_wrapper","layout":{"type":"default"}} -->
		<div class="wp-block-group alignfull utrb-video-header__video_wrapper"><!-- wp:ut-research-blocks/lazy-youtube {"videoId":"lY8h0P3mQoY","thumbnailUrl":"https://i.ytimg.com/vi_webp/lY8h0P3mQoY/maxresdefault.webp","autoPlayOnViewport":true,"playerControls":"custom","playerMute":true,"align":"full","className":"utrb-video-header__video"} -->
			<div class="wp-block-ut-research-blocks-lazy-youtube alignfull utrb-video-header__video wp-block-ut-research-blocks-lazy-youtube wp-block-ut-research-blocks-lazy-youtube--landscape" style="--ut-play-button-alignment:center;--ut-play-button-margin-top:auto;--ut-play-button-margin-bottom:auto;--ut-play-button-width:20%;--ut-caption-flex-direction:column;--ut-custom-play-button-left:auto;--ut-custom-play-button-right:20px;--ut-custom-play-button-top:auto;--ut-custom-play-button-bottom:20px;--ut-custom-play-button-transform:none;--ut-custom-play-button-width:72px" data-video-id="lY8h0P3mQoY" data-playback-mode="inline" data-auto-play-on-viewport="true" data-player-controls="custom" data-player-related="false" data-player-fullscreen="true" data-player-loop="false" data-player-mute="true" data-custom-play-button-visibility="always"><img src="https://i.ytimg.com/vi_webp/lY8h0P3mQoY/maxresdefault.webp" alt="YouTube video thumbnail" class="wp-block-ut-research-blocks-lazy-youtube__thumbnail" width="1280" height="720" loading="lazy" />
				<div class="wp-block-ut-research-blocks-lazy-youtube__overlay"><button class="wp-block-ut-research-blocks-lazy-youtube__play-button" type="button" aria-label="Play YouTube video"><svg xmlns="http://www.w3.org/2000/svg" width="98" height="98" fill="none" viewBox="0 0 98 98">
							<path fill="#fff" d="M43.392 30.16c-4.082-2.262-9.092.69-9.092 5.357v26.966c0 4.667 5.01 7.619 9.092 5.358l28.214-15.626a3.675 3.675 0 0 0 0-6.43L43.392 30.16ZM49 0C21.938 0 0 21.938 0 49s21.938 49 49 49 49-21.938 49-49S76.062 0 49 0ZM7.35 49C7.35 25.997 25.997 7.35 49 7.35S90.65 25.997 90.65 49 72.003 90.65 49 90.65 7.35 72.003 7.35 49Z"></path>
						</svg></button></div>
			</div>
			<!-- /wp:ut-research-blocks/lazy-youtube -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"align":"full","className":"utrb-video-header__content","style":{"spacing":{"margin":{"top":"0px"},"padding":{"bottom":"55px","top":"43px"},"blockGap":"18px"}},"layout":{"type":"flex","orientation":"vertical"}} -->
		<div class="wp-block-group alignfull utrb-video-header__content" style="margin-top:0px;padding-top:43px;padding-bottom:55px"><!-- wp:heading {"level":1,"style":{"typography":{"fontSize":"61px"}}} -->
			<h1 class="wp-block-heading" style="font-size:61px">Institute for advanced materials &amp; manufacturing</h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Advancing our understanding of materials and facilitating the translation of new knowledge into solutions, products, and services that benefit our global society</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"utrb-video-header__cta-link is-style-utkwds-cta-link","style":{"spacing":{"margin":{"top":"18px"}}}} -->
			<p class="utrb-video-header__cta-link is-style-utkwds-cta-link" style="margin-top:18px"><a href="https://www.utk.edu/">Call To Action</a></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->