<template>
	<div class="px-4">
		<h2 class="text-2xl">Setup your keyboard.</h2>

		<div class="flex justify-around py-8 flex-wrap">
			<div class="card-container" @click="setKeyboard({ type: 'virtual' })">
				<div class="card">
					<div class="card-inner">
						<PianoIcon :size="48" />
						<h3>Virtual Keyboard</h3>

						<p>Use a virtual keyboard with your mouse.</p>
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
								Unfortunately, only Chromium-based browsers support this feature
								at the moment. We're sorry.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PianoIcon from 'vue-material-design-icons/Piano';
import MidiIcon from 'vue-material-design-icons/MidiPort';

import MidiHandler from '@/utils/MidiHander';

export default {
	components: { PianoIcon, MidiIcon },
	data() {
		return {
			stage: 'start',
			midi: undefined
		};
	},
	computed: {
		supportsMidi() {
			return !!navigator.requestMIDIAccess;
		}
	},
	methods: {
		setKeyboard(keyboard) {
			this.$store.commit('keyboard', keyboard);
			this.$store.commit('stage', 'homeView');
		},
		noteUp(note) {
			this.stage = 'works';
			this.midi.off('noteUp', this.noteUp);
			this.setKeyboard({ type: 'midi', midi: this.midi });
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
		if (this.midi) {
			this.midi.off('noteUp', this.noteUp);
		}
	}
};
</script>

<style lang="postcss" scoped>
@import '~@/assets/styles/card-picker.css';
</style>
