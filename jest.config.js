module.exports = {
	...require('@vue/cli-plugin-unit-jest/presets/typescript/jest-preset'),
	transformIgnorePatterns: ['node_modules/(?!(vue-material-design-icons)/)'],
	coverageReporters: ['text', 'lcovonly'],
	collectCoverageFrom: ['./src/**/*.{js,ts,vue}', '!**/node_modules/**']
};
