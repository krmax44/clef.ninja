import { mount } from '@vue/test-utils';
import VirtualFretboard from '../VirtualFretboard.vue';

describe('VirtualKeyboard', () => {
	const wrapper = mount(VirtualFretboard, {
		propsData: {
			correct: [],
			wrong: 0,
			keyLabels: true
		}
	});
	const a3String = wrapper.find(
		'.fretboard .fret:nth-child(3) > .string-container:nth-child(3)'
	);

	it('reacts to presses', () => {
		a3String.trigger('click');

		expect(wrapper.emitted().note[0][0]).toBe(57);
	});

	it('shows feedback dots', () => {
		const wrapper = mount(VirtualFretboard, {
			propsData: {
				correct: [56],
				wrong: 57
			}
		});

		const correctDot = wrapper.find(
			'.fretboard .fret:nth-child(2) > .dots-feedback > .dot:nth-child(3)'
		);
		const wrongDot = wrapper.find(
			'.fretboard .fret:nth-child(3) > .dots-feedback > .dot:nth-child(3)'
		);

		expect(correctDot.classes()).toContain('correct');
		expect(wrongDot.classes()).toContain('wrong');
	});

	it('shows key labels', () => {
		expect(a3String.attributes('title')).toBe('A3');
	});
});
