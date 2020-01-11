import { Accidental, Clef } from './types';
import { note as toNote } from '@tonaljs/tonal';
import { midiToNoteName } from '@tonaljs/midi';
import * as constants from './noteConstants';

export default class Note {
	public midiNote: number;
	public octave: number;
	public pitchClass?: string;
	public accidental?: Accidental | false;
	public clef?: Clef;
	public color?: string;
	public duration?: string;

	constructor(midiNote: number, accidental?: Accidental | false, clef?: Clef) {
		this.midiNote = midiNote;
		this.octave = Math.floor(midiNote / 12) - 1;
		this.accidental = accidental;
		this.clef = clef;
	}

	public determineClef(clefs: Clef[] = constants.clefs): Clef {
		const viable = clefs.filter(
			clef =>
				constants[clef].min <= this.midiNote &&
				this.midiNote <= constants[clef].max
		);

		const clef = viable[Math.floor(Math.random() * viable.length)];
		this.clef = clef;

		return clef;
	}

	public determinePitchClass() {
		const sharps = this.accidental !== 'b';
		const pitchClass = midiToNoteName(this.midiNote, {
			sharps,
			pitchClass: true
		}).toLowerCase();
		this.pitchClass = pitchClass;

		return pitchClass;
	}

	static fromString(input: string) {
		const { pc, acc, midi, empty } = toNote(input);

		if (empty === true || !midi) throw new Error('Invalid note');

		const accidental = constants.accidentals.includes(acc as Accidental)
			? (acc as Accidental)
			: false;

		const note = new Note(midi, accidental);
		note.pitchClass = pc.toLowerCase();

		return note;
	}
}
