import { mount } from '@vue/test-utils';
import TaskLickPattern from '../TaskLickPattern';

const target = {} as HTMLElement;

describe('TaskLickPattern', () => {
	it('checks correct inputs', () => {
		const task = new TaskLickPattern({ target });
		const correctNotes = task.notes.map(n => n.midiNote);

		let i = 1;
		for (const correctNote of correctNotes) {
			const done = i === correctNotes.length;
			i++;

			expect(task.check(correctNote)).toEqual({
				done,
				correct: true,
				correctNotes: [correctNote]
			});
		}
	});

	it('checks incorrect inputs', () => {
		const task = new TaskLickPattern({ target });
		const correctNotes = task.notes.map(n => n.midiNote);

		let i = 1;
		for (const correctNote of correctNotes) {
			const correct = Math.random() > 0.5;
			const input = correct ? correctNote : -1;
			const done = i === correctNotes.length;
			i++;

			expect(task.check(input)).toEqual({
				done,
				correct,
				correctNotes: [correctNote]
			});
		}
	});

	it('generates the help text', () => {
		const task = new TaskLickPattern({ target });
		const wrapper = mount(task.helpText);
		const notes = task.notes.map(n => n.formattedPitchClass).join('');

		expect(wrapper.text()).toBe(notes);
	});
});
