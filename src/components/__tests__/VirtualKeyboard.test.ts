import { mount } from '@vue/test-utils';
import VirtualKeyboard from '../VirtualKeyboard.vue';

describe('VirtualKeyboard', () => {
	it('reacts to presses', () => {
		const wrapper = mount(VirtualKeyboard, {
			propsData: {
				correct: [],
				wrong: 0
			}
		});

		const d2Key = wrapper.findAll('.keyboard .white').at(1);
		d2Key.trigger('click');

		expect(wrapper.emitted().note[0][0]).toBe(38);
	});
});
