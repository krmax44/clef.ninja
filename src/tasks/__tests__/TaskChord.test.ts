import TaskChord from '../TaskChord';

const target = {} as HTMLElement;

describe('TaskChord', () => {
	it('checks correct inputs', () => {
		const task = new TaskChord(target);
		const correctNotes = task.notes.map(n => n.midiNote);

		for (const correctNote of correctNotes) {
			const done = correctNote === correctNotes[correctNotes.length - 1];

			expect(task.check(correctNote)).toEqual({
				done,
				correct: true,
				correctNotes: [correctNote],
				score: true
			});
		}
	});

	it('checks incorrect inputs', () => {
		const task = new TaskChord(target);
		const correctNotes = task.notes.map(n => n.midiNote);

		// One wrong, get another try
		expect(task.check(-1)).toEqual({
			done: false,
			correct: false,
			correctNotes: [],
			score: true
		});

		// Second wrong, show the correct notes
		expect(task.check(-1)).toEqual({
			done: false,
			correct: false,
			correctNotes,
			score: true
		});

		// third wrong, no more mistakes allowed
		expect(task.check(-1)).toEqual({
			done: false,
			correct: false,
			correctNotes,
			score: true
		});

		// fourth correct
		expect(task.check(correctNotes[0])).toEqual({
			done: false,
			correct: true,
			correctNotes: [correctNotes[0]],
			score: true
		});

		// same input only yields a score point once
		expect(task.check(correctNotes[0])).toEqual({
			done: false,
			correct: true,
			correctNotes: [correctNotes[0]],
			score: false
		});

		// end it after too many wrong hits
		expect(task.check(-1)).toEqual({
			done: true,
			correct: false,
			correctNotes,
			score: true
		});
	});
});
