<template>
	<div class="container">
		<div class="guitar">
			<img
				src="@/assets/images/guitar-head.svg"
				alt="Guitar head"
				class="head"
			/>
			<div class="fretboard">
				<div
					class="fret"
					v-for="{ fret, width, strings } in frets"
					ref="fret"
					:key="fret"
					:style="{ width: `${width}%` }"
				>
					<div
						class="string-container"
						v-for="({ pitchClass, midiNote, octave }, string) in strings"
						:title="keyLabels ? pitchClass.toUpperCase() + octave : undefined"
						:key="string"
						@click="input(midiNote, string, fret)"
					>
						<div class="string" />
					</div>
					<div class="dots">
						<div
							class="dot"
							v-if="[3, 5, 7, 9, 12, 15, 17, 19].includes(fret)"
						/>
						<div class="dot" v-if="fret === 12" />
					</div>
					<div class="dots dots-feedback">
						<div
							class="dot"
							:class="{
								'no-transition':
									dotCorrect(fret, string) || dotWrong(fret, string),
								correct: dotCorrect(fret, string),
								wrong: dotWrong(fret, string)
							}"
							v-for="(a, string) in strings"
							:key="string"
						/>
					</div>
				</div>
			</div>
			<div class="body">
				<div class="fret">
					<div
						class="string-container"
						v-for="(a, string) in new Array(6)"
						:key="string"
					>
						<div class="string" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import Note from '@/utils/Note';
import InstrumentGuitar, {
	GuitarNote,
	midiToGuitarNote,
	FRETS
} from '@/instruments/InstrumentGuitar';

export default Vue.extend({
	props: {
		correct: {
			type: Array,
			required: true
		},
		wrong: {
			type: Number,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		keyLabels: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data(): {
		frets: { width: number; strings: Note[]; fret: number }[];
		correctDots: GuitarNote[];
		wrongDot: GuitarNote | undefined;
		pressed: GuitarNote[];
	} {
		return {
			frets: FRETS,
			pressed: [],
			correctDots: [],
			wrongDot: undefined
		};
	},
	methods: {
		input(note: number, string: number, fret: number) {
			this.pressed.unshift({ note, string, fret });
			this.$emit('note', note);
			setTimeout(() => this.pressed.pop(), 50);
		},
		dotCorrect(fret: number, string: number) {
			return this.correctDots.some(n => n.fret === fret && n.string === string);
		},
		dotWrong(fret: number, string: number) {
			if (this.wrongDot !== undefined) {
				return this.wrongDot.fret === fret && this.wrongDot.string === string;
			}
		}
	},
	watch: {
		wrong() {
			this.wrongDot = this.pressed.find(i => i.note === this.wrong);
		},
		correct() {
			const corrects = (this.correct as number[]).filter(
				n => n > InstrumentGuitar.constants.bass.min
			);

			const pressed = this.pressed;
			const pressedNotes = pressed.map(p => p.note);

			const correct = corrects
				.filter(c => pressedNotes.includes(c))
				.map(c => pressed.find(p => p.note === c)!);
			const missed = corrects
				.filter(c => !pressedNotes.includes(c))
				.map(n => midiToGuitarNote(n)!);

			this.correctDots = [...correct, ...missed];
		}
	}
});
</script>

<style lang="postcss" scoped>
.container {
	min-width: 100vw;
	margin-left: 50%;
	transform: translateX(-50%);
	background-image: url('~@/assets/images/guitar-body.svg');
	background-size: auto 100%;
	background-position: right;
	background-repeat: no-repeat;
	@apply flex items-center overflow-x-auto py-8;
}

.guitar {
	height: 250px;
	@apply flex w-full items-center;

	.head {
		@apply flex;
		min-height: 100%;
		width: auto;
	}

	.body {
		width: 24rem;

		& > div.fret {
			background-color: transparent;
		}

		& div.string-container {
			@apply cursor-auto;
		}

		& div.string:first-of-type {
			@apply border-gray-600;
		}
	}
}

.fretboard,
.body {
	transition: opacity 0.5s;
	height: 87.5%;
	@apply flex w-full;

	&.disabled {
		opacity: 0.7;
	}

	& > .fret {
		min-width: 50px;
		@apply flex flex-col justify-around py-2 border-gray-300 border-r-2 w-full relative bg-gray-800;

		&:first-of-type {
			@apply bg-gray-600;

			.string {
				@apply border-white;
			}
		}

		&:last-of-type {
			@apply border-r-0;
		}
	}

	& .string-container {
		@apply flex items-center h-6 cursor-pointer;
	}

	& .string {
		margin: 0 -2px;
		width: calc(100% + 2px);
		@apply border-gray-600 border-b-2;
	}

	& .string-container:nth-child(n + 4) .string {
		border-bottom-width: 3px;
	}

	& .dots {
		top: 15%;
		bottom: 15%;
		@apply flex flex-col justify-around items-center absolute inset-x-0 py-2 pointer-events-none;
	}

	& .dot {
		transition: background-color 1s;
		@apply rounded-full h-4 w-4 bg-gray-200;
	}

	& .dots.dots-feedback {
		@apply inset-0;
	}

	& .dots-feedback .dot {
		background-color: transparent;
	}

	& .dot.wrong {
		background-color: theme('colors.brand-red');
	}

	& .dot.correct {
		@apply bg-green-500;
	}

	& .dot.no-transition {
		transition: none;
	}
}

@media (max-width: theme('screens.xl')) {
	.container {
		background-image: none;
		@apply p-0;
	}

	.guitar {
		.head,
		.body {
			@apply hidden;
		}

		.fretboard {
			@apply h-full;
		}
	}
}
</style>
