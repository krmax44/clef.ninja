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
					:key="fret"
					:style="{ width: `${width}%` }"
				>
					<div
						class="string-container"
						v-for="({ pitchClass, midiNote, octave }, string) in strings"
						:title="keyLabels ? pitchClass.toUpperCase() + octave : undefined"
						:key="string"
						@click="input(midiNote)"
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
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Note from '@/utils/Note';

// see https://en.wikipedia.org/wiki/Guitar_tunings#Standard
// E2, A2, D3, G3, B3, E4
const BASENOTES = [40, 45, 50, 55, 59, 64].reverse();

// fret widths - sums up to 100%
const FRETW = [1, 8, 8, 7, 7, 6, 6, 6, 6, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 2];

const FRETS = FRETW.map((width, fret) => {
	const strings = new Array(6).fill(undefined).map((a, string) => {
		const midi = BASENOTES[string] + fret;
		return new Note(midi);
	});

	return { width, strings, fret };
});

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
	data() {
		return {
			frets: FRETS
		};
	},
	methods: {
		input(note: number) {
			this.$emit('note', note);
		}
	}
});
</script>

<style lang="postcss" scoped>
.container {
	min-width: 100vw;
	margin-left: 50%;
	transform: translateX(-50%);
	background-image: url('../assets/images/guitar-body.svg');
	background-size: auto 100%;
	background-position: right;
	background-repeat: no-repeat;
	@apply flex items-center overflow-x-auto py-8 pr-64;
}

.guitar {
	height: 250px;
	@apply flex w-full items-center;

	.head {
		@apply flex;
		height: 100%;
		width: auto;
	}
}

.fretboard {
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
		@apply rounded-full h-4 w-4 bg-gray-200;
	}
}

@media (max-width: theme('screens.lg')) {
	.container {
		background-image: none;
		@apply p-0;
	}

	.guitar {
		.head {
			@apply hidden;
		}

		.fretboard {
			@apply h-full;
		}
	}
}
</style>
