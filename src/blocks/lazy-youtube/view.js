/**
 * Lazy YouTube Block - View Script
 * Handles lazy loading of YouTube videos using the YouTube Player API
 * Supports both inline and modal playback modes
 * Reference: https://developers.google.com/youtube/iframe_api_reference
 */

const CLASS_NAMES = {
	block: 'wp-block-ut-research-blocks-lazy-youtube',
	thumbnail: 'wp-block-ut-research-blocks-lazy-youtube__thumbnail',
	video: 'wp-block-ut-research-blocks-lazy-youtube__video',
	customPlayButton:
		'wp-block-ut-research-blocks-lazy-youtube__custom-play-button',
	initialized: 'wp-block-ut-research-blocks-lazy-youtube--initialized',
	playing: 'wp-block-ut-research-blocks-lazy-youtube--playing',
	playerActive: 'wp-block-ut-research-blocks-lazy-youtube--player-active',
	videoWrapper: 'wp-block-ut-research-blocks-lazy-youtube__video-wrapper',
	modalOpen: 'wp-block-ut-research-blocks-lazy-youtube--modal-open',
	overlayModal: 'wp-block-ut-research-blocks-lazy-youtube__overlay-modal',
	closeButton: 'wp-block-ut-research-blocks-lazy-youtube__close-button',
};

/**
 * Duration (in milliseconds) to show the custom button briefly on initialization
 * when visibility is set to 'on-hover'
 */
const CUSTOM_BUTTON_INITIAL_VISIBILITY_DURATION = 4000;

/**
 * Loads the YouTube IFrame API script if not already loaded
 */
function loadYouTubeAPI() {
	if ( window.YT && window.YT.Player ) {
		return Promise.resolve();
	}

	return new Promise( ( resolve ) => {
		// Check if script is already being loaded
		if ( window.onYouTubeIframeAPIReady ) {
			const originalCallback = window.onYouTubeIframeAPIReady;
			window.onYouTubeIframeAPIReady = () => {
				originalCallback();
				resolve();
			};
		} else {
			window.onYouTubeIframeAPIReady = resolve;
		}

		// Load the YouTube API script
		const script = document.createElement( 'script' );
		script.src = 'https://www.youtube.com/iframe_api';
		script.async = true;
		document.head.appendChild( script );
	} );
}

/**
 * Creates a container div for the YouTube player
 * @param {string} videoId - YouTube video ID
 * @return {HTMLDivElement} Container element for the player
 */
function createPlayerContainer( videoId ) {
	const container = document.createElement( 'div' );
	container.className = CLASS_NAMES.video;
	container.id = `yt-player-${ videoId }-${ Math.random()
		.toString( 36 )
		.substring( 2, 11 ) }`;

	return container;
}

/**
 * Creates an SVG element with standard icon attributes
 * @param {string} iconClass - CSS class for the icon
 * @return {SVGSVGElement} Configured SVG element
 */
function createSvgIcon( iconClass ) {
	const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
	svg.setAttribute( 'width', '19' );
	svg.setAttribute( 'height', '21' );
	svg.setAttribute( 'viewBox', '0 0 19 21' );
	svg.setAttribute( 'fill', 'none' );
	svg.classList.add( iconClass );
	return svg;
}

/**
 * Creates an SVG path element with standard styling
 * @param {string} pathData - SVG path data
 * @return {SVGPathElement} Configured path element
 */
function createSvgPath( pathData ) {
	const path = document.createElementNS(
		'http://www.w3.org/2000/svg',
		'path'
	);
	path.setAttribute( 'd', pathData );
	path.setAttribute( 'fill', '#fff' );
	return path;
}

/**
 * Creates a custom play/pause button with SVG icons
 * @return {HTMLButtonElement} The custom button element
 */
