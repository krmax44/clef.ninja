import { randomFromArray } from '@/utils/randomHelper';
import Clef from '@/utils/Clef';
import Note from '@/utils/Note';

type PatternDefinition = (
	| {
			intervals: number[];
			duration?: string;
			break?: undefined;
	  }
	| {
			break: boolean;
			duration?: string;
			intervals?: undefined;
	  }
)[];

const b8 = { duration: '8', break: true };

// some patterns taken from https://youtu.be/fh7Q9U0ggDE
const patterns: PatternDefinition[] = [
	[
		{ intervals: [0] },
		b8,
		{ intervals: [12, 16, 19] },
		b8,
		{ intervals: [0] },
		b8,
		{ intervals: [12, 16, 19] },
		b8
	],

	[
		{ intervals: [0, 12] },
		{ intervals: [16] },
		{ intervals: [19] },
		{ intervals: [16] },
		{ intervals: [0, 12] },
		{ intervals: [16] },
		{ intervals: [19] },
		{ intervals: [16] },
		{ intervals: [0, 12], duration: 'w' }
	],

	[
		{ intervals: [0, 19] },
		{ intervals: [16] },
		{ intervals: [12] },
		{ intervals: [16] },
		{ intervals: [0, 19] },
		{ intervals: [16] },
		{ intervals: [12] },
		{ intervals: [16] },
		{ intervals: [0, 19], duration: 'w' }
	],

	[
		{ intervals: [0] },
		{ intervals: [12] },
		{ intervals: [16, 19] },
		{ intervals: [12] },
		{ intervals: [0] },
		{ intervals: [12] },
		{ intervals: [16, 19] },
		{ intervals: [12] }
	],

	[
		{ intervals: [0] },
		{ intervals: [12, 16, 19] },
		{ intervals: [12, 16, 19] },
		{ intervals: [0] },
		{ intervals: [0] },
		{ intervals: [12, 16, 19] },
		{ intervals: [12, 16, 19] },
		{ intervals: [0] },
		{ intervals: [0], duration: 'w' }
	],

	// the lick ( ͡° ͜ʖ ͡°)
	[
		{ intervals: [0] },
		{ intervals: [2] },
		{ intervals: [3] },
		{ intervals: [5] },
		{ intervals: [2], duration: 'q' },
		{ intervals: [-2] },
		{ intervals: [0] }
	]
];

export type Pattern = (string | Note[])[];

export default function(clefs: Clef[], difficulty: number): Pattern {
	const pattern = randomFromArray(patterns);
	const intervals = pattern.map(p => p.intervals ?? []).flat();

	const start = Note.random(
		clefs,
		Math.abs(Math.min(...intervals)), // minOffset: lowest note
		Math.max(...intervals), // maxOffset: highest note
		undefined,
		difficulty === 1 ? false : undefined // no accidentals for easy difficulty
	);

	const notes = pattern.map(p => {
		if (p.break) {
			return p.duration ?? '8';
		}

		const n = p.intervals!.map(i => new Note(start.midiNote + i));
		n.forEach(n => (n.duration = p.duration ?? '8'));

		return n;
	});

	return notes;
}
