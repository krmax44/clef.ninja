import { mount } from '@vue/test-utils';
import TrainingSettings from '../TrainingSettings.vue';
import store from '@/store';

describe('TrainingSettings', () => {
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

	it('allows to change settings', async () => {
		const checkboxChords = wrapper.find('#chords');
		checkboxChords.trigger('click');

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted().input[0][0]).toEqual({
			clefs: [],
			tasks: ['singleNotes', 'chords'],
			keyLabels: true
		});
	});

	it('closes', () => {
		wrapper.find('.modal-container').trigger('click');
		expect(wrapper.emitted('close').length).toBe(1);
	});
});
