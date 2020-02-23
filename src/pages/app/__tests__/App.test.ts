import { createLocalVue, shallowMount } from '@vue/test-utils';
import App from '../App.vue';
import HomeView from '@/views/home/index.vue';
import SettingsView from '@/views/settings/index.vue';

import PortalVue from 'portal-vue';
import store from '@/store';

function createWrapper() {
	const localVue = createLocalVue();
	localVue.use(PortalVue);

	return shallowMount(App, { store, localVue, stubs: { transition: true } });
}

describe('App', () => {
	it('switches stages', async () => {
		const wrapper = createWrapper();
		expect(wrapper.find(HomeView).is(HomeView)).toBe(true);

		wrapper.vm.$store.commit('stage', { name: 'settingsView' });
		await wrapper.vm.$nextTick();

		expect(wrapper.find(SettingsView).is(SettingsView)).toBe(true);
	});

	it('handles history events', async () => {
		const map: any = {};
		window.addEventListener = jest.fn((event, cb) => {
			map[event] = cb;
		});

		const wrapper = createWrapper();

		map.popstate({
			preventDefault: () => {},
			state: { name: 'gamePlay' }
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$store.state.stage.name).toBe('gamePlay');
		expect(wrapper.vm.$store.state.stage.transition).toBe('backwards');
	});
});
