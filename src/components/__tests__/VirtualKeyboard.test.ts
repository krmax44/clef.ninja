import { mount } from '@vue/test-utils';
import VirtualKeyboard from '../VirtualKeyboard.vue';

describe('VirtualKeyboard', () => {
	const wrapper = mount(VirtualKeyboard, {
		propsData: {
			correct: [],
			wrong: 0,
			keyLabels: true
		}
	});
	const d2Key = wrapper.findAll('.keyboard .white').at(1);

	it('reacts to presses', () => {
		d2Key.trigger('click');

		expect(wrapper.emitted().note[0][0]).toBe(38);
	});

	it('shows key labels', () => {
		expect(d2Key.text()).toBe('D');
	});
});
