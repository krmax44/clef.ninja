import Task from './Task';
import Note from '../utils/Note';
import { clefs as CLEFS } from '../utils/noteConstants';

export default class TaskSingleNote extends Task {
	constructor(target: HTMLElement, clefs = CLEFS) {
		super(target);
		const note = Note.random(clefs);
		this.notes = [note];
		this.clef = note.determineClef(clefs);
	}

	public check(input: number) {
		const correctNote = this.notes[0].midiNote;
		const correct = input === correctNote;

		this.notes[0].color = correct ? '#92dd6e' : '#fc5130';

		return { correct, correctNotes: [correctNote], done: true };
	}

	public staveNotes = super.staveNotes;

	public render = super.render;
}
