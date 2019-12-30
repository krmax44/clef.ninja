import midiToNote from '../utils/midiToNote';
import RandomMusic from './RandomMusic';
import determineClef from '../utils/determineClef';

import Vex from 'vexflow';
const { StaveNote, Accidental } = Vex.Flow;

export default class RandomChord extends RandomMusic {
	constructor() {
		super();
		const bass = RandomMusic.randomNote(undefined, 0, 7);
		const bassMidi = bass.midiNote;
		const thirdMidi = bassMidi + (Math.random() > 0.5 ? 3 : 4); // major or minor
		const fifthMidi = bassMidi + 7;

		const chord = [bassMidi, thirdMidi, fifthMidi].map(n => midiToNote(n));
		this.clef = determineClef(thirdMidi);
		this.notes = chord;
	}

	public staveNotes(): Vex.Flow.StaveNote[] {
		const keys = this.notes.map(note => {
			const { pitchClass, octave, accidental } = note;

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

	public render = super.render;

	public check() {
		return true;
	}
}
