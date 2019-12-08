import midiToNote from './midiToNote';
import determineClef from './determineClef';

const MIN = 36; // C1
const MAX = 86; // E6 (will never be reached)

export default function randomNote() {
	const midiNote = Math.floor(Math.random() * (MAX - MIN)) + MIN;
	const { pitchClass, octave, accidental } = midiToNote(
		midiNote,
		Math.random() < 0.5 ? '#' : 'b'
	);

	const clef = determineClef(midiNote);

	return { midiNote, pitchClass, octave, accidental, clef };
}
