import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import SlideContent from './slide-content.jsx';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<SlideContent blockProps={ blockProps }>
			<InnerBlocks
				template={ [ [ 'core/paragraph', { placeholder: 'Slide' } ] ] }
			/>
		</SlideContent>
	);
}
