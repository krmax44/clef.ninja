<template>
	<div class="flex flex-col flex-1 max-w-full">
		<div class="flex justify-center mb-8">
			<div class="card-container">
				<div class="card flex justify-center cursor-auto">
					<NoteRenderer class="px-4" :notes="notes" ref="renderer" />
				</div>
			</div>
		</div>

		<VirtualKeyboard
			@note="input"
			:correct="correct"
			:wrong="wrong"
			class="mt-auto"
		/>
	</div>
</template>

<script>
import NoteRenderer from './NoteRenderer';
import VirtualKeyboard from './VirtualKeyboard';
import randomNote from '../utils/randomNote';
import midiToNote from '../utils/midiToNote';

import { note } from '@tonaljs/tonal';
import { toMidi } from '@tonaljs/midi';

export default {
	data() {
		return {
			notes: [randomNote()],
			correct: undefined,
			wrong: undefined,
			halting: false
		};
	},
	components: { NoteRenderer, VirtualKeyboard },
	methods: {
		input(input) {
			if (this.halting) return;

			const actual = this.notes[0].midiNote;

			if (input !== actual) {
				this.wrong = input;
				// TODO: find a better way to find the positional difference between notes on clef
				// if the two notes are too far away, Vexflow is unable to correctly render and throws an error
				if (Math.abs(actual - input) < 8) {
					this.notes.push({
						...midiToNote(input),
						color: '#fc5130',
						midiNote: input,
						clef: this.notes[0].clef
					});
				}
			} else {
				this.notes[0].color = '#04e763';
			}

			this.correct = actual;
			this.halting = true;

			setTimeout(() => {
				this.correct = undefined;
				this.wrong = undefined;
			}, 50);

			setTimeout(() => {
				this.notes = [randomNote()];
				this.halting = false;
			}, 700);
		}
	},
	mounted() {
		const { midi } = this.$store.getters;

		if (midi) {
			midi.on('noteDown', this.input);
		}
	},
	beforeDestroy() {
		const { midi } = this.$store.getters;

		if (midi) {
			midi.off('noteDown', this.input);
		}
	}
};
</script>
