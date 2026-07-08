export default function SlideContent( { blockProps, children } ) {
	const mergedProps = {
		...blockProps,
		className: `${ blockProps.className || '' } utrb-slide`.trim(),
	};

	return <div { ...mergedProps }>{ children }</div>;
}
