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
	const wrapper = createWrapper();

	it('goes home', () => {
		(wrapper.vm as any).$store.commit('stage', { name: 'settingsView' });

		wrapper.find('.logo').trigger('click');

		expect((wrapper.vm as any).$store.state.stage).toEqual({
			name: 'homeView',
			transition: 'backwards'
		});
	});

	it('makes space for portal', () => {
		(wrapper.vm as any).portalChange(true);
		expect((wrapper.vm as any).brandHidden).toBe(true);
		expect((wrapper.vm as any).brandVisible).toBe(false);

		(wrapper.vm as any).portalChange(false);
		setTimeout(() => {
			expect((wrapper.vm as any).brandHidden).toBe(false);
		}, 500);
		setTimeout(() => {
			expect((wrapper.vm as any).brandVisible).toBe(true);
		}, 700);
	});
});
