<template>
	<div class="keyboard">
		<div
			class="key no-drag"
			v-for="({ note, noteName, octave, halftone }, i) in notes"
			:key="i"
		>
			<div class="white" :class="classes(note)" @click="$emit('note', note)">
				{{ noteName === 'c' ? `C${octave}` : '' }}
			</div>
			<div
				v-if="halftone"
				class="black"
				:class="classes(halftone)"
				@click="$emit('note', halftone)"
			/>
		</div>
	</div>
</template>

<script>
import { toMidi } from '@tonaljs/midi';

const NOTES = Array(4)
	.fill(['c', 'd', 'e', 'f', 'g', 'a', 'b'])
	.flat()
	.map((n, i) => {
		const octave = 2 + Math.floor(i / 7);
		const note = toMidi(`${n}${octave}`);
		const halftone = ['e', 'b'].includes(n) ? false : toMidi(`${n}#${octave}`);

		return { note, halftone, noteName: n, octave };
	});

export default {
	props: ['correct', 'wrong'],
	data() {
		return {
			notes: NOTES,
			active: new Set()
		};
	},
	methods: {
		noteDown({ note }) {
			this.active.add(note);
			this.active = new Set(this.active);
		},
		noteUp({ note }) {
			this.active.delete(note);
			this.active = new Set(this.active);
		},
		classes(note) {
			const correct = this.correct === note;
			const wrong = this.wrong === note;

			return {
				active: this.active.has(note),
				correct,
				wrong,
				transition: correct || wrong
			};
		}
	}
};
</script>

<style lang="postcss" scoped>
.keyboard {
	width: 100vw;
	margin-left: 50%;
	transform: translateX(-50%);
	@apply flex w-screen overflow-auto;
}

.keyboard .key {
	width: 100%;
	min-width: 50px;
	height: 300px;
	@apply w-full relative;
}

.keyboard .key div {
	transition: background-color 1s ease;
	@apply w-full h-full;
}

.keyboard .key .white {
	@apply flex border rounded bg-white h-full justify-center items-end pb-2 text-gray-600;
}

.keyboard .key .black {
	width: calc(100% / 1.5);
	height: calc(100% / 3 * 1.5);
	left: calc(100% / 1.5);
	top: 0;
	@apply bg-black shadow-md rounded absolute z-10;
}

.keyboard .key .white:active,
.keyboard .key .white.active {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1) inset, 0 0 3px rgba(0, 0, 0, 0.1);
}

.keyboard .key .black:active,
.keyboard .key .black.active {
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.8) inset,
		0 0 10px rgba(255, 255, 255, 0.5);
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
