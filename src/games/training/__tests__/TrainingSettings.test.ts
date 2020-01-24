import { mount } from '@vue/test-utils';
import TrainingSettings from '../TrainingSettings.vue';
import store from '@/store';

describe('TrainingSettings', () => {
	it('allows to change settings', async () => {
		const wrapper = mount(TrainingSettings, {
			propsData: {
				open: true,
				value: {
					clefs: [],
					tasks: ['singleNotes'],
					keyLabels: true
				}
			},
			store
		});

		const checkboxChords = wrapper.find('#chords');
		checkboxChords.trigger('click');

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted().input[0][0]).toEqual({
			clefs: [],
			tasks: ['singleNotes', 'chords'],
			keyLabels: true
		});
	});
});
