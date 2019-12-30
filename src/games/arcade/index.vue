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
								:note="note"
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

<script lang="ts">
import Vue from 'vue';

import ArcadeTimer from './ArcadeTimer.vue';
import ArcadeStats from './ArcadeStats.vue';
import ArcadeGameOver from './ArcadeGameOver.vue';
import NoteRenderer from '@/components/NoteRenderer.vue';
import VirtualKeyboard from '@/components/VirtualKeyboard.vue';

import RandomNote from '@/generators/RandomNote';

interface Data {
	note: RandomNote;
	correct: number | undefined;
	wrong: number | undefined;
	halting: boolean;
	lives: number[];
	state: string;
	score: number;
	remainingTime: number;
	countdown: number;
	gameClock: number | undefined;
}

export default Vue.extend({
	data(): Data {
		return {
			note: new RandomNote(),
			correct: -1,
			wrong: -1,
			halting: false,
			lives: new Array(3).fill(undefined).map((a, i) => i),
			state: 'countdown',
			score: 0,
			remainingTime: 60,
			countdown: 3,
			gameClock: undefined
		};
	},
	components: {
		ArcadeTimer,
		ArcadeStats,
		ArcadeGameOver,
		NoteRenderer,
		VirtualKeyboard
	},
	methods: {
		input(input: number) {
			if (this.state !== 'playing') return;

			if (!this.note.check(input)) {
				this.wrong = input;
				this.lives.pop();

				if (this.lives.length === 0) {
					this.gameOver();
				}
			} else {
				this.score++;
			}

			this.correct = this.note.notes[0].midiNote;

			setTimeout(() => {
				this.correct = undefined;
				this.wrong = undefined;
			}, 50);

			this.note = new RandomNote();
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
			Object.assign(this.$data, (this.$options.data as any).apply(this));
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
		// TODO: vuex + ts
		const { midi } = (this as any).$store.getters;

		if (midi) {
			midi.on('noteDown', this.input);
		}

		this.start();
	},

	beforeDestroy() {
		// TODO: vuex + ts
		const { midi } = (this as any).$store.getters;

		if (midi) {
			midi.off('noteDown', this.input);
		}

		clearInterval(this.gameClock);
	}
});
</script>

<style lang="postcss" scoped>
.display {
	max-height: 300px;
}
</style>
