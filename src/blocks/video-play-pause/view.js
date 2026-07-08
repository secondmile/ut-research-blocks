/**
 * Video Play/Pause Button Frontend Logic
 *
 * Handles binding play/pause buttons to WordPress core Video blocks,
 * syncing button state with video state, and managing play/pause interactions.
 */

/**
 * Find the target video element for a given button.
 *
 * @param {HTMLElement} button - The play/pause button element
 * @return {HTMLVideoElement|null} The video element or null if not found
 */
function findTargetVideo( button ) {
	const targetClass = button.getAttribute( 'data-target-class' );

	// Option 1: Manual class override
	if ( targetClass ) {
		const videoFigure = document.querySelector(
			`.wp-block-video.${ targetClass }`
		);
		if ( videoFigure ) {
			return videoFigure.querySelector( 'video' );
		}
	}

	// Option 2: Auto-discovery - find nearest video in same container
	const container = button.closest(
		'.wp-block-group, .wp-block-column, .wp-block-cover, .wp-block-columns'
	);

	if ( container ) {
		return container.querySelector( '.wp-block-video video' );
	}

	// Fallback: Find any video in parent block
	const parentBlock = button.closest( '[class*="wp-block"]' );
	if ( parentBlock ) {
		return parentBlock.querySelector( '.wp-block-video video' );
	}

	return null;
}

/**
 * Sync button state with video state.
 * Updates aria-pressed and aria-label based on video play/pause state.
 *
 * @param {HTMLElement}      button - The play/pause button element
 * @param {HTMLVideoElement} video  - The video element
 */
function syncButtonState( button, video ) {
	const updateButton = () => {
		const isPlaying = ! video.paused;
		button.setAttribute( 'aria-pressed', isPlaying );
		button.setAttribute(
			'aria-label',
			isPlaying ? 'Pause video' : 'Play video'
		);
	};

	// Listen to video events
	video.addEventListener( 'play', updateButton );
	video.addEventListener( 'pause', updateButton );
	video.addEventListener( 'ended', updateButton );

	// Set initial state
	updateButton();
}

/**
 * Setup click handler for play/pause toggle.
 *
 * @param {HTMLElement}      button - The play/pause button element
 * @param {HTMLVideoElement} video  - The video element
 */
function setupClickHandler( button, video ) {
	button.addEventListener( 'click', ( e ) => {
		e.preventDefault();

		if ( video.paused ) {
			video.play().catch( ( error ) => {
				// eslint-disable-next-line no-console
				console.warn( 'Video play failed:', error );
			} );
		} else {
			video.pause();
		}
	} );
}

/**
 * Initialize all video play/pause buttons on the page.
 */
function initializeVideoPlayPauseButtons() {
	const buttons = document.querySelectorAll( '.utrb-video-play-pause' );

	buttons.forEach( ( button ) => {
		const video = findTargetVideo( button );

		if ( ! video ) {
			// eslint-disable-next-line no-console
			console.warn(
				'Video Play/Pause button could not find a target video',
				button
			);
			return;
		}

		// Setup state synchronization
		syncButtonState( button, video );

		// Setup click handler
		setupClickHandler( button, video );
	} );
}

// Initialize when DOM is ready
document.addEventListener( 'DOMContentLoaded', () => {
	initializeVideoPlayPauseButtons();
} );
