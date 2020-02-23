import { mount } from '@vue/test-utils';
import TaskPattern from '../TaskPattern';
import Note from '@/utils/Note';

const target = {} as HTMLElement;

describe('TaskPattern', () => {
	it('checks correct inputs', () => {
		const task = new TaskPattern({ target });

		for (let i = 0; i < task.notes.length; i++) {
			const correctNotes = task.notes[i].map((n: Note) => n.midiNote);

			let k = 1;
			for (const correctNote of correctNotes) {
				const done = i + 1 === task.notes.length && k === correctNotes.length;
				k++;
				expect(task.check(correctNote)).toEqual({
					done,
					correct: true,
					correctNotes,
					score: true,
					retry: false
				});
			}
		}

		expect.hasAssertions();
	});

	it('checks incorrect inputs', () => {
		const task = new TaskPattern({ target });

		const result = task.check(-1);
		expect(result.correct).toBe(false);
	});

	it('allows retrying', () => {
		const task = new TaskPattern({ target });
		task.check(task.notes[0][0].midiNote);
		expect(task.notes[0][0].color).toBe('#92dd6e');

		task.retry();
		expect(task.notes[0][0].color).toBe(undefined);
	});

	it('generates the help text', () => {
		const task = new TaskPattern({ target });
		const wrapper = mount(task.helpText);
		const notes = task.notes
			.flat()
			.map(n => n.formattedPitchClass)
			.join('');

		expect(wrapper.text()).toBe(notes);
	});
});
