import Task from './Task';
import Note from '@/utils/Note';
import Vue from 'vue';

import Vex from 'vexflow';
const { Accidental } = Vex.Flow;
import { clefs as CLEFS } from '@/utils/noteConstants';
import { Renderer, StaveNote } from '@/utils/VexHelper';

function generatePattern(one: Note): Note[] {
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

	one.duration = '8';
	five.duration = 'q';
	seven.duration = '8';

	return [one, two, three, four, five, six, seven];
}

export default class TaskLickPattern extends Task {
	private checkProgress: boolean[] = [];

	constructor(target: HTMLElement, clefs = CLEFS, difficulty = 2) {
		super(target, clefs, difficulty);

		let start: Note;
		let notes: Note[] = [];

		const maxAccidentals = [0, 3, 7]; // easy = 0; medium = 3; hard = all

		let accidentals;
		while (
			accidentals === undefined ||
			accidentals > maxAccidentals[difficulty - 1]
		) {
			start = Note.random(
				clefs,
				2, // minOffset: lowest note is 2 lower than start
				4, // maxOffset: highest note is 4 higher than start
				undefined,
				difficulty === 1 ? false : undefined // no accidentals for easy difficulty
			);

			notes = generatePattern(start);
			accidentals = notes.reduce((a, n) => (n.accidental ? a + 1 : a), 0);
		}

		this.notes = notes;
		this.clef = notes[3].determineClef(clefs);
	}

	staveNotes() {
		return this.notes.map((note, i) => {
			if (this.checkProgress.length === i) {
				note.color = '#31bced';
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
		const note = this.notes[progress];

		const correctNotes = this.notes[progress].midiNote;
		const correct = correctNotes === input;
		const done = progress === this.notes.length - 1;
		this.checkProgress.push(correct);

		note.color = correct ? '#92dd6e' : '#fc5130';

		return { correct, correctNotes: [correctNotes], done };
	}

	public helpText = Vue.extend({
		render: h => (
			<span>
				{this.notes.map((n, i) => {
					let color;
					const checkState = this.checkProgress[i];
					if (checkState !== undefined) {
						color = checkState ? '#92dd6e' : '#fc5130';
					}

					return (
						<span style={{ color }} class="mx-2 font-bold">
							{n.formattedPitchClass}
						</span>
					);
				})}
			</span>
		)
	});
}
