import Task, { TaskContext } from '../Task';

import randomChord from './randomChord';
import Vue from 'vue';
import Note from '@/utils/Note';
import { updateLifecycle } from '@/utils/houkLifecycle';

export default class TaskChord extends Task {
	private midiNotes: number[];
	private checkProgress: number[] = [];
	private checkCount = 0;
	public chordName: string;

	constructor(context: TaskContext) {
		super(context);

		const { chordNotes, name } = randomChord(this.clefs, this.difficulty);
		this.notes = [chordNotes];
		this.chordName = name;
		this.midiNotes = chordNotes.map(n => n.midiNote);

		// determine clef based on center note of chord
		const center = Note.centerNote(chordNotes);
		this.clef = new Note(center, undefined, this.instrument).determineClef(
			this.clefs
		);
	}

	public check(input: number) {
		const note = this.notes.flat().find(n => n.midiNote === input);
		const correct = note !== undefined;
		const score = !this.checkProgress.includes(input); // only count towards score once

		let correctNotes;
		// TODO: typescript shenanigans - if (correct) doesn't work here even though it's LITERALLY THE SAME omg
		if (note !== undefined) {
			correctNotes = [input];
			note.color = '#92dd6e';
			this.emit('updateHelpText');

			if (score) {
				this.checkProgress.push(input);
			}
		} else {
			correctNotes = this.checkCount >= 1 ? this.midiNotes : [];

			if (this.checkCount > 3) {
				return { done: true, correct: false, correctNotes, score };
			}
		}

		const done = this.checkProgress.length === this.midiNotes.length;
		this.checkCount++;
		return { done, correct, correctNotes, score };
	}

	public retry() {
		this.checkProgress = [];
		this.checkCount = 0;
		this.notes.flat().forEach(n => (n.color = undefined));
		this.emit('updateHelpText');
	}

	public helpText = Vue.extend({
		mixins: [updateLifecycle(this)],
		render: h => (
			<span>
				You are playing a {this.chordName} - consisting of
				{this.notes.flat().map(({ color, formattedPitchClass }) => (
					<span style={{ color }} class="mx-1 font-bold">
						{formattedPitchClass}
					</span>
				))}
			</span>
		)
	});

	public staveNotes = super.staveNotes;

	public render = super.render;
}
