import midiToNote from '../midiToNote';
import RandomMusic from '../../generators/RandomMusic';

import Vex from 'vexflow';
const { StaveNote, Accidental, StaveTie } = Vex.Flow;

export default class LickPattern extends RandomMusic {
	constructor() {
		super();

		const one = RandomMusic.randomNote();
		const oneMidi = one.midiNote;
		const twoMidi = oneMidi + 2;
		const threeMidi = twoMidi + 1;
		const fourMidi = threeMidi + 2;
		const sixMidi = oneMidi - 2;
		const seven = one;
		const eight = one;

		const [two, three, four, six] = [twoMidi, threeMidi, fourMidi, sixMidi].map(
			n => {
				const note = midiToNote(n);
				note.duration = '8';
				return note;
			}
		);

		const five = two;

		one.duration = '8';
		five.duration = 'q';
		seven.duration = '8';
		eight.duration = 'w';

		this.notes = [one, two, three, four, five, six, seven, eight];
		console.log(this.notes);
	}

	ties() {
		const notes = this.staveNotes();

		return [
			new StaveTie({
				first_note: notes[6],
				last_note: notes[7],
				first_indices: [0],
				last_indices: [0]
			})
		];
	}

	staveNotes() {
		return this.notes.map((note, i) => {
			const { pitchClass, octave, clef, accidental, duration } = note;

			const staveNote = new StaveNote({
				keys: [`${pitchClass}/${octave}`],
				clef,
				duration: duration as string
			});

			if (typeof accidental === 'string') {
				staveNote.addAccidental(i, new Accidental(accidental));
			}

			return staveNote;
		});
	}

	public render = super.render;

	public check() {
		return true;
	}
}