function createCustomPlayButton() {
	const button = document.createElement( 'button' );
	button.className = CLASS_NAMES.customPlayButton;
	button.type = 'button';
	button.setAttribute( 'aria-label', 'Play YouTube video' );

	// Play icon SVG (simple triangle)
	const playSvg = createSvgIcon(
		'wp-block-ut-research-blocks-lazy-youtube__custom-play-icon'
	);
	playSvg.appendChild( createSvgPath( 'M1 0.5 L18 10.5 L1 20.5 Z' ) );

	// Pause icon SVG (two bars)
	const pauseSvg = createSvgIcon(
		'wp-block-ut-research-blocks-lazy-youtube__custom-pause-icon'
	);
	pauseSvg.appendChild(
		createSvgPath(
			'M2.042 0A2.042 2.042 0 0 0 0 2.042v16.916C0 20.086.914 21 2.042 21h4.083a2.042 2.042 0 0 0 2.042-2.042V2.042A2.042 2.042 0 0 0 6.125 0H2.042Zm10.5 0A2.042 2.042 0 0 0 10.5 2.042v16.916c0 1.128.914 2.042 2.042 2.042h4.083a2.042 2.042 0 0 0 2.042-2.042V2.042A2.042 2.042 0 0 0 16.625 0h-4.083Z'
		)
	);

	button.appendChild( playSvg );
	button.appendChild( pauseSvg );

	return button;
}

/**
 * Creates a close button for modal mode
 * @return {HTMLButtonElement} The close button element
 */
function createCloseButton() {
	const button = document.createElement( 'button' );
	button.className = CLASS_NAMES.closeButton;
	button.setAttribute( 'aria-label', 'Close video' );
	button.innerHTML = '✕';
	button.type = 'button';

	return button;
}

/**
 * Creates an overlay element for modal mode
 * @return {HTMLDivElement} The overlay element
 */
function createModalOverlay() {
	const overlay = document.createElement( 'div' );
	overlay.className = CLASS_NAMES.overlayModal;

	return overlay;
}

/**
 * Restores the block to show thumbnail (hides player)
 * @param {HTMLElement} block              - The block wrapper element
 * @param {Object}      player             - YouTube player instance
 * @param {boolean}     isModalMode        - True if in modal mode
 * @param {Function}    closeModalCallback - Callback function to close modal
 */
function restoreToThumbnail( block, player, isModalMode, closeModalCallback ) {
	// Remove active states
	block.classList.remove( CLASS_NAMES.playerActive );
	block.classList.remove( CLASS_NAMES.playing );

	// Reset video to beginning for next play
	if ( player ) {
		player.seekTo( 0 );
		player.pauseVideo();
	}

	// Close modal if in modal mode
	if ( isModalMode && closeModalCallback ) {
		closeModalCallback();
	}
}

/**
 * Handles the YouTube player ready event
 * @param {boolean} playerMute - True if video should be muted
 * @return {Function} Event handler function
 */
function createPlayerReadyHandler( playerMute ) {
	return ( event ) => {
		if ( playerMute ) {
			event.target.mute();
		} else {
			event.target.unMute();
		}

		event.target.playVideo();
	};
}

/**
 * Handles the YouTube player state change event
 * @param {boolean}     playerLoop         - True if video should loop
 * @param {string}      playbackMode       - Playback mode ('inline' or 'modal')
 * @param {HTMLElement} block              - The block wrapper element
 * @param {Function}    closeModalCallback - Callback function to close modal
 * @return {Function} Event handler function
 */
function createPlayerStateChangeHandler(
	playerLoop,
	playbackMode,
	block,
	closeModalCallback
) {
	return ( event ) => {
		// Update playing state class
		if ( event.data === window.YT.PlayerState.PLAYING ) {
			block.classList.add( CLASS_NAMES.playing );
		} else {
			block.classList.remove( CLASS_NAMES.playing );
		}

		if ( event.data === window.YT.PlayerState.ENDED ) {
			if ( playerLoop ) {
				event.target.playVideo();
			} else {
				restoreToThumbnail(
					block,
					event.target,
					playbackMode === 'modal',
					closeModalCallback
				);
			}
		}
	};
}

