import { mount, createLocalVue } from '@vue/test-utils';
import SiteHeader from '../SiteHeader.vue';

import PortalVue from 'portal-vue';
import store from '@/store';

function createWrapper() {
	const localVue = createLocalVue();
	localVue.use(PortalVue);

	return mount(SiteHeader, { store, localVue, stubs: { transition: true } });
}

describe('SiteHeader', () => {
	it('goes home', () => {
		const wrapper = createWrapper();
		(wrapper.vm as any).$store.commit('stage', { name: 'settingsView' });

		wrapper.find('.logo').trigger('click');

		expect((wrapper.vm as any).$store.state.stage).toEqual({
			name: 'homeView',
			transition: 'backwards'
		});
	});
});
