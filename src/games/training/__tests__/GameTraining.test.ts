import { createLocalVue, shallowMount } from '@vue/test-utils';
import GameTraining from '../index.vue';

import PortalVue from 'portal-vue';
import store from '@/store';
import { fakeTask } from '@/testUtils/fakeTask';

function createWrapper() {
	const localVue = createLocalVue();
	localVue.use(PortalVue);

	return shallowMount(GameTraining, { store, localVue });
}

describe('GameTraining', () => {
	it('checks correct inputs', () => {
		const wrapper = createWrapper();

		const check = jest.fn(() => ({
			done: true,
			correct: true,
			correctNotes: [60]
		}));
		wrapper.setData({ task: fakeTask(check) });
		(wrapper.vm as any).input(60);

		expect((wrapper.vm as any).correct).toEqual([60]);
	});

	it('checks incorrect inputs', () => {
		const wrapper = createWrapper();

		const check = jest.fn(() => ({
			done: true,
			correct: false,
			correctNotes: [62]
		}));
		wrapper.setData({ task: fakeTask(check) });
		(wrapper.vm as any).input(60);

		expect((wrapper.vm as any).wrong).toBe(60);
	});
});
