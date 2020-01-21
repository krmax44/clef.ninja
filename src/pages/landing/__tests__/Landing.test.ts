import { shallowMount } from '@vue/test-utils';
import Landing from '../Landing.vue';

describe('Landing', () => {
	it('renders correctly', () => {
		const wrapper = shallowMount(Landing);
		expect(wrapper.element).toMatchSnapshot();
	});
});
