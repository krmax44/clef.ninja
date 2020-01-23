import { mount } from '@vue/test-utils';
import TrainingSettings from '../TrainingSettings.vue';
import store from '@/store';
import { treble, bass } from '@/utils/noteConstants';

describe('TrainingSettings', () => {
	it('allows to change settings', async () => {
		const wrapper = mount(TrainingSettings, {
			propsData: { open: true },
			store
		});

		const checkboxChords = wrapper.find('#chords');
		checkboxChords.trigger('click');

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted().update[0][0]).toEqual({
			clefs: [treble, bass],
			tasks: ['singleNotes', 'chords'],
			keyLabels: true
		});
	});
});
