import { createLocalVue, shallowMount } from '@vue/test-utils';
import GameArcade from '../index.vue';

import PortalVue from 'portal-vue';
import store from '@/store';
import { fakeTask, fakeCheck } from '@/testUtils/fakeTask';

jest.useFakeTimers();

function createWrapper() {
	const localVue = createLocalVue();
	localVue.use(PortalVue);

	return shallowMount(GameArcade, { store, localVue });
}

describe('GameArcade', () => {
	it('waits for the countdown', () => {
		const wrapper = createWrapper();
		expect((wrapper.vm as any).input(30)).toBe(false);
	});

	it('counts scores', () => {
		const wrapper = createWrapper();
		jest.advanceTimersByTime(4000);

		const check = fakeCheck(true);
		wrapper.setData({ task: fakeTask(check) });

		(wrapper.vm as any).input(69);
		expect(check).toHaveBeenCalledWith(69);
		expect((wrapper.vm as any).score).toBe(1);
	});

	it('counts lives', () => {
		const wrapper = createWrapper();
		jest.advanceTimersByTime(4000);
		wrapper.setData({ task: fakeTask(false) });

		(wrapper.vm as any).input(1);
		expect((wrapper.vm as any).lives).toBe(4);
	});

	it('runs out of time', () => {
		const wrapper = createWrapper();
		wrapper.setData({ task: fakeTask(false) });

		jest.advanceTimersByTime(4000 + 61000);
		expect((wrapper.vm as any).state).toBe('gameOver');
	});

	it('runs out of lives', () => {
		const wrapper = createWrapper();
		wrapper.setData({ lives: 1, task: fakeTask(false) });
		jest.advanceTimersByTime(4000);
		(wrapper.vm as any).input(1);

		expect((wrapper.vm as any).state).toBe('gameOver');
	});
});
