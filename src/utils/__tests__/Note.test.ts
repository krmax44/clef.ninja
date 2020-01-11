import Note from '../Note';
import * as constants from '../../utils/noteConstants';

describe('Note', () => {
	const note = new Note(37, 'b'); // Db2

	it('parses a midi note', () => {
		expect(note.midiNote).toBe(37);
		expect(note.octave).toBe(2);
		expect(note.accidental).toBe('b');
	});

	it('determines the pitch class', () => {
		expect(note.determinePitchClass()).toBe('db');
	});

	it('determines the clef', () => {
		expect(note.determineClef()).toBe('bass');
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
