import Instrument from './Instrument';

const guitar: Instrument = {
	constants: {
		treble: {
			min: 55, // G3
			max: 83 // B5
		},

		bass: {
			min: 40, // E2
			max: 65 // F4
		}
	},
	clefs: ['treble', 'bass'],
	name: 'guitar'
};

export default guitar;
