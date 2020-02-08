import { shallowMount } from '@vue/test-utils';
import SettingsView from '../index.vue';
import InstrumentGuitar from '@/instruments/InstrumentGuitar';

import store from '@/store';

describe('SettingsView', () => {
	const wrapper = shallowMount(SettingsView, { store });

	it('sets the input type', () => {
		wrapper.find('.card-container').trigger('click');
		expect((wrapper.vm as any).$store.state.keyboard.type).toBe('virtual');
		expect((wrapper.vm as any).$store.state.stage.name).toBe('homeView');
	});

	it('sets the instrument', () => {
		wrapper
			.find('.setting:last-of-type .card-container:last-of-type')
			.trigger('click');
		expect((wrapper.vm as any).$store.state.instrument).toEqual('guitar');
	});

	it('renders correctly', () => {
		expect(wrapper.element).toMatchSnapshot();
	});
});
