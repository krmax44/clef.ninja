import Gen from './Gen';
import Note from '../utils/Note';
import { Clef } from '../utils/types';

import Vex from 'vexflow';
import { clefs as CLEFS } from '@/utils/noteConstants';
const {
	Renderer,
	Stave,
	Formatter,
	StaveNote,
	Accidental,
	StaveTie,
	Beam
} = Vex.Flow;

export default class LickPatternGen extends Gen {
	public clef: Clef;
	public notes: Note[];
	private checkProgress: number = 0;

	constructor(clefs = CLEFS) {
		super();

		const one = Gen.randomNote(clefs, 2, 4);
		const oneMidi = one.midiNote;
		const twoMidi = oneMidi + 2;
		const threeMidi = twoMidi + 1;
		const fourMidi = threeMidi + 2;
		const fiveMidi = oneMidi;
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

	beams() {
		const notes = this.staveNotes();

		return Beam.generateBeams(notes);
	}

	ties(): Vex.Flow.StaveTie[] {
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
			const { pitchClass, octave, accidental, duration } = note;

			const staveNote = new StaveNote({
				keys: [`${pitchClass}/${octave}`],
				clef: this.clef,
				duration: duration as string
			});

			if (typeof accidental === 'string') {
				staveNote.addAccidental(0, new Accidental(accidental));
			}

			return staveNote;
		});
	}

	public render(target: HTMLElement) {
		const staveNotes = this.staveNotes();

		const renderer = new Renderer(target, Renderer.Backends.SVG);

		renderer.resize(400, 150);
		const context = renderer.getContext();

		const stave = new Stave(0, 0, 400);
		stave.addClef(this.clef);

		stave.setContext(context).draw();

		const beams = Beam.generateBeams(staveNotes);
		Formatter.FormatAndDraw(context, stave, staveNotes);

		// TODO: fix ties
		// const ties = this.ties();
		[...beams].forEach(t => t.setContext(context).draw());
	}

	public check(input: number) {
		const correctNotes = this.notes[this.checkProgress].midiNote;
		const correct = correctNotes === input;
		const done = this.checkProgress === this.notes.length - 1;
		this.checkProgress++;

		return { correct, correctNotes: [correctNotes], done };
	}
}