/**
 * Handles the YouTube player error event
 * @param {Event} event - The error event
 */
function createPlayerErrorHandler( event ) {
	// eslint-disable-next-line no-console
	console.error( 'YouTube Player Error:', event.data );
}

/**
 * Initializes a YouTube player using the YouTube Player API
 * @param {HTMLElement} container                 - The container element for the player
 * @param {Object}      config                    - Player configuration object
 * @param {string}      config.videoId            - YouTube video ID
 * @param {string}      config.playerControls     - Player controls mode ('youtube', 'none', 'custom')
 * @param {boolean}     config.playerRelated      - True if related videos should be shown
 * @param {boolean}     config.playerFullscreen   - True if fullscreen button should be shown
 * @param {boolean}     config.playerLoop         - True if video should loop
 * @param {boolean}     config.playerMute         - True if video should be muted
 * @param {HTMLElement} config.block              - The block wrapper element
 * @param {string}      config.playbackMode       - Playback mode ('inline' or 'modal')
 * @param {Function}    config.closeModalCallback - Callback function to close modal
 * @param {number}      config.width              - Width in pixels
 * @param {number}      config.height             - Height in pixels
 * @return {Object} The initialized player instance
 */
function initializeYouTubePlayer( container, config ) {
	const {
		videoId,
		playerControls,
		playerRelated,
		playerFullscreen,
		playerLoop,
		playerMute,
		block,
		playbackMode,
		closeModalCallback,
		width,
		height,
	} = config;

	// Determine YouTube API controls value based on mode
	const youtubeControls = playerControls === 'youtube';

	const player = new window.YT.Player( container.id, {
		width,
		height,
		videoId,
		playerVars: {
			controls: youtubeControls ? 1 : 0,
			rel: playerRelated ? 1 : 0,
			fs: playerFullscreen ? 1 : 0,
		},
		events: {
			onReady: createPlayerReadyHandler( playerMute ),
			onStateChange: createPlayerStateChangeHandler(
				playerLoop,
				playbackMode,
				block,
				closeModalCallback
			),
			onError: createPlayerErrorHandler,
		},
	} );

	return player;
}

/**
 * Sets up auto-play observer for viewport intersection
 * @param {HTMLElement} block       - The block wrapper element
 * @param {Function}    handleClick - Click handler function
 * @return {IntersectionObserver} The observer instance
 */
function setupAutoPlayObserver( block, handleClick ) {
	const observer = new IntersectionObserver(
		( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					handleClick();
					observer.unobserve( block );
				}
			} );
		},
		{
			// Trigger when the block reaches 33.33% from the bottom of the viewport
			rootMargin: '0px 0px -33.33% 0px',
		}
	);

	observer.observe( block );
	return observer;
}

/**
 * Extracts block configuration from data attributes
 * @param {HTMLElement} block - The block wrapper element
 * @return {Object} Configuration object with all block settings
 */
function getBlockConfiguration( block ) {
	return {
		autoPlayOnViewport:
			block.getAttribute( 'data-auto-play-on-viewport' ) === 'true',
		playbackMode: block.getAttribute( 'data-playback-mode' ) || 'inline',
		playerControlsMode:
			block.getAttribute( 'data-player-controls' ) || 'youtube',
		playerRelated: block.getAttribute( 'data-player-related' ) === 'true',
		playerFullscreen:
			block.getAttribute( 'data-player-fullscreen' ) === 'true',
		playerLoop: block.getAttribute( 'data-player-loop' ) === 'true',
		playerMute: block.getAttribute( 'data-player-mute' ) === 'true',
		customPlayButtonVisibility:
			block.getAttribute( 'data-custom-play-button-visibility' ) ||
			'always',
	};
}

/**
 * Activates an existing player and shows it
 * @param {HTMLElement} block  - The block wrapper element
 * @param {Object}      player - YouTube player instance
 */
