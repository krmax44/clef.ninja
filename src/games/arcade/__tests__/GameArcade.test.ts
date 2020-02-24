import { createLocalVue, shallowMount } from '@vue/test-utils';
import GameArcade from '../index.vue';

import PortalVue from 'portal-vue';
import store from '@/store';
import { fakeTask, fakeCheck } from '@/testUtils/fakeTask';

function createWrapper() {
	const localVue = createLocalVue();
	localVue.use(PortalVue);

	return shallowMount(GameArcade, { store, localVue });
}

async function sleep(n: number) {
	return new Promise(r => setTimeout(r, n));
}

window.requestAnimationFrame = jest.fn(cb => {
	sleep(16).then(() => cb(0));
	return Math.random();
});

describe('GameArcade', () => {
	it('waits for the countdown', () => {
		const wrapper = createWrapper();
		expect((wrapper.vm as any).input(30)).toBe(false);
	});

	it('counts scores', () => {
		const wrapper = createWrapper();

		const check = fakeCheck(true);
		wrapper.setData({ task: fakeTask(check), countdown: 0 });

		(wrapper.vm as any).input(69);
		expect(check).toHaveBeenCalledWith(69);
		expect((wrapper.vm as any).score).toBe(1);
	});

	it('counts lives', () => {
		const wrapper = createWrapper();
		wrapper.setData({ task: fakeTask(false), countdown: 0 });

		(wrapper.vm as any).input(1);
		expect((wrapper.vm as any).lives).toBe(4);
	});

	it('runs out of time', async () => {
		const wrapper = createWrapper();
		wrapper.setData({ task: fakeTask(false), countdown: 0, remainingTime: 2 });

		await sleep(50);

		expect((wrapper.vm as any).state).toBe('gameOver');
	});

	it('runs out of lives', () => {
		const wrapper = createWrapper();
		wrapper.setData({
			lives: 1,
			task: fakeTask(false),
			countdown: 0
		});

		(wrapper.vm as any).input(1);
		expect((wrapper.vm as any).state).toBe('gameOver');
	});
});
