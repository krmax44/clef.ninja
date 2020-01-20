<template>
	<div class="px-4">
		<div class="setting">
			<h2 class="setting-title">Input Setup</h2>

			<div class="flex justify-around py-8 flex-wrap">
				<div class="card-container" @click="setKeyboard({ type: 'virtual' })">
					<div class="card">
						<div class="card-inner">
							<VirtualIcon :size="48" />
							<h3>Virtual Keyboard</h3>

							<p>Use a virtual input device with your mouse.</p>
						</div>
					</div>
				</div>

				<div class="card-container">
					<div class="card cursor-auto">
						<div class="card-inner">
							<MidiIcon :size="48" />
							<h3>MIDI Keyboard</h3>

							<div v-if="supportsMidi">
								<p class="mb-4">
									Use your MIDI keyboard to play clef.ninja. chords.
								</p>

								<p v-if="stage === 'works'">You're set!</p>
								<p v-else-if="stage === 'granted'">
									Press a key on your keyboard...
								</p>
								<button
									class="btn btn-disabled"
									disabled
									v-else-if="stage === 'requesting'"
								>
									Requesting access...
								</button>
								<button @click="startMidi()" class="btn btn-red" v-else>
									Request access
								</button>
							</div>

							<div v-else>
								<p>
									Unfortunately, only Chromium-based browsers support this
									feature at the moment. We're sorry.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="setting">
			<h2 class="setting-title">Instrument</h2>

			<div class="flex justify-around py-8 flex-wrap">
				<div class="card-container" @click="setInstrument('piano')">
					<div class="card flex">
						<div class="card-inner">
							<PianoIcon :size="48" />
							<h3>Piano</h3>
						</div>
					</div>
				</div>

				<div class="card-container" @click="setInstrument('guitar')">
					<div class="card">
						<div class="card-inner">
							<GuitarIcon :size="48" />
							<h3>Guitar</h3>

							<p>
								<span class="font-bold">Beta:</span> This feature is a
								work-in-progress
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import VirtualIcon from 'vue-material-design-icons/MonitorClean.vue';
import MidiIcon from 'vue-material-design-icons/MidiPort.vue';
import PianoIcon from 'vue-material-design-icons/Piano.vue';
import GuitarIcon from 'vue-material-design-icons/GuitarAcoustic.vue';

import MidiHandler from '@/utils/MidiHander';

interface Data {
	stage: string;
	midi: MidiHandler | undefined;
}

export default Vue.extend({
	components: { VirtualIcon, PianoIcon, MidiIcon, GuitarIcon },
	data(): Data {
		return {
			stage: 'start',
			midi: undefined
		};
	},
	computed: {
		supportsMidi() {
			return !!(navigator as any).requestMIDIAccess;
		}
	},
	methods: {
		setKeyboard(keyboard: string) {
			// TODO: vuex + ts
			(this as any).$store.commit('keyboard', keyboard);
			(this as any).$store.commit('stage', 'homeView');
		},
		setInstrument(instrument: string) {
			// TODO: vuex + ts
			(this as any).$store.commit('instrument', instrument);
			(this as any).$store.commit('stage', 'homeView');
		},
		noteUp() {
			(this as any).stage = 'works';
			this.midi && this.midi.off('noteUp', this.noteUp);
			(this as any).setKeyboard({ type: 'midi', midi: this.midi });
		},
		async startMidi() {
			const midi = new MidiHandler();
			this.midi = midi;

			midi.on('noteUp', this.noteUp);

			this.stage = 'requesting';
			const granted = await midi.requestAccess();
			this.stage = granted ? 'granted' : 'start';
		}
	},
	beforeDestroy() {
		this.midi && this.midi.off('noteUp', this.noteUp);
	}
});
</script>

<style lang="postcss" scoped>
@import '~@/assets/styles/card-picker.css';

.setting {
	.setting-title {
		@apply text-2xl;
	}
}
</style>
