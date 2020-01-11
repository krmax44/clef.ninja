import Gen from './Gen';
import Note from '../utils/Note';
import { clefs as CLEFS } from '../utils/noteConstants';

export default class SingleNoteGen extends Gen {
	constructor(clefs = CLEFS) {
		super();
		const note = Note.random(clefs);
		this.notes = [note];
		this.clef = note.clef!;
	}

	public check(input: number) {
		const correctNote = this.notes[0].midiNote;
		const correct = input === correctNote;

		return { correct, correctNotes: [correctNote], done: true };
	}

	public staveNotes = super.staveNotes;
	public render = super.render;
}
