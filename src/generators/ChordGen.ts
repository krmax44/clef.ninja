import Gen from './Gen';
import Note from '../utils/Note';
import { clefs as CLEFS } from '../utils/noteConstants';
import { entries } from '@tonaljs/chord-dictionary';
import { chord as toChord } from '@tonaljs/chord';

import Vex from 'vexflow';
const { StaveNote, Accidental } = Vex.Flow;

const chords = entries().filter(
	c => c.intervals.length > 2 && c.intervals.length <= 4
);

export default class ChordGen extends Gen {
	private midiNotes: number[];
	private checkProgress: number[] = [];
	private checkCount = 0;

	constructor(clefs = CLEFS) {
		super();

		const chordTemplate = chords[Math.floor(Math.random() * chords.length)];
		const maxOffset = parseInt(
			chordTemplate.intervals[chordTemplate.intervals.length - 1]
		);

		const bass = Gen.randomNote(clefs, 0, maxOffset);
		const bassPitchClass = bass.determinePitchClass();

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
		const keys = this.notes.map(note => {
			return `${note.determinePitchClass()}/${note.octave}`;
		});

		const staveNote = new StaveNote({
			keys,
			clef: this.clef,
			duration: 'q'
		});

		this.notes.forEach((note, i) => {
			const { accidental } = note;
			if (typeof accidental === 'string') {
				staveNote.addAccidental(i, new Accidental(accidental));
			}
		});

		return [staveNote];
	}

	public check(input: number) {
		const pos = this.midiNotes.indexOf(input);
		const correct = pos !== -1;

		let correctNotes;
		if (correct) {
			correctNotes = [input];

			if (!this.checkProgress.includes(input)) {
				this.checkProgress.push(input);
			}
		} else {
			correctNotes = this.checkCount >= 1 ? this.midiNotes : [];

			if (this.checkCount > 3) {
				return { done: true, correct: false, correctNotes };
			}
		}

		const done = this.checkProgress.length === this.midiNotes.length;
		this.checkCount++;
		return { done, correct, correctNotes };
	}

	public render = super.render;
}
