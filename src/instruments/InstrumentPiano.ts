import Instrument from './Instrument';

const piano: Instrument = {
	constants: {
		treble: {
			min: 55, // G3
			max: 83 // B5
		},

		bass: {
			min: 36, // C2
			max: 65 // F4
		}
	},
	clefs: ['treble', 'bass'],
	name: 'piano'
};

export default piano;
