import Task from './Task';
import Note from '@/utils/Note';
import Clef from '@/utils/Clef';

import Vex from 'vexflow';
const { Accidental } = Vex.Flow;
import { clefs as CLEFS } from '@/utils/noteConstants';
import { Renderer, StaveNote } from '@/utils/VexHelper';

export default class TaskLickPattern extends Task {
	private checkProgress: boolean[] = [];

	constructor(target: HTMLElement, clefs = CLEFS) {
		super(target);

		const one = Note.random(clefs, 2, 4);
		const oneMidi = one.midiNote;
		const twoMidi = oneMidi + 2;
		const threeMidi = twoMidi + 1;
		const fourMidi = threeMidi + 2;
		const fiveMidi = twoMidi;
		const sixMidi = oneMidi - 2;
		const sevenMidi = oneMidi;

		const [two, three, four, five, six, seven] = [
			twoMidi,
			threeMidi,
			fourMidi,
			fiveMidi,
			sixMidi,
			sevenMidi
		].map(n => {
			const note = new Note(n);
			note.duration = '8';
			return note;
		});

		this.clef = four.determineClef(clefs);

		one.duration = '8';
		five.duration = 'q';
		seven.duration = '8';

		this.notes = [one, two, three, four, five, six, seven];
	}

	staveNotes() {
		return this.notes.map((note, i) => {
			if (this.checkProgress.length === i) {
				note.color = '#31bced';
			} else if (this.checkProgress[i] === true) {
				note.color = '#92dd6e';
			} else if (this.checkProgress[i] === false) {
				note.color = '#fc5130';
			}

			const staveNote = StaveNote([note], this.clef);

			if (!note.accidental) {
				const notesBefore = this.notes.slice(0, i);
				const needsNatural = notesBefore.some(
					n => n.pitchClass[0] === note.pitchClass[0] && n.accidental
				);

				if (needsNatural) {
					staveNote.addAccidental(0, new Accidental('n'));
				}
			}

			return staveNote;
		});
	}

	public render() {
		Renderer.apply(this, [400]);
	}

	public check(input: number) {
		const progress = this.checkProgress.length;
		const correctNotes = this.notes[progress].midiNote;
		const correct = correctNotes === input;
		const done = progress === this.notes.length - 1;
		this.checkProgress.push(correct);

		return { correct, correctNotes: [correctNotes], done };
	}
}
