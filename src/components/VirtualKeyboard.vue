<template>
	<div class="keyboard" :class="{ disabled }">
		<div
			class="key no-drag"
			v-for="({ note, noteName, octave, halftone, after }, i) in notes"
			:key="i"
		>
			<div class="white" :class="classes(note)" @click="keyPressed(note)">
				<span v-if="noteName === 'C'">
					{{ `C${octave}` }}
				</span>
				<span v-else-if="keyLabels" class="text-gray-400">
					{{ noteName }}
				</span>
			</div>
			<div
				v-if="halftone"
				class="black"
				:class="classes(halftone)"
				@click="keyPressed(halftone)"
			>
				<span class="key-labels" v-if="keyLabels">
					<span>{{ noteName }}♯</span>
					<span>{{ after }}♭</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { NOTES } from '@/instruments/InstrumentPiano';

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
			notes: NOTES
		};
	},
	methods: {
		keyPressed(note: number) {
			if (!this.disabled) this.$emit('note', note);
		},
		classes(note: number) {
			const correct = this.correct.includes(note);
			const wrong = this.wrong === note;

			return {
				correct,
				wrong,
				transition: correct || wrong
			};
		}
	}
});
</script>

<style lang="postcss" scoped>
.keyboard {
	width: 100vw;
	margin-left: 50%;
	transform: translateX(-50%);
	transition: opacity 0.5s;
	@apply flex w-screen overflow-x-auto;
}

.keyboard.disabled {
	opacity: 0.7;
}

.keyboard .key {
	min-width: 50px;
	height: 300px;
	@apply w-full relative;

	div {
		transition: background-color 1s ease;
		@apply w-full h-full;
	}

	.white {
		@apply flex border rounded bg-white h-full justify-center items-end pb-2 text-gray-600;
	}

	.black {
		width: calc(100% / 1.5);
		height: calc(100% / 3 * 1.5);
		left: calc(100% / 1.5);
		top: 0;
		@apply bg-black shadow-md rounded absolute z-10;

		.key-labels {
			@apply flex flex-col h-full justify-end items-center text-white opacity-50;
		}
	}
}

.keyboard:not(.disabled) {
	.white:active {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 0 3px rgba(0, 0, 0, 0.1);
	}

	.black:active {
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.8) inset,
			0 0 10px rgba(255, 255, 255, 0.5);
	}
}

.keyboard .key div.correct {
	background-color: rgba(4, 231, 99, 0.2);
}

.keyboard .key div.wrong {
	background-color: rgba(252, 81, 48, 0.2);
}

.keyboard .key div.transition {
	transition: none;
}
</style>
