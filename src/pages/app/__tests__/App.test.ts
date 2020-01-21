import { mount, createLocalVue } from '@vue/test-utils';
import App from '../App.vue';
import HomeView from '@/views/home/index.vue';
import SettingsView from '@/views/settings/index.vue';

import PortalVue from 'portal-vue';
import store from '@/store';

function createWrapper() {
	const localVue = createLocalVue();
	localVue.use(PortalVue);

	return mount(App, { store, localVue, stubs: { transition: true } });
}

describe('App', () => {
	it('switches stages', async () => {
		const wrapper = createWrapper();
		expect(wrapper.find(HomeView).is(HomeView)).toBe(true);

		(wrapper.vm as any).$store.commit('stage', { name: 'settingsView' });
		await (wrapper.vm as any).$nextTick();

		expect(wrapper.find(SettingsView).is(SettingsView)).toBe(true);
	});
});
