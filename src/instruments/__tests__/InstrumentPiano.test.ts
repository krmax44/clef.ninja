import { NOTES } from '../InstrumentPiano';

describe('InstrumentPiano', () => {
	it('generates all notes', () => {
		expect(NOTES).toEqual([
			{
				note: 36,
				halftone: 37,
				noteName: 'C',
				octave: 2,
				before: 'B',
				after: 'D'
			},
			{
				note: 38,
				halftone: 39,
				noteName: 'D',
				octave: 2,
				before: 'C',
				after: 'E'
			},
			{
				note: 40,
				halftone: false,
				noteName: 'E',
				octave: 2,
				before: 'D',
				after: 'F'
			},
			{
				note: 41,
				halftone: 42,
				noteName: 'F',
				octave: 2,
				before: 'E',
				after: 'G'
			},
			{
				note: 43,
				halftone: 44,
				noteName: 'G',
				octave: 2,
				before: 'F',
				after: 'A'
			},
			{
				note: 45,
				halftone: 46,
				noteName: 'A',
				octave: 2,
				before: 'G',
				after: 'B'
			},
			{
				note: 47,
				halftone: false,
				noteName: 'B',
				octave: 2,
				before: 'A',
				after: 'C'
			},
			{
				note: 48,
				halftone: 49,
				noteName: 'C',
				octave: 3,
				before: 'B',
				after: 'D'
			},
			{
				note: 50,
				halftone: 51,
				noteName: 'D',
				octave: 3,
				before: 'C',
				after: 'E'
			},
			{
				note: 52,
				halftone: false,
				noteName: 'E',
				octave: 3,
				before: 'D',
				after: 'F'
			},
			{
				note: 53,
				halftone: 54,
				noteName: 'F',
				octave: 3,
				before: 'E',
				after: 'G'
			},
			{
				note: 55,
				halftone: 56,
				noteName: 'G',
				octave: 3,
				before: 'F',
				after: 'A'
			},
			{
				note: 57,
				halftone: 58,
				noteName: 'A',
				octave: 3,
				before: 'G',
				after: 'B'
			},
			{
				note: 59,
				halftone: false,
				noteName: 'B',
				octave: 3,
				before: 'A',
				after: 'C'
			},
			{
				note: 60,
				halftone: 61,
				noteName: 'C',
				octave: 4,
				before: 'B',
				after: 'D'
			},
			{
				note: 62,
				halftone: 63,
				noteName: 'D',
				octave: 4,
				before: 'C',
				after: 'E'
			},
			{
				note: 64,
				halftone: false,
				noteName: 'E',
				octave: 4,
				before: 'D',
				after: 'F'
			},
			{
				note: 65,
				halftone: 66,
				noteName: 'F',
				octave: 4,
				before: 'E',
				after: 'G'
			},
			{
				note: 67,
				halftone: 68,
				noteName: 'G',
				octave: 4,
				before: 'F',
				after: 'A'
			},
			{
				note: 69,
				halftone: 70,
				noteName: 'A',
				octave: 4,
				before: 'G',
				after: 'B'
			},
			{
				note: 71,
				halftone: false,
				noteName: 'B',
				octave: 4,
				before: 'A',
				after: 'C'
			},
			{
				note: 72,
				halftone: 73,
				noteName: 'C',
				octave: 5,
				before: 'B',
				after: 'D'
			},
			{
				note: 74,
				halftone: 75,
				noteName: 'D',
				octave: 5,
				before: 'C',
				after: 'E'
			},
			{
				note: 76,
				halftone: false,
				noteName: 'E',
				octave: 5,
				before: 'D',
				after: 'F'
			},
			{
				note: 77,
				halftone: 78,
				noteName: 'F',
				octave: 5,
				before: 'E',
				after: 'G'
			},
			{
				note: 79,
				halftone: 80,
				noteName: 'G',
				octave: 5,
				before: 'F',
				after: 'A'
			},
			{
				note: 81,
				halftone: 82,
				noteName: 'A',
				octave: 5,
				before: 'G',
				after: 'B'
			},
			{
				note: 83,
				halftone: false,
				noteName: 'B',
				octave: 5,
				before: 'A',
				after: 'C'
			}
		]);
	});
});
