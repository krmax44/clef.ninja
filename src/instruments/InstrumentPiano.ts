import Instrument from './Instrument';
import { toMidi } from '@tonaljs/midi';

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

const scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const NOTES = Array(4)
	.fill(scale)
	.flat()
	.map((n, i) => {
		let octave = Math.floor(i / 7);
		const step = i - octave * 7;
		octave += 2;
		const note = toMidi(`${n}${octave}`);
		const halftone = ['E', 'B'].includes(n) ? false : toMidi(`${n}#${octave}`);
		const before = scale[step === 0 ? scale.length - 1 : step - 1];
		const after = scale[step === scale.length - 1 ? 0 : step + 1];

		return { note, halftone, noteName: n, octave, before, after };
	});

export default piano;
export { NOTES };
