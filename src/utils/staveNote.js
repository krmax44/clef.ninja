import alwaysArray from 'always-array';

import { StaveNote } from 'vexflow/src/stavenote';
import { Accidental } from 'vexflow/src/accidental';

export default function(notes) {
	return alwaysArray(notes).map((note, i) => {
		const { pitchClass, octave, clef, accidental, color } = note;

		const staveNote = new StaveNote({
			keys: [`${pitchClass}/${octave}`],
			clef,
			duration: 'q'
		});

		if (accidental) {
			staveNote.addAccidental(i, new Accidental(accidental));
		}

		if (color) {
			staveNote.setStyle({ fillStyle: color, strokeStyle: color });
		}

		return staveNote;
	});
}
