import { mount } from '@vue/test-utils';
import ArcadeStats from '../ArcadeStats.vue';

describe('ArcadeStats', () => {
	it('renders correctly', () => {
		const wrapper = mount(ArcadeStats, {
			propsData: {
				lives: 4,
				score: 7
			}
		});

		expect(wrapper.element).toMatchSnapshot();
	});
});
