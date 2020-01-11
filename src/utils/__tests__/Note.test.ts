import Note from '../Note';
import * as constants from '../../utils/noteConstants';

describe('Note', () => {
	const note = new Note(37, 'b'); // Db2

	it('parses a midi note', () => {
		expect(note.midiNote).toBe(37);
		expect(note.octave).toBe(2);
		expect(note.accidental).toBe('b');
		expect(note.pitchClass).toBe('db');
	});

	it('determines the clef', () => {
		expect(note.determineClef()).toBe('bass');
	});

	it('generates a random note', () => {
		const clef = Math.random() > 0.5 ? 'treble' : 'bass';
		const note = Note.random([clef]);

		expect(note.midiNote).toBeGreaterThanOrEqual(constants[clef].min);
		expect(note.midiNote).toBeLessThanOrEqual(constants[clef].max);
		expect(note.clef).toBe(clef);
	});

	it('parses a string note', () => {
		expect(Note.fromString('Db2')).toEqual({
			midiNote: 37,
			octave: 2,
			pitchClass: 'db',
			accidental: 'b'
		});
	});
});
