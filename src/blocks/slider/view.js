import EmblaCarousel from 'embla-carousel';

document.addEventListener( 'DOMContentLoaded', () => {
	const sliders = document.querySelectorAll( '.utrb-slider' );

	sliders.forEach( ( slider ) => {
		// Read attributes from data attributes
		const loop = slider.getAttribute( 'data-loop' ) !== 'false';
		const align = slider.getAttribute( 'data-align' ) || 'start';

		const emblaApi = EmblaCarousel( slider, {
			loop,
			align,
		} );

		// Store the Embla instance on the element for external access
		slider.__emblaApi = emblaApi;

		// Emit custom event to signal slider is ready
		slider.dispatchEvent(
			new CustomEvent( 'emblaReady', { detail: { emblaApi } } )
		);
	} );
} );
