import { useBlockProps } from '@wordpress/block-editor';
import SliderControlsContent from './slider-controls-content';

export default function Save( { attributes } ) {
	const { bindToSlider } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<SliderControlsContent
			blockProps={ blockProps }
			bindToSlider={ bindToSlider }
		/>
	);
}