function activateExistingPlayer( block, player ) {
	block.classList.add( CLASS_NAMES.playerActive );
	player.playVideo();
}

/**
 * Creates a video wrapper with player container
 * @param {string}      videoId   - YouTube video ID
 * @param {HTMLElement} thumbnail - The thumbnail element
 * @return {Object} Object with videoWrapper and playerContainer elements
 */
function createVideoWrapperWithPlayer( videoId, thumbnail ) {
	const playerContainer = createPlayerContainer( videoId );

	const videoWrapper = document.createElement( 'div' );
	videoWrapper.className = CLASS_NAMES.videoWrapper;

	// Add player container to video wrapper (before YouTube API creates iframe)
	videoWrapper.appendChild( playerContainer );

	// Insert video wrapper before thumbnail
	thumbnail.parentNode.insertBefore( videoWrapper, thumbnail );

	return { videoWrapper, playerContainer };
}

/**
 * Sets up modal mode with overlay and close button
 * @param {HTMLElement} block        - The block wrapper element
 * @param {HTMLElement} videoWrapper - The video wrapper element
 * @param {Function}    closeModal   - Callback function to close modal
 * @return {HTMLDivElement} The modal overlay element
 */
function setupModalMode( block, videoWrapper, closeModal ) {
	block.classList.add( CLASS_NAMES.modalOpen );

	// Create and add close button to video wrapper
	const closeButton = createCloseButton();
	videoWrapper.appendChild( closeButton );

	// Create and add modal overlay
	const modalOverlay = createModalOverlay();
	document.body.appendChild( modalOverlay );

	// Setup close listeners
	closeButton.addEventListener( 'click', ( e ) => {
		e.stopPropagation();
		closeModal();
	} );

	modalOverlay.addEventListener( 'click', closeModal );

	// Prevent body scroll when modal is open
	document.body.style.overflow = 'hidden';

	return modalOverlay;
}

/**
 * Sets up custom play/pause controls
 * @param {HTMLElement} videoWrapper               - The video wrapper element
 * @param {Function}    handleCustomButtonClick    - Click handler for custom button
 * @param {string}      customPlayButtonVisibility - Visibility mode ('always' or 'on-hover')
 */
function setupCustomControls(
	videoWrapper,
	handleCustomButtonClick,
	customPlayButtonVisibility
) {
	const customPlayButton = createCustomPlayButton();
	videoWrapper.appendChild( customPlayButton );

	customPlayButton.addEventListener( 'click', ( event ) => {
		handleCustomButtonClick( event );
	} );

	// If visibility is set to on-hover, show button briefly on initialization
	if ( customPlayButtonVisibility === 'on-hover' ) {
		showButtonBrieflyOnInit( customPlayButton );
	}

	return customPlayButton;
}

/**
 * Shows the custom button briefly on initialization
 * @param {HTMLElement} button - The custom play button element
 */
function showButtonBrieflyOnInit( button ) {
	button.style.opacity = '1';
	button.style.pointerEvents = 'auto';
	setTimeout( () => {
		button.style.opacity = '';
		button.style.pointerEvents = '';
	}, CUSTOM_BUTTON_INITIAL_VISIBILITY_DURATION );
}

/**
 * Factory function to create a YouTube block controller
 * Manages state and behavior for a single lazy YouTube block
 * @param {HTMLElement} block     - The block wrapper element
 * @param {string}      videoId   - YouTube video ID
 * @param {HTMLElement} thumbnail - The thumbnail element
 * @param {Object}      config    - Block configuration object
 * @return {Object} Controller object with methods for managing the block
 */
