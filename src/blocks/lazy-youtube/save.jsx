import { useBlockProps } from '@wordpress/block-editor';
import { YouTubeThumbnailPreview } from './youtube-thumbnail-preview';

export function Save( { attributes } ) {
	const {
		videoId,
		thumbnailWidth,
		thumbnailHeight,
		thumbnailUrl,
		imgAlt,
		caption,
		captionPosition,
		captionAlignment,
		loading,
		aspectRatio,
		autoPlayOnViewport,
		playerControls,
		playerRelated,
		playerFullscreen,
		playerLoop,
		playerMute,
		playButtonHorizontalAlignment,
		playButtonVerticalAlignment,
		playButtonWidthPercentage,
		customPlayButtonHorizontalPosition,
		customPlayButtonVerticalPosition,
		customPlayButtonWidth,
		customPlayButtonVisibility,
		playbackMode,
	} = attributes;

	if ( ! videoId || ! thumbnailUrl ) {
		return null;
	}

	const blockProps = useBlockProps.save();

	return (
		<YouTubeThumbnailPreview
			thumbnailUrl={ thumbnailUrl }
			imgAlt={ imgAlt }
			caption={ caption }
			captionPosition={ captionPosition }
			captionAlignment={ captionAlignment }
			width={ thumbnailWidth }
			height={ thumbnailHeight }
			loading={ loading }
			aspectRatio={ aspectRatio }
			videoId={ videoId }
			autoPlayOnViewport={ autoPlayOnViewport }
			playerControls={ playerControls }
			playerRelated={ playerRelated }
			playerFullscreen={ playerFullscreen }
			playerLoop={ playerLoop }
			playerMute={ playerMute }
			playButtonHorizontalAlignment={ playButtonHorizontalAlignment }
			playButtonVerticalAlignment={ playButtonVerticalAlignment }
			playButtonWidthPercentage={ playButtonWidthPercentage }
			customPlayButtonHorizontalPosition={
				customPlayButtonHorizontalPosition
			}
			customPlayButtonVerticalPosition={
				customPlayButtonVerticalPosition
			}
			customPlayButtonWidth={ customPlayButtonWidth }
			customPlayButtonVisibility={ customPlayButtonVisibility }
			playbackMode={ playbackMode }
			blockProps={ blockProps }
		/>
	);
}
