<template>
	<div>
		<NoteRenderer :note="note" />
		<VirtualKeyboard @note="input" :correct="correct" :wrong="wrong" />
	</div>
</template>

<script>
import NoteRenderer from './NoteRenderer';
import VirtualKeyboard from './VirtualKeyboard';
import randomNote from '../utils/randomNote';

import { note } from '@tonaljs/tonal';
import { toMidi } from '@tonaljs/midi';

export default {
	data() {
		return { note: randomNote(), correct: undefined, wrong: undefined };
	},
	components: { NoteRenderer, VirtualKeyboard },
	methods: {
		input(input) {
			const noSlash = this.note.keys[0].replace('/', '');
			const actual = toMidi(noSlash);

			if (input !== actual) {
				this.wrong = input;
			}

			this.correct = actual;

			setTimeout(() => {
				this.correct = undefined;
				this.wrong = undefined;
			}, 50);

			this.note = randomNote();
		}
	},
	mounted() {
		const { keyboard } = this.$store.state;

		if (keyboard.type === 'midi') {
			const { midi } = keyboard;

			midi.on('noteDown', this.input);
		}
	},
	beforeDestroy() {
		const { keyboard } = this.$store.state;

		if (keyboard.type === 'midi') {
			const { midi } = keyboard;

			midi.off('noteDown', this.input);
		}
	}
};
</script>
