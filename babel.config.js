module.exports = {
	presets: [
		['@babel/preset-env', { targets: { chrome: 78 } }],
		['@vue/babel-preset-jsx', { injectH: false }]
	],
	plugins: ['@babel/plugin-proposal-optional-chaining']
};
