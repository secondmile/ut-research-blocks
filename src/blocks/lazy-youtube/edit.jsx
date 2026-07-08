import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import {
	useBlockProps,
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	Notice,
	Button,
	BaseControl,
	ToggleControl,
	RangeControl,
} from '@wordpress/components';
import { YouTubeThumbnailPreview } from './youtube-thumbnail-preview';
import { THUMBNAIL_DIMENSIONS } from './constants';

/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube URL
 * @return {string|null} - Video ID or null if invalid
 */
function extractYouTubeId( url ) {
	if ( ! url ) return null;

	// Pattern 1: youtube.com/watch?v=VIDEO_ID
	const watchPattern = /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;

	// Pattern 2: youtu.be/VIDEO_ID
	const shortPattern = /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/;

	// Pattern 3: youtube.com/embed/VIDEO_ID
	const embedPattern = /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;

	// Pattern 4: youtube.com/v/VIDEO_ID
	const vPattern = /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/;

	// Pattern 5: m.youtube.com/watch?v=VIDEO_ID
	const mobilePattern = /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;

	// Pattern 6: youtube.com/shorts/VIDEO_ID
	const shortsPattern = /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/;

	// Pattern 7: m.youtube.com/shorts/VIDEO_ID
	const mobileShortsPattern = /(?:m\.youtube\.com\/shorts\/)([a-zA-Z0-9_-]+)/;

	const patterns = [
		watchPattern,
		shortPattern,
		embedPattern,
		vPattern,
		mobilePattern,
		shortsPattern,
		mobileShortsPattern,
	];

	for ( const pattern of patterns ) {
		const match = url.match( pattern );
		if ( match && match[ 1 ] ) {
			return match[ 1 ];
		}
	}

	// Direct video ID (11 characters)
	if ( /^[a-zA-Z0-9_-]{11}$/.test( url ) ) {
		return url;
	}

	return null;
}

/**
 * Detect if a YouTube URL is a short (portrait) or regular (landscape) video
 * @param {string} url - YouTube URL
 * @return {string} - 'portrait' for shorts, 'landscape' for regular videos
 */
function detectAspectRatioFromUrl( url ) {
	if ( ! url ) return 'landscape';

	// Check if it's a YouTube Shorts URL
	const shortsPattern =
		/(?:youtube\.com|youtu\.be|m\.youtube\.com)\/shorts\//;
	if ( shortsPattern.test( url ) ) {
		return 'portrait';
	}

	return 'landscape';
}

