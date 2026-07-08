import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import SliderContent from './slider-content.jsx';

export default function Edit( { attributes, setAttributes } ) {
	const {
		loop,
		align,
		slidesPerViewMobile,
		slidesPerViewTablet,
		slidesPerViewDesktop,
		containerGapMobile,
		containerGapTablet,
		containerGapDesktop,
	} = attributes;
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title="Slider Settings">
					<ToggleControl
						label="Loop"
						help={
							loop
								? 'Carousel will loop infinitely'
								: 'Carousel will stop at the end'
						}
						checked={ loop }
						onChange={ ( value ) =>
							setAttributes( { loop: value } )
						}
					/>
					<SelectControl
						label="Alignment"
						value={ align }
						options={ [
							{ label: 'Start', value: 'start' },
							{ label: 'Center', value: 'center' },
							{ label: 'End', value: 'end' },
						] }
						onChange={ ( value ) =>
							setAttributes( { align: value } )
						}
					/>
				</PanelBody>
				<PanelBody title="Slides Per View">
					<RangeControl
						label="Mobile"
						value={ slidesPerViewMobile }
						onChange={ ( value ) =>
							setAttributes( { slidesPerViewMobile: value } )
						}
						min={ 1 }
						max={ 6 }
						step={ 0.1 }
					/>
					<RangeControl
						label="Tablet"
						value={ slidesPerViewTablet }
						onChange={ ( value ) =>
							setAttributes( { slidesPerViewTablet: value } )
						}
						min={ 1 }
						max={ 6 }
						step={ 0.1 }
					/>
					<RangeControl
						label="Desktop"
						value={ slidesPerViewDesktop }
						onChange={ ( value ) =>
							setAttributes( { slidesPerViewDesktop: value } )
						}
						min={ 1 }
						max={ 6 }
						step={ 0.1 }
					/>
				</PanelBody>
				<PanelBody title="Container Gap">
					<div style={ { marginBottom: '16px' } }>
						<label
							htmlFor="mobile-gap"
							style={ {
								display: 'block',
								marginBottom: '8px',
								fontWeight: 500,
							} }
						>
							Mobile Gap
						</label>
						<input
							id="mobile-gap"
							type="text"
							value={ containerGapMobile }
							onChange={ ( e ) =>
								setAttributes( {
									containerGapMobile: e.target.value,
								} )
							}
							placeholder="e.g., 0.75rem, 12px"
							style={ {
								width: '100%',
								padding: '8px',
								boxSizing: 'border-box',
							} }
						/>
					</div>
					<div style={ { marginBottom: '16px' } }>
						<label
							htmlFor="tablet-gap"
							style={ {
								display: 'block',
								marginBottom: '8px',
								fontWeight: 500,
							} }
						>
							Tablet Gap
						</label>
						<input
							id="tablet-gap"
							type="text"
							value={ containerGapTablet }
							onChange={ ( e ) =>
								setAttributes( {
									containerGapTablet: e.target.value,
								} )
							}
							placeholder="e.g., 0.875rem, 14px"
							style={ {
								width: '100%',
								padding: '8px',
								boxSizing: 'border-box',
							} }
						/>
					</div>
					<div>
						<label
							htmlFor="desktop-gap"
							style={ {
								display: 'block',
								marginBottom: '8px',
								fontWeight: 500,
							} }
						>
							Desktop Gap
						</label>
						<input
							id="desktop-gap"
							type="text"
							value={ containerGapDesktop }
							onChange={ ( e ) =>
								setAttributes( {
									containerGapDesktop: e.target.value,
								} )
							}
							placeholder="e.g., 1rem, 16px"
							style={ {
								width: '100%',
								padding: '8px',
								boxSizing: 'border-box',
							} }
						/>
					</div>
				</PanelBody>
			</InspectorControls>
			<SliderContent
				blockProps={ blockProps }
				loop={ loop }
				align={ align }
				slidesPerViewMobile={ slidesPerViewMobile }
				slidesPerViewTablet={ slidesPerViewTablet }
				slidesPerViewDesktop={ slidesPerViewDesktop }
				containerGapMobile={ containerGapMobile }
				containerGapTablet={ containerGapTablet }
				containerGapDesktop={ containerGapDesktop }
			>
				<InnerBlocks
					allowedBlocks={ [ 'ut-research-blocks/slide' ] }
					template={ [
						[
							'ut-research-blocks/slide',
							{},
							[
								[
									'core/paragraph',
									{ placeholder: 'Slide 1' },
								],
							],
						],
						[
							'ut-research-blocks/slide',
							{},
							[
								[
									'core/paragraph',
									{ placeholder: 'Slide 2' },
								],
							],
						],
						[
							'ut-research-blocks/slide',
							{},
							[
								[
									'core/paragraph',
									{ placeholder: 'Slide 3' },
								],
							],
						],
					] }
				/>
			</SliderContent>
		</>
	);
}
