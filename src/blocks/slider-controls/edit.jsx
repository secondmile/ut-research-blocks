import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import SliderControlsContent from './slider-controls-content';

export default function Edit( { attributes, setAttributes } ) {
	const { bindToSlider } = attributes;
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title="Slider Controls Settings">
					<TextControl
						label="Bind to Slider Block Class"
						help="Enter the CSS class of the slider block to bind these controls to"
						value={ bindToSlider }
						onChange={ ( value ) =>
							setAttributes( { bindToSlider: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<SliderControlsContent
				blockProps={ blockProps }
				bindToSlider={ bindToSlider }
			/>
		</>
	);
}
