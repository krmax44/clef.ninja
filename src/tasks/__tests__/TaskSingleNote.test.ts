import { mount } from '@vue/test-utils';
import TaskSingleNote from '../TaskSingleNote';

const target = {} as HTMLElement;

describe('TaskSingleNote', () => {
	it('checks correct inputs', () => {
		const task = new TaskSingleNote({ target });
		const correct = task.notes[0][0].midiNote;

		expect(task.check(correct)).toEqual({
			done: true,
			correct: true,
			correctNotes: [correct]
		});
	});

	it('checks incorrect inputs', () => {
		const task = new TaskSingleNote({ target });
		const correct = task.notes[0][0].midiNote;
		const incorrect = correct + 2;

		expect(task.check(incorrect)).toEqual({
			done: true,
			correct: false,
			correctNotes: [correct]
		});
	});

	it('allows retrying', () => {
		const task = new TaskSingleNote({ target });
		task.check(0);
		expect(task.note.color).toBe('#fc5130');
		task.retry();
		expect(task.note.color).toBe(undefined);
	});

	it('generates the help text', () => {
		const task = new TaskSingleNote({ target });
		const wrapper = mount(task.helpText);

		expect(wrapper.text()).toBe(task.note.formattedPitchClass);
	});
});
