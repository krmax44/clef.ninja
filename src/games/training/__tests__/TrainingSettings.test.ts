import { mount } from '@vue/test-utils';
import TrainingSettings from '../TrainingSettings.vue';

describe('TrainingSettings', () => {
	it('allows to change settings', async () => {
		const wrapper = mount(TrainingSettings, { propsData: { open: true } });

		const checkboxChords = wrapper.find('#chords');
		checkboxChords.trigger('click');

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted().update[0][0]).toEqual({
			clefs: ['bass', 'treble'],
			tasks: ['singleNotes', 'chords'],
			keyLabels: true
		});
	});
});
