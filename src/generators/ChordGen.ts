import midiToNote from '../utils/midiToNote';
import Gen from './Gen';
import determineClef from '../utils/determineClef';
import { clefs as CLEFS } from '../utils/noteConstants';

import Vex from 'vexflow';
const { StaveNote, Accidental } = Vex.Flow;

export default class ChordGen extends Gen {
	private midiNotes: number[];
	private checkProgress: number[] = [];
	private checkCount = 0;

	constructor(clefs = CLEFS) {
		super();
		const bass = Gen.randomNote(clefs, 0, 7);
		const bassMidi = bass.midiNote;
		const thirdMidi = bassMidi + (Math.random() > 0.5 ? 3 : 4); // major or minor
		const fifthMidi = bassMidi + 7;

		const midiNotes = [bassMidi, thirdMidi, fifthMidi];
		this.midiNotes = midiNotes;

		const chord = midiNotes.map(n => midiToNote(n));
		this.clef = determineClef(thirdMidi);
		this.notes = chord;
	}

	public staveNotes(): Vex.Flow.StaveNote[] {
		const keys = this.notes.map(note => {
			const { pitchClass, octave } = note;

			return `${pitchClass}/${octave}`;
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
		}

		const done = this.checkProgress.length === this.midiNotes.length;
		this.checkCount++;
		return { done, correct, correctNotes };
	}

	public render = super.render;
	public ties = super.ties;
}
