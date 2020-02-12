import Clef from '@/utils/Clef';
import Note from '@/utils/Note';
import { randomFromArray } from '@/utils/randomHelper';

//  data from @tonaljs/chord-dictionary
const easyChords = [
	{ name: '', intervals: [4, 7] },
	{ name: 'sus4', intervals: [5, 7] },
	{ name: 'aug', intervals: [4, 8] },
	{ name: 'Mb5', intervals: [4, 6] },
	{ name: 'm#5', intervals: [3, 8] },
	{ name: 'min', intervals: [3, 7] },
	{ name: 'dim', intervals: [3, 6] },
	{ name: 'sus2', intervals: [2, 7] }
];

const hardChords = [
	{ name: 'M7#5sus4', intervals: [5, 8, 11] },
	{ name: '7#5sus4', intervals: [5, 8, 10] },
	{ name: 'M7sus4', intervals: [5, 7, 11] },
	{ name: '7sus4', intervals: [5, 7, 10] },
	{ name: 'M7b6', intervals: [4, 8, 11] },
	{ name: 'maj7#5', intervals: [4, 8, 11] },
	{ name: '7#5', intervals: [4, 8, 10] },
	{ name: 'maj7', intervals: [4, 7, 11] },
	{ name: '7', intervals: [4, 7, 10] },
	{ name: '6', intervals: [4, 7, 9] },
	{ name: 'M7b5', intervals: [4, 6, 11] },
	{ name: '7b5', intervals: [4, 6, 10] },
	{ name: 'mb6M7', intervals: [3, 8, 11] },
	{ name: 'm7#5', intervals: [3, 8, 10] },
	{ name: 'm/ma7', intervals: [3, 7, 11] },
	{ name: 'm7', intervals: [3, 7, 10] },
	{ name: 'm6', intervals: [3, 7, 9] },
	{ name: 'oM7', intervals: [3, 6, 11] },
	{ name: 'm7b5', intervals: [3, 6, 10] },
	{ name: 'm7b5', intervals: [3, 6, 10] },
	{ name: 'dim7', intervals: [3, 6, 9] },
	{ name: "'4", intervals: [5, 10, 15] },
	{ name: 'madd4', intervals: [3, 5, 7] },
	{ name: '+add#9', intervals: [4, 8, 15] },
	{ name: 'sus24', intervals: [2, 5, 7] },
	{ name: "'9no5", intervals: [4, 10, 14] },
	{ name: 'M#5add9', intervals: [4, 8, 14] },
	{ name: 'Madd9', intervals: [4, 7, 14] },
	{ name: 'madd9', intervals: [3, 7, 14] },
	{ name: "'alt7", intervals: [4, 10, 13] },
	{ name: 'Maddb9', intervals: [4, 7, 13] },
	{ name: 'b6b9', intervals: [3, 8, 13] }
];

export default function(clefs: Clef[], difficulty: number) {
	let n = 0;
	const viableChords = easyChords;
	const viableBassNotes: Note[] = [];
	const accidental = Math.random() < 0.5 ? '#' : 'b';

	if (difficulty > 1) {
		viableChords.push(...hardChords);
	}

	let chord;
	let chordNotes: Note[];

	while (true) {
		chord = randomFromArray(viableChords);
		const { intervals } = chord;

		const allNotes = Note.viableNotes(
			clefs,
			0,
			Math.max(...intervals),
			undefined,
			accidental
		);
		const easyBassNotes = allNotes.filter(n => !n.accidental);
		const hardBassNotes = allNotes.filter(n => n.accidental);

		viableBassNotes.push(...easyBassNotes);
		if (difficulty > 2) {
			viableBassNotes.push(...hardBassNotes);
		}

		const bassNote = randomFromArray(viableBassNotes);

		chordNotes = intervals.map(
			i => new Note(bassNote.midiNote + i, accidental)
		);
		chordNotes.unshift(bassNote);

		const accidentals = chordNotes.reduce(
			(a, c) => (c.accidental ? a + 1 : a),
			0
		);

		if (difficulty === 3 && accidentals > 2) {
			break;
		} else if (difficulty === 2 && accidentals <= 2) {
			break;
		} else if (accidentals === 0) {
			break;
		}
		n++;

		if (n > 50) break;
	}

	return { name, chordNotes };
}
