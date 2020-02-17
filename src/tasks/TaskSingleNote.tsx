import Task, { TaskContext } from './Task';
import Note from '../utils/Note';
import Vue from 'vue';

export default class TaskSingleNote extends Task {
	public note: Note;

	constructor(context: TaskContext) {
		super(context);

		this.note = Note.random(this.clefs);
		this.notes = [this.note];
		this.clef = this.note.determineClef(this.clefs);
	}

	public check(input: number) {
		const correctNote = this.note.midiNote;
		const correct = input === correctNote;

		this.note.color = correct ? '#92dd6e' : '#fc5130';

		return { correct, correctNotes: [correctNote], done: true };
	}

	public helpText = Vue.extend({
		render: h => <span>{this.note.formattedPitchClass}</span>
	});

	public staveNotes = super.staveNotes;

	public render = super.render;
}
