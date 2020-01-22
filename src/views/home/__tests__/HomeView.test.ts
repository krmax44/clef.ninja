import { shallowMount } from '@vue/test-utils';
import HomeView from '../index.vue';

import store from '@/store';

describe('HomeView', () => {
	const wrapper = shallowMount(HomeView, { store });

	it('sets the gamemode', () => {
		wrapper.find('.card-container').trigger('click');
		expect((wrapper.vm as any).$store.state.gamemode).toBe('training');
		expect((wrapper.vm as any).$store.state.stage.name).toBe('gamePlay');
	});

	it('renders correctly', () => {
		expect(wrapper.element).toMatchSnapshot();
	});
});
