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
		pressed: GuitarNote[];
	} {
		return {
			frets: FRETS,
			pressed: []
		};
	},
	computed: {
		correctDots(): GuitarNote[] {
			const corrects = (this.correct as number[]).filter(
				n => n > InstrumentGuitar.lowestNote
			);

			const pressed = this.pressed;
			const pressedNotes = pressed.map(p => p.note);

			const correct = corrects
				.filter(c => pressedNotes.includes(c))
				.map(c => pressed.find(p => p.note === c)!);
			const missed = corrects
				.filter(c => !pressedNotes.includes(c))
				.map(n => midiToGuitarNote(n)!);

			return [...correct, ...missed];
		},
		wrongDot(): GuitarNote | undefined {
			return (
				this.pressed.find(i => i.note === this.wrong) ||
				midiToGuitarNote(this.wrong)
			);
		}
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
			const wrong = this.wrongDot;
			return wrong && wrong.fret === fret && wrong.string === string;
		}
	}
});
</script>

<style lang="postcss" scoped src="./VirtualFretboard.pcss"></style>
