import Task from './Task';
import Note from '../utils/Note';
import { clefs as CLEFS } from '../utils/noteConstants';
import { entries } from '@tonaljs/chord-dictionary';
import { chord as toChord } from '@tonaljs/chord';

import Vex from 'vexflow';
const { Accidental } = Vex.Flow;
import { StaveNote } from '@/utils/VexHelper';

const chords = entries().filter(
	c => c.intervals.length > 2 && c.intervals.length <= 4
);

export default class TaskChord extends Task {
	private midiNotes: number[];
	private checkProgress: number[] = [];
	private checkCount = 0;

	constructor(target: HTMLElement, clefs = CLEFS) {
		super(target);

		const chordTemplate = chords[Math.floor(Math.random() * chords.length)];
		const maxOffset = parseInt(
			chordTemplate.intervals[chordTemplate.intervals.length - 1]
		);

		const bass = Note.random(clefs, 0, maxOffset);
		const bassPitchClass = bass.pitchClass;

		const chordNotes = toChord(
			`${bassPitchClass}${bass.octave} ${chordTemplate.aliases[0]}`
		).notes;

		this.notes = chordNotes.map(n => Note.fromString(n));
		this.midiNotes = this.notes.map(n => n.midiNote);

		// determine clef based on center note of chord
		this.clef = this.notes[
			Math.round((this.notes.length - 1) / 2)
		].determineClef(clefs);
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

	public render = super.render;
}
