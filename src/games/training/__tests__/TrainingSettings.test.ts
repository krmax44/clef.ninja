import { mount } from '@vue/test-utils';
import TrainingSettings from '../TrainingSettings.vue';
import SettingsSwitches from '../SettingsSwitches.vue';
import defaultSettings from '../defaultSettings';
import store from '@/store';

describe('TrainingSettings', () => {
	const wrapper = mount(TrainingSettings, {
		propsData: {
			open: true,
			value: defaultSettings
		},
		store
	});

	it('allows to change settings', async () => {
		const checkboxChords = wrapper.find(SettingsSwitches);
		checkboxChords.vm.$emit('input', { bass: true, treble: false });

		await wrapper.vm.$nextTick();

		const vm: any = wrapper.vm;

		expect(vm.settings.clefs.bass).toBe(true);
		expect(vm.settings.clefs.treble).toBe(false);
	});

	it('closes', () => {
		wrapper.find('.modal-container').trigger('click');
		expect(wrapper.emitted('close').length).toBe(1);
	});
});
