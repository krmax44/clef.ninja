import { Clef } from '../utils/types';
import Note from '../utils/Note';

import Vex from 'vexflow';
const { Renderer, Stave, Formatter, StaveNote, Accidental } = Vex.Flow;

interface CheckResult {
	done: boolean;
	correctNotes: number[];
	correct: boolean;
}

export default abstract class Task {
	public notes: Note[];
	public clef: Clef;

	constructor() {
		this.notes = [];
		this.clef = 'treble';
	}

	public staveNotes() {
		return this.notes.map((note, i) => {
			const { pitchClass, octave, clef, accidental, color } = note;
			const staveNote = new StaveNote({
				keys: [`${pitchClass}/${octave}`],
				clef,
				duration: 'q'
			});

			if (typeof accidental === 'string') {
				staveNote.addAccidental(i, new Accidental(accidental));
			}

			if (color) {
				staveNote.setStyle({ fillStyle: color, strokeStyle: color });
			}

			return staveNote;
		});
	}

	public render(target: HTMLElement) {
		const staveNotes = this.staveNotes();

		const renderer = new Renderer(target, Renderer.Backends.SVG);

		renderer.resize(150, 150);
		const context = renderer.getContext();

		const stave = new Stave(0, 0, 300);
		stave.addClef(this.clef);

		stave.setContext(context).draw();

		Formatter.FormatAndDraw(context, stave, staveNotes);
	}

	public check(_input: number): CheckResult {
		throw new Error("Can't check abstract task.");
	}
}
