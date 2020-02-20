const path = require('path');

module.exports = {
	pages: {
		index: {
			entry: 'src/pages/landing',
			title: 'clef.ninja'
		},
		app: {
			entry: 'src/pages/app',
			filename: 'app/index.html'
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				icons: path.resolve(__dirname, 'node_modules/vue-material-design-icons')
			},
			extensions: ['.vue']
		}
	}
};
