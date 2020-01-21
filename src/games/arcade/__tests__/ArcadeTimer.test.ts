import { mount } from '@vue/test-utils';
import ArcadeTimer from '../ArcadeTimer.vue';

describe('ArcadeTimer', () => {
	it('renders correctly', () => {
		const wrapper = mount(ArcadeTimer, {
			propsData: {
				state: 'playing',
				remainingTime: 5
			}
		});

		expect(wrapper.element).toMatchSnapshot();
	});
});
