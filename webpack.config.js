const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const glob = require( 'glob' );

module.exports = {
	...defaultConfig,
	entry: async () => {
		const defaultEntries = await defaultConfig.entry();
		const componentEntries = {};
		const blockStyleEntries = {};

		// Dynamically generate entries for each component SCSS file
		const componentFiles = glob.sync( 'src/assets/scss/components/*.scss' );
		componentFiles.forEach( ( file ) => {
			// Extract component name from filename (remove .scss extension)
			const componentName = path.basename( file, '.scss' );
			componentEntries[ `components/${ componentName }` ] = path.resolve(
				__dirname,
				file
			);
		} );

		// Dynamically generate entries for each block-styles SCSS file
		const blockStyleFiles = glob.sync(
			'src/assets/scss/block-styles/*.scss'
		);
		blockStyleFiles.forEach( ( file ) => {
			// Extract block style name from filename (remove .scss extension)
			const blockStyleName = path.basename( file, '.scss' );
			blockStyleEntries[ `block-styles/${ blockStyleName }` ] =
				path.resolve( __dirname, file );
		} );

		return {
			...defaultEntries,
			global: path.resolve( __dirname, 'src/assets/js/index.js' ),
			...componentEntries,
			...blockStyleEntries,
		};
	},
};
