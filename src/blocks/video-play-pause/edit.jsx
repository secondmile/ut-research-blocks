import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function PlayIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="19"
			height="21"
			viewBox="0 0 19 21"
			fill="none"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M1 0.5 L18 10.5 L1 20.5 Z" fill="#fff" />
		</svg>
	);
}

function PauseIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="19"
			height="21"
			viewBox="0 0 19 21"
			fill="none"
			aria-hidden="true"
			focusable="false"
		>
			<path
				fill="#fff"
				d="M2.042 0A2.042 2.042 0 0 0 0 2.042v16.916C0 20.086.914 21 2.042 21h4.083a2.042 2.042 0 0 0 2.042-2.042V2.042A2.042 2.042 0 0 0 6.125 0H2.042Zm10.5 0A2.042 2.042 0 0 0 10.5 2.042v16.916c0 1.128.914 2.042 2.042 2.042h4.083a2.042 2.042 0 0 0 2.042-2.042V2.042A2.042 2.042 0 0 0 16.625 0h-4.083Z"
			/>
		</svg>
	);
}

function VideoPlayPauseButton( { blockProps } ) {
	return (
		<button
			{ ...blockProps }
			type="button"
			aria-label="Play video"
			aria-pressed="false"
		>
			<PlayIcon />
			<PauseIcon />
		</button>
	);
}

export function Edit( { attributes, setAttributes } ) {
	const { targetVideoClass } = attributes;
	const blockProps = useBlockProps( { className: 'utrb-video-play-pause' } );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Video Settings', 'ut-research-blocks' ) }
				>
					<TextControl
						label={ __(
							'Target Video Class (Optional)',
							'ut-research-blocks'
						) }
						help={ __(
							'Leave empty to auto-discover the nearest video, or enter a CSS class for specific targeting.',
							'ut-research-blocks'
						) }
						value={ targetVideoClass }
						onChange={ ( value ) =>
							setAttributes( { targetVideoClass: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<VideoPlayPauseButton blockProps={ blockProps } />
		</>
	);
}

export function Save( { attributes } ) {
	const { targetVideoClass } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'utrb-video-play-pause',
		'data-target-class': targetVideoClass || undefined,
	} );

	return <VideoPlayPauseButton blockProps={ blockProps } />;
}
