import { shallowMount, createLocalVue } from '@vue/test-utils';
import HomeView from '../index.vue';

import store from '@/store';
import PortalVue from 'portal-vue';

function createWrapper() {
	const localVue = createLocalVue();
	localVue.use(PortalVue);

	return shallowMount(HomeView, { store, localVue });
}

describe('HomeView', () => {
	const wrapper = createWrapper();

	it('sets the gamemode', () => {
		wrapper.find('.card-container').trigger('click');
		expect((wrapper.vm as any).$store.state.gamemode).toBe('training');
		expect((wrapper.vm as any).$store.state.stage.name).toBe('gamePlay');
	});

	it('renders correctly', () => {
		expect(wrapper.element).toMatchSnapshot();
	});
});
