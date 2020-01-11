import { createLocalVue, shallowMount } from '@vue/test-utils';
import GameArcade from '../index.vue';

import PortalVue from 'portal-vue';
import store from '@/store';

function createWrapper() {
	const localVue = createLocalVue();
	localVue.use(PortalVue);

	return shallowMount(GameArcade, { store, localVue });
}

describe('VirtualKeyboard', () => {
	it('waits for the countdown', () => {
		const wrapper = createWrapper();
		expect((wrapper.vm as any).input(30)).toBe(false);
	});

	it('counts scores', () => {
		const wrapper = createWrapper();
		setTimeout(() => {
			const check = jest.fn(() => ({ done: true, correct: true }));
			wrapper.setData({ task: undefined });
			wrapper.setData({ task: { check } });

			(wrapper.vm as any).input(69);

			expect(check).toHaveBeenCalledWith(69);
			expect((wrapper.vm as any).score).toBe(1);
		}, 3000);
	});

	it('counts lives', () => {
		const wrapper = createWrapper();
		setTimeout(() => {
			const check = jest.fn(() => ({ done: true, correct: false }));
			wrapper.setData({ task: undefined });
			wrapper.setData({ task: { check } });

			(wrapper.vm as any).input(1);
			expect((wrapper.vm as any).lives).toBe(4);
		}, 3000);
	});

	it('runs out of time', () => {
		const wrapper = createWrapper();
		setTimeout(() => {
			wrapper.setData({ remainingTime: 0 });

			setTimeout(() => {
				expect((wrapper.vm as any).state).toBe('gameOver');
			}, 1000);
		}, 3000);
	});

	it('runs out of lives', () => {
		const wrapper = createWrapper();
		setTimeout(() => {
			const check = jest.fn(() => ({ done: true, correct: false }));
			wrapper.setData({ lives: 1, task: undefined });
			wrapper.setData({ task: { check } });
			(wrapper.vm as any).input(1);

			expect((wrapper.vm as any).state).toBe('gameOver');
		}, 3000);
	});
});
