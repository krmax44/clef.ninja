<template>
	<div class="px-4">
		<div class="setting">
			<h2 class="setting-title">Input Setup</h2>

			<div class="flex justify-around py-8 flex-wrap">
				<div
					class="card-container"
					@click="setKeyboard({ type: 'virtual' }) || home()"
				>
					<div class="card">
						<div class="card-inner">
							<VirtualIcon class="w-12 h-12" />
							<h3>Virtual Keyboard</h3>

							<p>Use a virtual input device with your mouse.</p>
						</div>
					</div>
				</div>

				<div class="card-container">
					<div class="card cursor-auto">
						<div class="card-inner">
							<MidiIcon class="w-12 h-12" />
							<h3>MIDI Keyboard</h3>

							<div v-if="supportsMidi">
								<div class="mb-4">
									<p v-if="$store.getters.midiState === 'denied'">
										Access to MIDI has been denied. Change your browser's
										settings and try again.
									</p>
									<p v-else-if="stage === 'granted'">
										Press a key on your keyboard...
									</p>
									<p
										v-else-if="
											stage === 'works' ||
												$store.getters.midiState === 'granted'
										"
									>
										MIDI inputs are enabled.
									</p>
									<p v-else>
										Use your MIDI keyboard to play clef.ninja. chords.
									</p>
								</div>

								<button
									class="btn btn-disabled"
									disabled
									v-if="stage === 'requesting'"
								>
									Requesting access...
								</button>
								<button
									@click="startMidi()"
									class="btn btn-red"
									v-else-if="
										stage === 'start' && $store.getters.midiState !== 'granted'
									"
								>
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
							<PianoIcon class="w-12 h-12" />
							<h3>Piano</h3>
						</div>
					</div>
				</div>

				<div class="card-container" @click="setInstrument('guitar')">
					<div class="card">
						<div class="card-inner">
							<GuitarIcon class="w-12 h-12" />
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

import MidiHandler from '@/utils/MidiHandler';

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
		setKeyboard(keyboard: { type: string; midi?: any }) {
			this.$store.commit('keyboard', keyboard);
		},
		setInstrument(instrument: string) {
			this.$store.commit('instrument', instrument);
			this.home();
		},
		noteUp() {
			this.stage = 'works';
			this.midi!.off('noteUp', this.noteUp);
			this.home();
		},
		home() {
			this.$store.commit('stage', { name: 'homeView' });
		},
		async startMidi() {
			const midi = new MidiHandler();
			this.setKeyboard({ type: 'midi', midi });
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
@import '~@/assets/styles/cardPicker.pcss';

.setting {
	.setting-title {
		@apply text-2xl;
	}
}

@screen md {
	.card-container {
		@apply w-1/2;
	}
}
</style>
