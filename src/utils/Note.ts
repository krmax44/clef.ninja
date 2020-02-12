import { Accidental } from './types';
import { note as toNote } from '@tonaljs/tonal';
import * as constants from './noteConstants';
import Instrument from '@/instruments/Instrument';
import InstrumentPiano from '@/instruments/InstrumentPiano';
import Clef from './Clef';
import { randomFromArray } from './randomHelper';
import rangeArray from 'rangestar';

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
		this.instrument = instrument;
		this.clef = clef;

		const notes = accidental === '#' ? S : F;
		const step = midiNote % 12;
		this.pitchClass = notes[step];
		this.octave = Math.floor(midiNote / 12) - 1;
		this.accidental = ACCIDENTALS[step] === 0 ? false : accidental; // false || # || b
	}

	public determineClef(clefs: Clef[] = constants.clefs): Clef {
		if (this.clef) return this.clef;

		const viable = clefs.filter(
			clef => clef.min <= this.midiNote && this.midiNote <= clef.max
		);

		const clef = randomFromArray(viable);
		this.clef = clef;

		return clef;
	}

	get formattedPitchClass() {
		const pc = [...this.pitchClass];
		pc[0] = pc[0].toUpperCase();
		return pc.join('');
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

	static viableMidi = function viableMidi(
		clefs = constants.clefs,
		minOffset = 0,
		maxOffset = 0,
		instrument: Instrument = InstrumentPiano,
		accidental: Accidental | false = Note.randomAccidental()
	) {
		const mins = clefs.map(clef => clef.min);
		const maxs = clefs.map(clef => clef.max);

		const MIN = Math.max(Math.min(...mins), instrument.lowestNote) + minOffset;
		const MAX = Math.min(Math.max(...maxs), instrument.highestNote) - maxOffset;

		const all = rangeArray(MIN, MAX);

		if (accidental === false) {
			return all.filter(n => !Note.hasAccidental(n));
		}

		return all;
	};

	static viableNotes(
		_clefs?: Clef[],
		_minOffset?: number,
		_maxOffset?: number,
		instrument?: Instrument,
		accidental?: Accidental | false
	) {
		return Note.viableMidi(...arguments).map(
			n => new Note(n, accidental, instrument)
		);
	}

	static random(
		clefs?: Clef[],
		_minOffset?: number,
		_maxOffset?: number,
		instrument?: Instrument,
		accidental?: Accidental | false
	): Note {
		const viable = Note.viableMidi(...arguments);
		const midiNote = randomFromArray(viable);

		const note = new Note(midiNote, accidental, instrument);
		note.determineClef(clefs);

		return note;
	}

	static hasAccidental(midiNote: number) {
		const step = midiNote % 12;
		return ACCIDENTALS[step] === 1;
	}

	static randomAccidental() {
		return Math.random() < 0.5 ? '#' : 'b';
	}
}
