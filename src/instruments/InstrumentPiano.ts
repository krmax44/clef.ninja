import Instrument from './Instrument';
import { toMidi } from '@tonaljs/midi';
import { treble, bass } from '@/utils/noteConstants';

const piano: Instrument = {
	clefs: [treble, bass],
	name: 'piano',
	lowestNote: 36, // C2
	highestNote: 83 // B5
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
