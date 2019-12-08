import randomNote from './randomNote';
import midiToNote from './midiToNote';

export default function() {
	const bassMidi = randomNote().midiNote;
	const thirdMidi = bass + Math.random() > 0.5 ? 3 : 4;
	const fifthMidi = bass + 7;

	const chord = [bassMidi, thirdMidi, fifthMidi].map(midiToNote);

	return chord;
}
