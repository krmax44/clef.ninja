<template>
	<div class="flex flex-col flex-1 max-w-full">
		<div class="timer" :class="{ away: state !== 'playing' }">
			<div
				class="timer-inner"
				:class="{ hurry: remainingTime <= 10 }"
				:style="{ width: `${(remainingTime / 60) * 100}%` }"
				@click="remainingTime -= 10"
			/>
		</div>

		<portal to="header-right">
			<div class="flex items-center">
				<transition-group name="lives" tag="div" class="flex flex-row">
					<span class="text-2xl score inline-block mr-4" :key="'score'">
						Score: {{ score }}
					</span>

					<span :key="i" v-for="i of lives" class="live">
						<HeartIcon fillColor="#fc5130" :size="32" />
					</span>
				</transition-group>
			</div>
		</portal>

		<div class="flex flex-col flex-1 max-w-full">
			<div class="flex justify-center mb-8 h-full display">
				<div class="card-container">
					<div class="card flex justify-center cursor-auto">
						<div class="card-inner">
							<template v-if="state === 'gameOver'">
								<TrophyIcon :size="48" />

								<h2 class="font-bold text-3xl">Game Over</h2>
								<p class="text-xl">
									You scored {{ score }} point{{ score !== 1 ? 's' : '' }}!
								</p>

								<button class="btn btn-red mt-8" @click="restart()">
									Play again
								</button>
							</template>

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
import NoteRenderer from './NoteRenderer';
import VirtualKeyboard from './VirtualKeyboard';
import randomNote from '../utils/randomNote';
import midiToNote from '../utils/midiToNote';
import HeartIcon from 'vue-material-design-icons/HeartOutline';
import TrophyIcon from 'vue-material-design-icons/TrophyAward';

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
	components: { NoteRenderer, VirtualKeyboard, HeartIcon, TrophyIcon },
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
.timer {
	transition: all 0.5s;
	@apply fixed inset-x-0 top-0 bg-gray-200;

	&.away {
		opacity: 0;
		transform: translateY(-8px);
	}

	&-inner {
		height: 8px;
		transition: all 1s linear;
		@apply bg-brand-blue;

		&.hurry {
			@apply bg-brand-red;
		}
	}
}

.display {
	max-height: 300px;
}

.lives-enter-active,
.lives-leave-active,
.lives-move {
	transition: all 0.5s;
}

.lives-leave-active {
	position: fixed;
}

.lives-enter,
.lives-leave-to {
	transform: scale(0);
	opacity: 0;
}
</style>
