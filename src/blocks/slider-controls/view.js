document.addEventListener( 'DOMContentLoaded', () => {
	// Find all slider-controls blocks
	const sliderControlsElements = document.querySelectorAll(
		'.utrb-slider-controls'
	);

	sliderControlsElements.forEach( ( controlsElement ) => {
		const sliderSelector = controlsElement.getAttribute(
			'data-bind-to-slider'
		);

		// If no slider selector is specified, skip this controls block
		if ( ! sliderSelector ) {
			return;
		}

		// Find the slider element using the selector
		const sliderElement = document.querySelector( `.${ sliderSelector }` );

		// If slider element is not found, log a warning and skip
		if ( ! sliderElement ) {
			// eslint-disable-next-line no-console
			console.warn(
				`Slider not found for selector: ${ sliderSelector }`
			);
			return;
		}

		// Function to initialize controls once slider is ready
		const initializeControls = () => {
			// Get the Embla carousel instance from the slider element
			// The slider stores its instance on the element as __emblaApi
			const emblaApi = sliderElement.__emblaApi;

			if ( ! emblaApi ) {
				// eslint-disable-next-line no-console
				console.warn(
					`Embla carousel instance not found for slider: ${ sliderSelector }`
				);
				return;
			}

			// Get the previous and next buttons
			const prevButton = controlsElement.querySelector(
				'.utrb-slider-controls__button--previous'
			);
			const nextButton = controlsElement.querySelector(
				'.utrb-slider-controls__button--next'
			);

			// Function to update button disabled states based on carousel position
			const updateButtonStates = () => {
				const canScrollPrev = emblaApi.canScrollPrev();
				const canScrollNext = emblaApi.canScrollNext();
				const bothDisabled = ! canScrollPrev && ! canScrollNext;

				if ( prevButton ) {
					prevButton.disabled = ! canScrollPrev;
					prevButton.style.display = bothDisabled ? 'none' : '';
				}
				if ( nextButton ) {
					nextButton.disabled = ! canScrollNext;
					nextButton.style.display = bothDisabled ? 'none' : '';
				}
			};

			// Attach click handlers
			if ( prevButton ) {
				prevButton.addEventListener( 'click', () => {
					emblaApi.scrollPrev();
				} );
			}

			if ( nextButton ) {
				nextButton.addEventListener( 'click', () => {
					emblaApi.scrollNext();
				} );
			}

			// Update button states on initialization
			updateButtonStates();

			// Update button states whenever the carousel changes
			emblaApi.on( 'select', updateButtonStates );
			emblaApi.on( 'reInit', updateButtonStates );
		};

		// Check if slider is already initialized
		if ( sliderElement.__emblaApi ) {
			initializeControls();
		} else {
			// Wait for slider to be ready via custom event
			sliderElement.addEventListener( 'emblaReady', initializeControls, {
				once: true,
			} );
		}
	} );
} );
