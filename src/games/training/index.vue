<template>
	<div class="flex flex-col flex-1 max-w-full">
		<portal to="header-right">
			<div class="flex items-center">
				<div class="btn-checkbox" role="checkbox" @click="toggleOption('bass')">
					<BassIcon :size="32" :fillColor="activeColor('bass')" />
				</div>

				<div
					class="btn-checkbox"
					role="checkbox"
					@click="toggleOption('treble')"
				>
					<TrebleIcon :size="32" :fillColor="activeColor('treble')" />
				</div>
			</div>
		</portal>

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
import NoteRenderer from '@/components/NoteRenderer';
import VirtualKeyboard from '@/components/VirtualKeyboard';

import BassIcon from 'vue-material-design-icons/MusicClefBass';
import TrebleIcon from 'vue-material-design-icons/MusicClefTreble';

import randomNote from '@/utils/randomNote';
import midiToNote from '@/utils/midiToNote';
import { note } from '@tonaljs/tonal';
import { toMidi } from '@tonaljs/midi';

export default {
	data() {
		return {
			notes: [randomNote()],
			correct: undefined,
			wrong: undefined,
			halting: false,
			options: {
				treble: true,
				bass: true
			}
		};
	},
	components: { NoteRenderer, VirtualKeyboard, BassIcon, TrebleIcon },
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
				this.randomNote();
				this.halting = false;
			}, 700);
		},
		toggleOption(option) {
			const options = { ...this.options, [option]: !this.options[option] };
			if (!Object.values(options).some(x => x)) {
				return;
			}

			this.options = options;
			if (this.notes[0].clef === option && this.options[option] === false) {
				this.randomNote();
			}
		},
		activeColor(option) {
			return this.options[option] ? '#30bced' : '#718096';
		},
		randomNote() {
			const clefs = Object.keys(this.options).filter(c => this.options[c]);
			this.notes = [randomNote(clefs)];
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

<style lang="postcss" scoped>
.btn-checkbox {
	@apply flex items-center justify-center w-12 h-12 mx-2 rounded-full bg-gray-300 cursor-pointer;

	&:last-child {
		@apply mr-0;
	}

	& >>> svg {
		transition: fill 0.3s;
	}
}
</style>