export function Edit( { attributes, setAttributes } ) {
	const {
		videoId,
		thumbnailType,
		thumbnailUrl,
		youtubeThumbnailSize,
		customThumbnailId,
		customThumbnailSize,
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
	const [ videoUrl, setVideoUrl ] = useState(
		videoId ? `https://www.youtube.com/watch?v=${ videoId }` : ''
	);
	const [ availableSizes, setAvailableSizes ] = useState( {} );
	const blockProps = useBlockProps();

	// Fetch available image sizes when media ID changes
	useEffect( () => {
		if ( ! customThumbnailId ) {
			setAvailableSizes( {} );
			return;
		}

		apiFetch( { path: `/wp/v2/media/${ customThumbnailId }` } ).then(
			( data ) => {
				if ( data.media_details && data.media_details.sizes ) {
					setAvailableSizes( data.media_details.sizes );
				}
			}
		);
	}, [ customThumbnailId ] );

	// Compute and save thumbnail URL to block attributes
	useEffect( () => {
		let computedUrl = '';

		if ( thumbnailType === 'youtube' && videoId ) {
			computedUrl = `https://i.ytimg.com/vi_webp/${ videoId }/${ youtubeThumbnailSize }.webp`;
		} else if ( thumbnailType === 'custom' && customThumbnailId ) {
			if ( availableSizes[ customThumbnailSize ] ) {
				computedUrl = availableSizes[ customThumbnailSize ].source_url;
			}
		}

		setAttributes( { thumbnailUrl: computedUrl } );
	}, [
		thumbnailType,
		videoId,
		youtubeThumbnailSize,
		customThumbnailId,
		customThumbnailSize,
		availableSizes,
		setAttributes,
	] );

	// Reevaluate thumbnail width and height when thumbnail type changes
	useEffect( () => {
		if ( thumbnailType === 'youtube' ) {
			// Use dimensions from YouTube thumbnail size
			const { width, height } =
				THUMBNAIL_DIMENSIONS[ youtubeThumbnailSize ];
			setAttributes( {
				thumbnailWidth: width,
				thumbnailHeight: height,
			} );
		} else if ( thumbnailType === 'custom' && customThumbnailId ) {
			// Use dimensions from custom thumbnail size
			const selectedSize = availableSizes[ customThumbnailSize ];
			if ( selectedSize ) {
				setAttributes( {
					thumbnailWidth: selectedSize.width,
					thumbnailHeight: selectedSize.height,
				} );
			}
		}
	}, [
		thumbnailType,
		youtubeThumbnailSize,
		customThumbnailSize,
		customThumbnailId,
		availableSizes,
		setAttributes,
	] );

	const handleUrlChange = ( url ) => {
		setVideoUrl( url );

		const extractedId = extractYouTubeId( url );
		const detectedAspectRatio = detectAspectRatioFromUrl( url );
		setAttributes( {
			videoId: extractedId,
			aspectRatio: detectedAspectRatio,
		} );
	};

	const handleCustomThumbnailSelect = ( media ) => {
		setAttributes( {
			customThumbnailId: media.id,
			customThumbnailSize: 'full',
		} );
	};

	const handleCustomThumbnailSizeChange = ( sizeName ) => {
		const selectedSize = availableSizes[ sizeName ];
		if ( selectedSize ) {
			setAttributes( {
				customThumbnailSize: sizeName,
				thumbnailWidth: selectedSize.width,
				thumbnailHeight: selectedSize.height,
			} );
		}
	};

	const handleRemoveCustomThumbnail = () => {
		setAttributes( {
			customThumbnailId: 0,
			customThumbnailSize: 'full',
		} );
		setAvailableSizes( {} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Video Source', 'ut-research-blocks' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __(
							'YouTube Video URL or ID',
							'ut-research-blocks'
						) }
						help={ __(
							'Enter a YouTube URL or video ID',
							'ut-research-blocks'
						) }
						value={ videoUrl }
						onChange={ handleUrlChange }
						placeholder="https://www.youtube.com/watch?v=..."
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Playback Mode', 'ut-research-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Playback Mode', 'ut-research-blocks' ) }
						help={ __(
							'Choose how the video plays: inline plays immediately, modal opens in a popup first',
							'ut-research-blocks'
						) }
						value={ playbackMode }
						options={ [
							{
								label: __(
									'Inline (Play immediately)',
									'ut-research-blocks'
								),
								value: 'inline',
							},
							{
								label: __(
									'Modal (Open in popup)',
									'ut-research-blocks'
								),
								value: 'modal',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { playbackMode: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Thumbnail Settings', 'ut-research-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Thumbnail Source', 'ut-research-blocks' ) }
						help={ __(
							'Choose where to get the video thumbnail',
							'ut-research-blocks'
						) }
						value={ thumbnailType }
						options={ [
							{
								label: __(
									'Use YouTube Thumbnail',
									'ut-research-blocks'
								),
								value: 'youtube',
							},
							{
								label: __(
									'Upload Custom Image',
									'ut-research-blocks'
								),
								value: 'custom',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { thumbnailType: value } )
						}
					/>

					{ thumbnailType === 'youtube' && (
						<SelectControl
							label={ __(
								'Thumbnail Size',
								'ut-research-blocks'
							) }
							value={ youtubeThumbnailSize }
							options={ Object.entries(
								THUMBNAIL_DIMENSIONS
							).map( ( [ key, { label, width, height } ] ) => ( {
								label: `${ label } (${ width }x${ height })`,
								value: key,
							} ) ) }
							onChange={ ( value ) => {
								const { width, height } =
									THUMBNAIL_DIMENSIONS[ value ];
								setAttributes( {
									thumbnailWidth: width,
									thumbnailHeight: height,
									youtubeThumbnailSize: value,
								} );
							} }
						/>
					) }

					{ thumbnailType === 'custom' && (
						<BaseControl
							id="custom-thumbnail-control"
							label={ __(
								'Custom Thumbnail',
								'ut-research-blocks'
							) }
							help={ __(
								'Upload a custom image to use as the video thumbnail',
								'ut-research-blocks'
							) }
						>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ handleCustomThumbnailSelect }
									allowedTypes={ [ 'image' ] }
									value={ attributes.customThumbnailId }
									render={ ( { open } ) => (
										<div>
											{ thumbnailUrl &&
												thumbnailType === 'custom' && (
													<div
														style={ {
															marginBottom:
																'12px',
														} }
													>
														<img
															src={ thumbnailUrl }
															alt={ __(
																'Custom thumbnail preview',
																'ut-research-blocks'
															) }
															style={ {
																maxWidth:
																	'100%',
																height: 'auto',
																borderRadius:
																	'4px',
															} }
														/>
													</div>
												) }
											<Button
												onClick={ open }
												variant="primary"
											>
												{ customThumbnailId
													? __(
															'Change Image',
															'ut-research-blocks'
													  )
													: __(
															'Select Image',
															'ut-research-blocks'
													  ) }
											</Button>
											{ !! customThumbnailId && (
												<Button
													onClick={
														handleRemoveCustomThumbnail
													}
													variant="secondary"
													style={ {
														marginLeft: '8px',
													} }
												>
													{ __(
														'Remove',
														'ut-research-blocks'
													) }
												</Button>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
						</BaseControl>
					) }

					{ thumbnailType === 'custom' &&
						!! customThumbnailId &&
						Object.keys( availableSizes ).length > 0 && (
							<SelectControl
								label={ __(
									'Image Size',
									'ut-research-blocks'
								) }
								help={ __(
									'Select which size of the image to use as the thumbnail',
									'ut-research-blocks'
								) }
								value={ customThumbnailSize }
								options={ Object.entries( availableSizes ).map(
									( [ sizeName, sizeData ] ) => ( {
										label: `${
											sizeName.charAt( 0 ).toUpperCase() +
											sizeName.slice( 1 )
										} (${ sizeData.width }×${
											sizeData.height
										})`,
										value: sizeName,
									} )
								) }
								onChange={ handleCustomThumbnailSizeChange }
							/>
						) }

					<TextControl
						label={ __(
							'Thumbnail Alt Text',
							'ut-research-blocks'
						) }
						help={ __(
							'Describe the video for accessibility',
							'ut-research-blocks'
						) }
						value={ imgAlt }
						onChange={ ( value ) =>
							setAttributes( { imgAlt: value } )
						}
						placeholder="YouTube video thumbnail"
					/>

					<SelectControl
						label={ __(
							'Thumbnail Loading',
							'ut-research-blocks'
						) }
						value={ loading }
						options={ [
							{
								label: __( 'Lazy', 'ut-research-blocks' ),
								value: 'lazy',
							},
							{
								label: __( 'Eager', 'ut-research-blocks' ),
								value: 'eager',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { loading: value } )
						}
						help={ __(
							'Lazy loading defers image loading until needed. Eager loads immediately.',
							'ut-research-blocks'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Display & Layout', 'ut-research-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Aspect Ratio', 'ut-research-blocks' ) }
						value={ aspectRatio }
						options={ [
							{
								label: __(
									'Landscape (16:9)',
									'ut-research-blocks'
								),
								value: 'landscape',
							},
							{
								label: __(
									'Portrait (9:16)',
									'ut-research-blocks'
								),
								value: 'portrait',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { aspectRatio: value } )
						}
						help={ __(
							'Auto-detected from YouTube Shorts URLs. Landscape for regular videos, Portrait for Shorts.',
							'ut-research-blocks'
						) }
					/>

					<SelectControl
						label={ __(
							'Play Button Horizontal Alignment',
							'ut-research-blocks'
						) }
						value={ playButtonHorizontalAlignment }
						options={ [
							{
								label: __( 'Left', 'ut-research-blocks' ),
								value: 'flex-start',
							},
							{
								label: __( 'Center', 'ut-research-blocks' ),
								value: 'center',
							},
							{
								label: __( 'Right', 'ut-research-blocks' ),
								value: 'flex-end',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( {
								playButtonHorizontalAlignment: value,
							} )
						}
						help={ __(
							'Control the horizontal alignment of the play button',
							'ut-research-blocks'
						) }
					/>

					<SelectControl
						label={ __(
							'Play Button Vertical Alignment',
							'ut-research-blocks'
						) }
						value={ playButtonVerticalAlignment }
						options={ [
							{
								label: __( 'Top', 'ut-research-blocks' ),
								value: 'top',
							},
							{
								label: __( 'Center', 'ut-research-blocks' ),
								value: 'center',
							},
							{
								label: __( 'Bottom', 'ut-research-blocks' ),
								value: 'bottom',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( {
								playButtonVerticalAlignment: value,
							} )
						}
						help={ __(
							'Control the vertical alignment of the play button',
							'ut-research-blocks'
						) }
					/>

					<RangeControl
						label={ __(
							'Play Button Width (%)',
							'ut-research-blocks'
						) }
						value={ playButtonWidthPercentage }
						onChange={ ( value ) =>
							setAttributes( {
								playButtonWidthPercentage: value,
							} )
						}
						min={ 5 }
						max={ 100 }
						step={ 1 }
						help={ __(
							'Set the width of the play button as a percentage',
							'ut-research-blocks'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Caption', 'ut-research-blocks' ) }
					initialOpen={ false }
				>
					<TextareaControl
						label={ __( 'Caption Text', 'ut-research-blocks' ) }
						help={ __(
							'Optional caption displayed with the video',
							'ut-research-blocks'
						) }
						value={ caption }
						onChange={ ( value ) =>
							setAttributes( { caption: value } )
						}
						placeholder="Enter caption text"
					/>

					<SelectControl
						label={ __( 'Caption Position', 'ut-research-blocks' ) }
						value={ captionPosition }
						options={ [
							{
								label: __( 'Top', 'ut-research-blocks' ),
								value: 'top',
							},
							{
								label: __( 'Bottom', 'ut-research-blocks' ),
								value: 'bottom',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { captionPosition: value } )
						}
						help={ __(
							'Display caption at the top or bottom of the video',
							'ut-research-blocks'
						) }
					/>

					<SelectControl
						label={ __(
							'Caption Alignment',
							'ut-research-blocks'
						) }
						value={ captionAlignment }
						options={ [
							{
								label: __( 'Left', 'ut-research-blocks' ),
								value: 'left',
							},
							{
								label: __( 'Center', 'ut-research-blocks' ),
								value: 'center',
							},
							{
								label: __( 'Right', 'ut-research-blocks' ),
								value: 'right',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { captionAlignment: value } )
						}
						help={ __(
							'Align caption text horizontally',
							'ut-research-blocks'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Playback Controls', 'ut-research-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Player Controls', 'ut-research-blocks' ) }
						help={ __(
							'Choose how to display playback controls',
							'ut-research-blocks'
						) }
						value={ playerControls }
						options={ [
							{
								label: __(
									'YouTube Default',
									'ut-research-blocks'
								),
								value: 'youtube',
							},
							{
								label: __( 'None', 'ut-research-blocks' ),
								value: 'none',
							},
							{
								label: __(
									'Custom Play/Pause Button',
									'ut-research-blocks'
								),
								value: 'custom',
							},
						] }
						onChange={ ( value ) => {
							const updates = { playerControls: value };

							if ( value !== 'youtube' ) {
								updates.playerMute = true;
							}
							setAttributes( updates );
						} }
					/>

					{ playerControls === 'custom' && (
						<>
							<SelectControl
								label={ __(
									'Custom Play Button Horizontal Position',
									'ut-research-blocks'
								) }
								value={ customPlayButtonHorizontalPosition }
								options={ [
									{
										label: __(
											'Left',
											'ut-research-blocks'
										),
										value: 'left',
									},
									{
										label: __(
											'Center',
											'ut-research-blocks'
										),
										value: 'center',
									},
									{
										label: __(
											'Right',
											'ut-research-blocks'
										),
										value: 'right',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( {
										customPlayButtonHorizontalPosition:
											value,
									} )
								}
								help={ __(
									'Control the horizontal position of the custom play button',
									'ut-research-blocks'
								) }
							/>

							<SelectControl
								label={ __(
									'Custom Play Button Vertical Position',
									'ut-research-blocks'
								) }
								value={ customPlayButtonVerticalPosition }
								options={ [
									{
										label: __(
											'Top',
											'ut-research-blocks'
										),
										value: 'top',
									},
									{
										label: __(
											'Center',
											'ut-research-blocks'
										),
										value: 'center',
									},
									{
										label: __(
											'Bottom',
											'ut-research-blocks'
										),
										value: 'bottom',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( {
										customPlayButtonVerticalPosition: value,
									} )
								}
								help={ __(
									'Control the vertical position of the custom play button',
									'ut-research-blocks'
								) }
							/>

							<RangeControl
								label={ __(
									'Custom Play Button Width (px)',
									'ut-research-blocks'
								) }
								value={ customPlayButtonWidth }
								onChange={ ( value ) =>
									setAttributes( {
										customPlayButtonWidth: value,
									} )
								}
								min={ 20 }
								max={ 200 }
								step={ 1 }
								help={ __(
									'Set the width of the custom play button in pixels',
									'ut-research-blocks'
								) }
							/>

							<SelectControl
								label={ __(
									'Custom Play Button Visibility',
									'ut-research-blocks'
								) }
								value={ customPlayButtonVisibility }
								options={ [
									{
										label: __(
											'Always Visible',
											'ut-research-blocks'
										),
										value: 'always',
									},
									{
										label: __(
											'Show on Hover',
											'ut-research-blocks'
										),
										value: 'on-hover',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( {
										customPlayButtonVisibility: value,
									} )
								}
								help={ __(
									'Control when the custom play button is visible',
									'ut-research-blocks'
								) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Playback Behavior', 'ut-research-blocks' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Auto-play on Viewport',
							'ut-research-blocks'
						) }
						help={ __(
							'Automatically load and play the video when the block becomes fully visible in the viewport',
							'ut-research-blocks'
						) }
						checked={ autoPlayOnViewport }
						onChange={ ( value ) => {
							const updates = { autoPlayOnViewport: value };

							if ( value ) {
								updates.playerMute = true;
							}
							setAttributes( updates );
						} }
					/>

					<ToggleControl
						label={ __(
							'Show Related Videos from Any Channel',
							'ut-research-blocks'
						) }
						help={ __(
							'When disabled, related videos from the same channel will be shown. When enabled, related videos from any channel will be shown.',
							'ut-research-blocks'
						) }
						checked={ playerRelated }
						onChange={ ( value ) =>
							setAttributes( { playerRelated: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Allow Fullscreen', 'ut-research-blocks' ) }
						help={ __(
							'Allow users to view the video in fullscreen mode',
							'ut-research-blocks'
						) }
						checked={ playerFullscreen }
						onChange={ ( value ) =>
							setAttributes( { playerFullscreen: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Loop Video', 'ut-research-blocks' ) }
						help={ __(
							'Automatically restart the video when it finishes playing',
							'ut-research-blocks'
						) }
						checked={ playerLoop }
						onChange={ ( value ) =>
							setAttributes( { playerLoop: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Mute Video', 'ut-research-blocks' ) }
						help={ __(
							'Mute the video by default. When auto-play is enabled or the player controls are hidden, the video is always muted.',
							'ut-research-blocks'
						) }
						checked={ playerMute }
						onChange={ ( value ) =>
							setAttributes( { playerMute: value } )
						}
						disabled={
							autoPlayOnViewport || playerControls !== 'youtube'
						}
					/>
				</PanelBody>
			</InspectorControls>

			{ ! videoId && (
				<Notice status="info" isDismissible={ false }>
					{ __(
						'Enter a valid YouTube URL in the block settings',
						'ut-research-blocks'
					) }
				</Notice>
			) }
			{ videoId && thumbnailUrl && (
				<YouTubeThumbnailPreview
					thumbnailUrl={ thumbnailUrl }
					caption={ caption }
					captionPosition={ captionPosition }
					captionAlignment={ captionAlignment }
					aspectRatio={ aspectRatio }
					imgAlt={ imgAlt }
					blockProps={ blockProps }
					playButtonHorizontalAlignment={
						playButtonHorizontalAlignment
					}
					playButtonVerticalAlignment={ playButtonVerticalAlignment }
					playButtonWidthPercentage={ playButtonWidthPercentage }
				/>
			) }
			{ videoId && ! thumbnailUrl && (
				<Notice status="warning" isDismissible={ false }>
					{ thumbnailType === 'custom'
						? __(
								'Please upload a custom thumbnail image',
								'ut-research-blocks'
						  )
						: __(
								'Thumbnail will load from YouTube',
								'ut-research-blocks'
						  ) }
				</Notice>
			) }
		</>
	);
}
