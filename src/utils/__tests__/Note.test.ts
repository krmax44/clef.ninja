import Note from '../Note';
import Instrument from '@/instruments/Instrument';
import { treble, bass } from '../noteConstants';

describe('Note', () => {
	const note = new Note(37, 'b'); // Db2

	it('parses a midi note', () => {
		expect(note.midiNote).toBe(37);
		expect(note.octave).toBe(2);
		expect(note.accidental).toBe('b');
		expect(note.pitchClass).toBe('db');
	});

	it('determines the clef', () => {
		expect(note.determineClef()).toEqual(bass);
	});

	it('generates a random note', () => {
		const clef = Math.random() > 0.5 ? treble : bass;
		const note = Note.random([clef]);

		expect(note.midiNote).toBeGreaterThanOrEqual(note.instrument.lowestNote);
		expect(note.midiNote).toBeLessThanOrEqual(note.instrument.highestNote);
		expect(note.clef).toBe(clef);
	});

	it('respects instruments', () => {
		const instrument: Instrument = {
			name: 'Test',
			lowestNote: 60,
			highestNote: 61,
			clefs: [treble]
		};

		const note = Note.random(instrument.clefs, 0, 0, instrument);
		expect(note.midiNote).toEqual(60);
	});

	it('parses a string note', () => {
		const note = Note.fromString('Db2');
		expect(note.midiNote).toEqual(37);
		expect(note.octave).toEqual(2);
		expect(note.pitchClass).toEqual('db');
		expect(note.accidental).toEqual('b');
	});
});
