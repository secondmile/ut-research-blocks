export default function SliderContent( {
	blockProps,
	children,
	loop,
	align,
	slidesPerViewMobile,
	slidesPerViewTablet,
	slidesPerViewDesktop,
	containerGapMobile,
	containerGapTablet,
	containerGapDesktop,
} ) {
	const mergedProps = {
		...blockProps,
		className: `${ blockProps.className || '' } utrb-slider`.trim(),
		'data-loop': loop,
		'data-align': align,
		style: {
			...blockProps.style,
			'--utrb-slides-per-view-mobile': slidesPerViewMobile,
			'--utrb-slides-per-view-tablet': slidesPerViewTablet,
			'--utrb-slides-per-view-desktop': slidesPerViewDesktop,
			'--utrb-container-gap-mobile': containerGapMobile,
			'--utrb-container-gap-tablet': containerGapTablet,
			'--utrb-container-gap-desktop': containerGapDesktop,
		},
	};

	return (
		<div { ...mergedProps }>
			<div className="utrb-slider__container">{ children }</div>
		</div>
	);
}
