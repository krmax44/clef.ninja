import { Accidental, Clef } from './types';
import { note as toNote } from '@tonaljs/tonal';
import * as constants from './noteConstants';
import Instrument from '@/instruments/Instrument';
import InstrumentPiano from '@/instruments/InstrumentPiano';

const S = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
const F = ['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb', 'b'];
const ACCIDENTALS = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

export default class Note {
	public midiNote: number;
	public octave: number;
	public pitchClass: string;
	public accidental?: Accidental | false;
	public clef?: Clef;
	public instrument: Instrument;
	public color?: string;
	public duration?: string;

	constructor(
		midiNote: number,
		accidental: Accidental | false = '#',
		instrument: Instrument = InstrumentPiano,
		clef?: Clef
	) {
		this.midiNote = midiNote;
		this.octave = Math.floor(midiNote / 12) - 1;
		this.accidental = accidental;
		this.instrument = instrument;
		this.clef = clef;

		const notes = accidental === '#' ? S : F;
		const step = midiNote % 12;
		this.pitchClass = notes[step];
		this.octave = Math.floor(midiNote / 12) - 1;
		this.accidental = ACCIDENTALS[step] === 0 ? false : accidental; // false || # || b
	}

	public determineClef(clefs: Clef[] = constants.clefs): Clef {
		const viable = clefs.filter(
			clef =>
				this.instrument.constants[clef].min <= this.midiNote &&
				this.midiNote <= this.instrument.constants[clef].max
		);

		const clef = viable[Math.floor(Math.random() * viable.length)];
		this.clef = clef;

		return clef;
	}

	static fromString(input: string, instrument: Instrument = InstrumentPiano) {
		const { midi, empty, acc } = toNote(input);

		if (empty === true || !midi) throw new Error('Invalid note');

		const accidental = constants.accidentals.includes(acc as Accidental)
			? (acc as Accidental)
			: false;

		const note = new Note(midi, accidental, instrument);

		return note;
	}

	static random(
		clefs = constants.clefs,
		minOffset = 0,
		maxOffset = 0,
		instrument: Instrument = InstrumentPiano
	): Note {
		const mins = clefs.map(clef => instrument.constants[clef].min);
		const maxs = clefs.map(clef => instrument.constants[clef].max);

		const MIN = Math.min(...mins) + minOffset;
		const MAX = Math.max(...maxs) - maxOffset;

		const midiNote = Math.floor(Math.random() * (MAX - MIN)) + MIN;
		const note = new Note(
			midiNote,
			Math.random() < 0.5 ? '#' : 'b',
			instrument
		);
		note.determineClef(clefs);

		return note;
	}
}
