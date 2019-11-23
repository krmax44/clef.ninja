import Vex from 'vexflow';
const VF = Vex.Flow;

const notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];

export default function() {
	const octave = Math.floor(Math.random() * (5 - 2)) + 2;
	const clef = octave >= 4 ? 'treble' : 'bass';
	const note = notes[Math.floor(Math.random() * notes.length)];

	const accidental =
		(Math.random() > 0.5 && (Math.random() > 0.5 ? '#' : 'b')) || '';

	const staveNote = new VF.StaveNote({
		keys: [`${note}${accidental}/${octave}`],
		clef,
		duration: 'q'
	});

	if (accidental) {
		staveNote.addAccidental(0, new VF.Accidental(accidental));
	}

	return staveNote;
}
