import Houk from 'houk';

export function updateLifecycle(bus: Houk, event = 'updateHelpText') {
	return {
		methods: {
			$_update(this: Vue) {
				this.$forceUpdate();
			}
		},
		mounted(this: any) {
			bus.on(event, this.$_update);
		},
		beforeDestroy(this: any) {
			bus.off(event, this.$_update);
		}
	};
}

export function midiLifecycle(event = 'noteDown') {
	return {
		mounted(this: any) {
			this.$store.getters.midi?.on(event, this.input);
		},
		beforeUnmount(this: any) {
			this.$store.getters.midi?.off(event, this.input);
		}
	};
}
