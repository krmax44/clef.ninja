import Task, { TaskContext } from '../Task';

import Vex from 'vexflow';
import { StaveNote } from '@/utils/VexHelper';
import randomChord from './randomChord';
import Vue from 'vue';

export default class TaskChord extends Task {
	private midiNotes: number[];
	private checkProgress: number[] = [];
	private checkCount = 0;
	public chordName: string;

	constructor(context: TaskContext) {
		super(context);

		const chord = randomChord(this.clefs, this.difficulty);
		this.notes = chord.chordNotes;
		this.chordName = chord.name;
		this.midiNotes = this.notes.map(n => n.midiNote);

		// determine clef based on center note of chord
		// TODO: clef determination based on multiple notes
		this.clef = this.notes[
			Math.round((this.notes.length - 1) / 2)
		].determineClef(this.clefs);
	}

	public staveNotes(): Vex.Flow.StaveNote[] {
		return [StaveNote(this.notes)];
	}

	public check(input: number) {
		const pos = this.midiNotes.indexOf(input);
		const correct = pos !== -1;
		const score = !this.checkProgress.includes(input); // only count towards score once

		let correctNotes;
		if (correct) {
			correctNotes = [input];

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

	public helpText = Vue.extend({
		render: h => (
			<span>
				You are playing a {this.chordName} - consisting of
				{this.notes.map(n => {
					const color = this.checkProgress.includes(n.midiNote)
						? '#92dd6e'
						: undefined;

					return (
						<span style={{ color }} class="mx-1 font-bold">
							{n.formattedPitchClass}
						</span>
					);
				})}
			</span>
		)
	});

	public render = super.render;
}
