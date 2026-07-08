/**
 * YouTube Thumbnail Preview Component
 * Displays a YouTube video thumbnail with a play button overlay
 */

export function YouTubeThumbnailPreview( {
	thumbnailUrl,
	imgAlt = null,
	caption = null,
	captionPosition = 'bottom',
	captionAlignment = 'left',
	width = null,
	height = null,
	loading = null,
	aspectRatio = 'landscape',
	videoId = null,
	autoPlayOnViewport = false,
	playerControls = 'youtube',
	playerRelated = false,
	playerFullscreen = true,
	playerLoop = false,
	playerMute = false,
	playButtonHorizontalAlignment = 'center',
	playButtonVerticalAlignment = 'center',
	playButtonWidthPercentage = 20,
	customPlayButtonHorizontalPosition = 'right',
	customPlayButtonVerticalPosition = 'bottom',
	customPlayButtonWidth = 72,
	customPlayButtonVisibility = 'always',
	playbackMode = 'inline',
	blockProps = null,
} ) {
	if ( aspectRatio === 'portrait' ) {
		const temp = width;
		width = height;
		height = temp;
	}

	const getVerticalMargins = ( alignment ) => {
		switch ( alignment ) {
			case 'top':
				return { marginBottom: 'auto' };
			case 'bottom':
				return { marginTop: 'auto' };
			case 'center':
			default:
				return { marginTop: 'auto', marginBottom: 'auto' };
		}
	};

	const getCaptionFlexDirection = ( position ) => {
		return position === 'top' ? 'column-reverse' : 'column';
	};

	const getCustomPlayButtonPositionStyles = ( horizontal, vertical ) => {
		const styles = {};

		// Horizontal positioning
		switch ( horizontal ) {
			case 'left':
				styles.left = '20px';
				break;
			case 'center':
				styles.left = '50%';
				styles.transform = 'translateX(-50%)';
				break;
			case 'right':
				styles.right = '20px';
				break;
			default:
				styles.left = '20px';
		}

		// Vertical positioning
		switch ( vertical ) {
			case 'top':
				styles.top = '20px';
				break;
			case 'center':
				styles.top = '50%';
				if ( styles.transform ) {
					styles.transform += ' translateY(-50%)';
				} else {
					styles.transform = 'translateY(-50%)';
				}
				break;
			case 'bottom':
				styles.bottom = '20px';
				break;
			default:
				styles.top = '20px';
		}

		return styles;
	};

	const customPlayButtonPositionStyles = getCustomPlayButtonPositionStyles(
		customPlayButtonHorizontalPosition,
		customPlayButtonVerticalPosition
	);

	const mergedProps = {
		...blockProps,
		className: `${
			blockProps?.className || ''
		} wp-block-ut-research-blocks-lazy-youtube wp-block-ut-research-blocks-lazy-youtube--${ aspectRatio }`,
		style: {
			...blockProps?.style,
			'--ut-play-button-alignment': playButtonHorizontalAlignment,
			'--ut-play-button-margin-top': getVerticalMargins(
				playButtonVerticalAlignment
			).marginTop,
			'--ut-play-button-margin-bottom': getVerticalMargins(
				playButtonVerticalAlignment
			).marginBottom,
			'--ut-play-button-width': `${ playButtonWidthPercentage }%`,
			'--ut-caption-flex-direction':
				getCaptionFlexDirection( captionPosition ),
			'--ut-custom-play-button-left':
				customPlayButtonPositionStyles.left || 'auto',
			'--ut-custom-play-button-right':
				customPlayButtonPositionStyles.right || 'auto',
			'--ut-custom-play-button-top':
				customPlayButtonPositionStyles.top || 'auto',
			'--ut-custom-play-button-bottom':
				customPlayButtonPositionStyles.bottom || 'auto',
			'--ut-custom-play-button-transform':
				customPlayButtonPositionStyles.transform || 'none',
			'--ut-custom-play-button-width': `${ customPlayButtonWidth }px`,
		},
		'data-video-id': videoId,
		'data-playback-mode': playbackMode,
		'data-auto-play-on-viewport': autoPlayOnViewport ? 'true' : 'false',
		'data-player-controls': playerControls,
		'data-player-related': playerRelated ? 'true' : 'false',
		'data-player-fullscreen': playerFullscreen ? 'true' : 'false',
		'data-player-loop': playerLoop ? 'true' : 'false',
		'data-player-mute': playerMute ? 'true' : 'false',
		'data-custom-play-button-visibility': customPlayButtonVisibility,
	};

	return (
		<div { ...mergedProps }>
			<img
				src={ thumbnailUrl }
				alt={ imgAlt }
				className="wp-block-ut-research-blocks-lazy-youtube__thumbnail"
				width={ width }
				height={ height }
				loading={ loading }
			/>
			<div className="wp-block-ut-research-blocks-lazy-youtube__overlay">
				<button
					className="wp-block-ut-research-blocks-lazy-youtube__play-button"
					type="button"
					aria-label="Play YouTube video"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="98"
						height="98"
						fill="none"
						viewBox="0 0 98 98"
					>
						<path
							fill="#fff"
							d="M43.392 30.16c-4.082-2.262-9.092.69-9.092 5.357v26.966c0 4.667 5.01 7.619 9.092 5.358l28.214-15.626a3.675 3.675 0 0 0 0-6.43L43.392 30.16ZM49 0C21.938 0 0 21.938 0 49s21.938 49 49 49 49-21.938 49-49S76.062 0 49 0ZM7.35 49C7.35 25.997 25.997 7.35 49 7.35S90.65 25.997 90.65 49 72.003 90.65 49 90.65 7.35 72.003 7.35 49Z"
						/>
					</svg>
				</button>
				{ caption && (
					<figcaption
						className="wp-block-ut-research-blocks-lazy-youtube__caption"
						style={ { textAlign: captionAlignment } }
					>
						{ caption }
					</figcaption>
				) }
			</div>
		</div>
	);
}
