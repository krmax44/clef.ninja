<template>
	<div class="flex flex-col flex-1 max-w-full">
		<ArcadeTimer :remainingTime="remainingTime" :state="state" />

		<portal to="header-right">
			<ArcadeStats :lives="lives" :score="score" />
		</portal>

		<div class="flex flex-col flex-1 max-w-full">
			<div class="flex justify-center mb-8 h-full display">
				<div class="card-container">
					<div class="card flex justify-center cursor-auto">
						<div class="card-inner">
							<ArcadeGameOver
								v-if="state === 'gameOver'"
								:score="score"
								@restart="restart"
							/>

							<template v-else-if="state === 'countdown'">
								<h2 class="font-bold text-6xl">{{ countdown || 'GO!' }}</h2>
							</template>

							<NoteRenderer
								:notes="notes"
								ref="renderer"
								v-show="state === 'playing'"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<VirtualKeyboard
			@note="input"
			:correct="correct"
			:wrong="wrong"
			:disabled="state !== 'playing'"
			class="mt-auto"
		/>
	</div>
</template>

<script>
import ArcadeTimer from './ArcadeTimer';
import ArcadeStats from './ArcadeStats';
import ArcadeGameOver from './ArcadeGameOver';
import NoteRenderer from '@/components/NoteRenderer';
import VirtualKeyboard from '@/components/VirtualKeyboard';

import randomNote from '@/utils/randomNote';
import midiToNote from '@/utils/midiToNote';
import { note } from '@tonaljs/tonal';
import { toMidi } from '@tonaljs/midi';

import vueComponentReset from '@ianwalter/vue-component-reset';

const resetMixin = vueComponentReset(() => ({
	notes: [randomNote()],
	correct: undefined,
	wrong: undefined,
	halting: false,
	lives: new Array(3).fill().map((a, i) => i),
	state: 'countdown',
	score: 0,
	remainingTime: 60,
	countdown: 3,
	gameClock: undefined
}));

export default {
	components: {
		ArcadeTimer,
		ArcadeStats,
		ArcadeGameOver,
		NoteRenderer,
		VirtualKeyboard
	},

	mixins: [resetMixin],

	methods: {
		input(input) {
			if (this.state !== 'playing') return;

			const actual = this.notes[0].midiNote;
			if (input !== actual) {
				this.wrong = input;
				this.lives.pop();

				if (this.lives.length === 0) {
					this.gameOver();
				}
			} else {
				this.score++;
			}

			this.correct = actual;

			setTimeout(() => {
				this.correct = undefined;
				this.wrong = undefined;
			}, 50);

			this.notes = [randomNote()];
		},

		start() {
			this.gameClock = setInterval(() => {
				if (this.countdown === 0) this.state = 'playing';
				if (this.remainingTime === 0) this.gameOver();

				if (this.countdown >= 0) {
					this.countdown--;
				} else {
					this.remainingTime--;
				}
			}, 1000);
		},

		restart() {
			this.reset();
			this.start();
		},

		gameOver() {
			this.remainingTime = 0;
			this.lives = [];
			this.state = 'gameOver';
			clearInterval(this.gameClock);
		}
	},

	mounted() {
		const { midi } = this.$store.getters;

		if (midi) {
			midi.on('noteDown', this.input);
		}

		this.start();
	},

	beforeDestroy() {
		const { midi } = this.$store.getters;

		if (midi) {
			midi.off('noteDown', this.input);
		}

		clearInterval(this.gameClock);
	}
};
</script>

<style lang="postcss" scoped>
.display {
	max-height: 300px;
}
</style>
