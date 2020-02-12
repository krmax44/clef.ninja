module.exports = {
	theme: {
		fontFamily: {
			sans: ['Assistant']
		},
		extend: {
			colors: {
				'brand-blue': '#30bced',
				'brand-red': '#fc5130'
			},
			maxHeight: {
				'3/4-screen': '75vh'
			}
		}
	},
	plugins: [require('@tailwindcss/custom-forms')]
};
