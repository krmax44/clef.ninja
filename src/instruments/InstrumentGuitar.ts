import Instrument from './Instrument';
import { rangeArray } from 'rangestar';
import Note from '@/utils/Note';
import { treblevb8 } from '@/utils/noteConstants';

const guitar: Instrument = {
	clefs: [treblevb8],
	name: 'guitar',
	lowestNote: 40, // E2
	highestNote: 85 // D6
};

type GuitarNote = { note: number; string: number; fret: number };

// see https://en.wikipedia.org/wiki/Guitar_tunings#Standard
// E2, A2, D3, G3, B3, E4
const BASENOTES = [40, 45, 50, 55, 59, 64];
const BASENOTESI = [...BASENOTES].reverse();

// fret widths - sums up to 100%
const FRETW = [1, 8, 8, 7, 7, 6, 6, 6, 6, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 2];

const FRETS = FRETW.map((width, fret) => {
	const strings = new Array(6).fill(undefined).map((a, string) => {
		const midi = BASENOTESI[string] + fret;
		return new Note(midi);
	});

	return { width, strings, fret };
});

const MIDIMAP = BASENOTES.map((basenote, string) => {
	const nextStop = BASENOTES[string + 1] || guitar.highestNote;
	return rangeArray(basenote, nextStop).map((note, fret) => ({
		string: 5 - string, // highest string is top here
		fret,
		note
	}));
}).flat();

function midiToGuitarNote(note: number): GuitarNote | undefined {
	return MIDIMAP.find(n => n.note === note);
}

export default guitar;
export {
	BASENOTES,
	BASENOTESI,
	FRETW,
	FRETS,
	MIDIMAP,
	GuitarNote,
	midiToGuitarNote
};
