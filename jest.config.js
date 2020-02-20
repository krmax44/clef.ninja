const preset = require('@vue/cli-plugin-unit-jest/presets/typescript-and-babel/jest-preset');

module.exports = {
	...preset,
	transformIgnorePatterns: ['node_modules/(?!(vue-material-design-icons)/)'],
	coverageReporters: ['text', 'lcovonly'],
	collectCoverageFrom: ['./src/**/*.{js,ts,vue}', '!**/node_modules/**'],
	setupFiles: ['./src/testUtils/window.ts'],
	moduleNameMapper: {
		...preset.moduleNameMapper,
		'^icons/(.*)$': '<rootDir>/node_modules/vue-material-design-icons/$1'
	}
};
