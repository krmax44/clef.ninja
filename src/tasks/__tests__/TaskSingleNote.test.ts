import TaskSingleNote from '../TaskSingleNote';

const target = {} as HTMLElement;

describe('TaskSingleNote', () => {
	it('checks correct inputs', () => {
		const task = new TaskSingleNote(target);
		const correct = task.notes[0].midiNote;

		expect(task.check(correct)).toEqual({
			done: true,
			correct: true,
			correctNotes: [correct]
		});
	});

	it('checks incorrect inputs', () => {
		const task = new TaskSingleNote(target);
		const correct = task.notes[0].midiNote;
		const incorrect = correct + 2;

		expect(task.check(incorrect)).toEqual({
			done: true,
			correct: false,
			correctNotes: [correct]
		});
	});
});