function createYouTubeBlockController( block, videoId, thumbnail, config ) {
	// Private state variables
	let player = null;
	let modalOverlay = null;
	let isInitializing = false;

	const {
		autoPlayOnViewport,
		playbackMode,
		playerControlsMode,
		playerRelated,
		playerFullscreen,
		playerLoop,
		playerMute,
		customPlayButtonVisibility,
	} = config;

	/**
	 * Handles the custom play button click
	 * @param {Event} event - The click event
	 */
	const handleCustomButtonClick = ( event ) => {
		event.stopPropagation();

		if ( ! player ) {
			return;
		}

		const playerState = player.getPlayerState();
		if ( playerState === window.YT.PlayerState.PLAYING ) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
	};

	/**
	 * Closes the modal and transitions to inline playback
	 */
	const closeModal = () => {
		if ( modalOverlay ) {
			modalOverlay.remove();
			modalOverlay = null;
		}

		block.classList.remove( CLASS_NAMES.modalOpen );

		document.body.style.overflow = '';
	};

	/**
	 * Handles the block click event to load and display the video
	 */
	const handleClick = async () => {
		// If player already exists, just activate it
		if ( player ) {
			activateExistingPlayer( block, player );
			return;
		}

		// Prevent multiple simultaneous initialization attempts
		if ( isInitializing ) {
			return;
		}

		isInitializing = true;

		await loadYouTubeAPI();

		// Get block dimensions before adding classes that might affect layout
		const blockHeight = block.offsetHeight;
		const blockWidth = block.offsetWidth;

		block.classList.add( CLASS_NAMES.initialized );
		block.classList.add( CLASS_NAMES.playerActive );

		// Create video wrapper with player container
		const { videoWrapper, playerContainer } = createVideoWrapperWithPlayer(
			videoId,
			thumbnail
		);

		// Handle modal mode
		if ( playbackMode === 'modal' ) {
			modalOverlay = setupModalMode( block, videoWrapper, closeModal );
		}

		// Initialize the YouTube player
		player = initializeYouTubePlayer( playerContainer, {
			videoId,
			playerControls: playerControlsMode,
			playerRelated,
			playerFullscreen,
			playerLoop,
			playerMute,
			block,
			playbackMode,
			closeModalCallback: closeModal,
			width: blockWidth,
			height: blockHeight,
		} );

		// Handle custom play/pause button
		if ( playerControlsMode === 'custom' ) {
			setupCustomControls(
				videoWrapper,
				handleCustomButtonClick,
				customPlayButtonVisibility
			);
		}
	};

	// Public API
	return {
		/**
		 * Initializes the block (sets up auto-play observer or click listener)
		 */
		initialize() {
			if ( autoPlayOnViewport ) {
				setupAutoPlayObserver( block, handleClick );
			} else {
				block.addEventListener( 'click', handleClick );
			}
		},

		/**
		 * Handles the block click event to load and display the video
		 */
		handleClick,

		/**
		 * Handles custom play/pause button clicks
		 */
		handleCustomButtonClick,

		/**
		 * Closes the modal and cleans up
		 */
		closeModal,
	};
}

/**
 * Initializes a single lazy YouTube block
 * @param {HTMLElement} block     - The block wrapper element
 * @param {string}      videoId   - YouTube video ID
 * @param {HTMLElement} thumbnail - The thumbnail element
 */
function initializeContainer( block, videoId, thumbnail ) {
	const config = getBlockConfiguration( block );
	const controller = createYouTubeBlockController(
		block,
		videoId,
		thumbnail,
		config
	);
	controller.initialize();
}

/**
 * Initializes lazy YouTube blocks
 */
function initializeLazyYouTube() {
	const blocks = document.querySelectorAll( `.${ CLASS_NAMES.block }` );

	blocks.forEach( ( block ) => {
		const videoId = block.getAttribute( 'data-video-id' );
		const thumbnail = block.querySelector( `.${ CLASS_NAMES.thumbnail }` );

		// Skip if required elements are missing
		if ( ! thumbnail || ! videoId ) {
			return;
		}

		initializeContainer( block, videoId, thumbnail );
	} );
}

document.addEventListener( 'DOMContentLoaded', initializeLazyYouTube );
