import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import SliderContent from './slider-content.jsx';

export default function Save( { attributes } ) {
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
	const blockProps = useBlockProps.save();

	return (
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
			<InnerBlocks.Content />
		</SliderContent>
	);
}
