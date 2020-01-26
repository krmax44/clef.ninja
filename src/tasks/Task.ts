import Clef from '@/utils/Clef';
import Note from '@/utils/Note';

import { treble } from '@/utils/noteConstants';
import { StaveNote, Renderer } from '@/utils/VexHelper';

export interface CheckResult {
	done: boolean;
	correctNotes: number[];
	correct: boolean;
	score?: boolean;
}

export default abstract class Task {
	public notes: Note[];
	public clef: Clef;
	protected target: HTMLElement;

	constructor(target: HTMLElement) {
		this.notes = [];
		this.clef = treble;
		this.target = target;
	}

	public staveNotes() {
		return this.notes.map(note => StaveNote([note]));
	}

	public render() {
		Renderer.apply(this);
	}

	public check(_input: number): CheckResult {
		throw new Error("Can't check abstract task.");
	}
}
