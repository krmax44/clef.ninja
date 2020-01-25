module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					chrome: 78
				}
			}
		]
	],
	plugins: ['@babel/plugin-proposal-optional-chaining']
};
