module.exports = {
	...require('@vue/cli-plugin-unit-jest/presets/typescript/jest-preset'),
	transformIgnorePatterns: ['node_modules/(?!(vue-material-design-icons)/)']
};
