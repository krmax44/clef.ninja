import Task from './Task';
import Note from '../utils/Note';
import { clefs as CLEFS } from '../utils/noteConstants';

export default class TaskSingleNote extends Task {
	private note: Note;

	constructor(target: HTMLElement, clefs = CLEFS, difficulty = 1) {
		super(target, clefs, difficulty);
		this.note = Note.random(clefs);
		this.notes = [this.note];
		this.clef = this.note.determineClef(clefs);
	}

	public check(input: number) {
		const correctNote = this.note.midiNote;
		const correct = input === correctNote;

		this.note.color = correct ? '#92dd6e' : '#fc5130';

		return { correct, correctNotes: [correctNote], done: true };
	}

	get helpText(): Vue.Component {
		return {
			render: h => h('span', this.note.formattedPitchClass)
		};
	}

	public staveNotes = super.staveNotes;

	public render = super.render;
}
