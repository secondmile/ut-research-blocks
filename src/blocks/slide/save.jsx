import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import SlideContent from './slide-content.jsx';

export default function Save() {
	const blockProps = useBlockProps.save();

	return (
		<SlideContent blockProps={ blockProps }>
			<InnerBlocks.Content />
		</SlideContent>
	);
}
