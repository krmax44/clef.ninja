import { shallowMount } from '@vue/test-utils';
import VirtualInput from '../VirtualInput.vue';
import VirtualKeyboard from '../VirtualKeyboard.vue';
import VirtualFretboard from '../VirtualFretboard.vue';

import store from '@/store';

describe('VirtualInput', () => {
	it('switches instruments', async () => {
		const wrapper = shallowMount(VirtualInput, {
			store,
			propsData: { correct: [], wrong: 0 }
		});

		expect(wrapper.find(VirtualKeyboard).is(VirtualKeyboard)).toBe(true);

		(wrapper.vm as any).$store.commit('instrument', 'guitar');
		await wrapper.vm.$nextTick();

		expect(wrapper.find(VirtualFretboard).is(VirtualFretboard)).toBe(true);
	});
});
