export default function SliderControlsContent( { blockProps, bindToSlider } ) {
	const mergedProps = {
		...blockProps,
		className: `${
			blockProps.className || ''
		} utrb-slider-controls`.trim(),
		'data-bind-to-slider': bindToSlider || undefined,
	};

	return (
		<div { ...mergedProps }>
			<button
				type="button"
				aria-label="Previous slide"
				className="utrb-slider-controls__button utrb-slider-controls__button--previous"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="16"
					fill="none"
					viewBox="0 0 25 16"
				>
					<g fill="#FF8200" clipPath="url(#a)">
						<path d="M25 6.403h-2.475v3.103H25V6.403Zm-4.95 0h-2.475v3.103h2.475V6.403Zm-4.975 0H12.6v3.103h2.475V6.403Zm-4.95 0H7.65v3.103h2.475V6.403ZM5.1 3.177H2.55v3.177H5.1V3.177ZM2.55 6.354H0V9.53h2.55V6.354ZM7.625 0h-2.55v3.177h2.55V0ZM5.1 9.53H2.55v3.178H5.1V9.53Z" />
						<path d="M2.55 6.354H0V9.53h2.55V6.354Zm5.075 6.353h-2.55v3.177h2.55v-3.177Z" />
					</g>
					<defs>
						<clipPath id="a">
							<path fill="#fff" d="M25 0H0v15.909h25z" />
						</clipPath>
					</defs>
				</svg>
			</button>
			<button
				type="button"
				aria-label="Next slide"
				className="utrb-slider-controls__button utrb-slider-controls__button--next"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="16"
					fill="none"
					viewBox="0 0 25 16"
				>
					<g fill="#FF8200" clipPath="url(#a)">
						<path d="M0 6.403h2.475v3.103H0V6.403Zm4.95 0h2.475v3.103H4.95V6.403Zm4.975 0H12.4v3.103H9.925V6.403Zm4.95 0h2.475v3.103h-2.475V6.403ZM19.9 3.177h2.55v3.177H19.9V3.177Zm2.55 3.177H25V9.53h-2.55V6.354ZM17.375 0h2.55v3.177h-2.55V0ZM19.9 9.53h2.55v3.178H19.9V9.53Z" />
						<path d="M22.45 6.354H25V9.53h-2.55V6.354Zm-5.075 6.353h2.55v3.177h-2.55v-3.177Z" />
					</g>
					<defs>
						<clipPath id="a">
							<path fill="#fff" d="M0 0h25v15.909H0z" />
						</clipPath>
					</defs>
				</svg>
			</button>
		</div>
	);
}
