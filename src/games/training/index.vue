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
					<NoteRenderer class="px-4" :note="note" ref="renderer" />
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

<script lang="ts">
import Vue from 'vue';
import NoteRenderer from '@/components/NoteRenderer.vue';
import VirtualKeyboard from '@/components/VirtualKeyboard.vue';

import BassIcon from 'vue-material-design-icons/MusicClefBass.vue';
import TrebleIcon from 'vue-material-design-icons/MusicClefTreble.vue';

import RandomNote from '@/generators/RandomNote';
import midiToNote from '@/utils/midiToNote';

interface Data {
	note: RandomNote;
	correct: number | undefined;
	wrong: number | undefined;
	halting: boolean;
	options: {
		treble: boolean;
		bass: boolean;
	};
}

type Clefs = 'treble' | 'bass';

export default Vue.extend({
	data(): Data {
		return {
			note: new RandomNote(),
			correct: undefined,
			wrong: undefined,
			halting: false,
			options: {
				// TODO: this will get hairy with more options!
				treble: true,
				bass: true
			}
		};
	},
	components: { NoteRenderer, VirtualKeyboard, BassIcon, TrebleIcon },
	methods: {
		input(input: number): void {
			if (this.halting) return;

			if (!this.note.check(input)) {
				this.wrong = input;
			}

			this.correct = this.note.notes[0].midiNote;
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
		toggleOption(option: Clefs): void {
			const options = { ...this.options, [option]: !this.options[option] };
			if (!Object.values(options).some(x => x)) {
				return;
			}

			this.options = options;
			if (
				this.note.notes[0].clef === option &&
				this.options[option] === false
			) {
				this.randomNote();
			}
		},
		activeColor(option: Clefs): string {
			return this.options[option] ? '#30bced' : '#718096';
		},
		randomNote(): void {
			const clefs = Object.keys(this.options).filter(
				c => this.options[c as Clefs]
			);
			this.note = new RandomNote(clefs as ('treble' | 'bass')[]);
		}
	},
	mounted() {
		// TODO: vuex + ts
		const { midi } = (this as any).$store.getters;

		if (midi) {
			midi.on('noteDown', this.input);
		}
	},
	beforeDestroy() {
		// TODO: vuex + ts
		const { midi } = (this as any).$store.getters;

		if (midi) {
			midi.off('noteDown', this.input);
		}
	}
});
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
