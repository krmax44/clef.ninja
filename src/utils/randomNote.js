import midiToNote from './midiToNote';
import determineClef from './determineClef';

import * as constants from './noteConstants';

export default function randomNote(clefs = constants.clefs) {
	const mins = clefs.map(clef => constants[clef].min);
	const maxs = clefs.map(clef => constants[clef].max);

	const MIN = Math.min(...mins);
	const MAX = Math.max(...maxs);

	const midiNote = Math.floor(Math.random() * (MAX - MIN)) + MIN;
	const { pitchClass, octave, accidental } = midiToNote(
		midiNote,
		Math.random() < 0.5 ? '#' : 'b'
	);

	const clef = determineClef(midiNote, clefs);

	return { midiNote, pitchClass, octave, accidental, clef };
}
