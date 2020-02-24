<template>
	<div class="flex flex-col flex-1 max-w-full">
		<ArcadeTimer :remainingTime="remainingTime" :visible="isRunning" />

		<portal to="header-right">
			<div>
				<ArcadeStats :lives="lives" :score="score" />

				<button
					class="ml-4 btn-round"
					:title="isPlaying ? 'Pause' : 'Resume'"
					@click="pause"
				>
					<PauseIcon class="h-8 w-8" v-if="isPlaying" />
					<PlayIcon class="h-8 w-8" v-else />
				</button>
			</div>
		</portal>

		<div class="flex flex-col flex-1 max-w-full">
			<div class="flex justify-center mb-8 h-full display">
				<div class="card-container md:w-2/3">
					<div class="card flex justify-center cursor-auto">
						<div class="card-inner">
							<ArcadeGameOver
								v-if="state === 'gameOver'"
								:score="score"
								@restart="restart"
							/>

							<template v-else-if="!isCountdownDone">
								<h2 class="font-bold text-6xl">
									{{ Math.trunc(countdown / 1000) || 'GO!' }}
								</h2>
							</template>

							<div
								ref="noteRenderer"
								v-show="isRunning"
								class="note-renderer"
								:class="{ disabled: !isPlaying }"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<VirtualInput
			@note="input"
			:correct="correct"
			:wrong="wrong"
			:disabled="!isPlaying || !isCountdownDone"
			class="mt-auto"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import ArcadeTimer from './ArcadeTimer.vue';
import ArcadeStats from './ArcadeStats.vue';
import ArcadeGameOver from './ArcadeGameOver.vue';
import VirtualInput from '@/components/VirtualInput.vue';
import PauseIcon from 'icons/Pause.vue';
import PlayIcon from 'icons/PlayOutline.vue';

import Task from '@/tasks/Task';
import TaskSingleNote from '@/tasks/TaskSingleNote';
import TaskChord from '@/tasks/TaskChord';
import TaskPattern from '@/tasks/TaskPattern';
import { randomFromArray } from '@/utils/randomHelper';
import { midiLifecycle } from '@/utils/houkLifecycle';

const tasks = [TaskSingleNote, TaskChord, TaskPattern];
function randomTask(target: HTMLElement): Task {
	const Task = randomFromArray(tasks);
	return new Task({ target });
}

async function animationFrame() {
	return new Promise(c => window.requestAnimationFrame(c));
}

export default Vue.extend({
	mixins: [midiLifecycle()],
	data() {
		return {
			task: {} as Task,
			taskMistake: false,
			correct: [0],
			wrong: 0,
			lives: 5,
			state: 'playing',
			score: 0,
			remainingTime: 60000,
			countdown: 4000,
			lastTick: 0
		};
	},
	components: {
		ArcadeTimer,
		ArcadeStats,
		ArcadeGameOver,
		VirtualInput,
		PlayIcon,
		PauseIcon
	},
	methods: {
		input(input: number) {
			if (!this.isRunning) return false;

			const { correct, correctNotes, done, score } = this.task.check(input);
			this.task.render();

			if (!correct) {
				this.wrong = input;

				// only lose 1 live per failed task
				if (!this.taskMistake) {
					this.taskMistake = true;
					this.lives--;
				}

				if (this.lives === 0) {
					this.gameOver();
				}
			} else if (score !== false) {
				this.score++;
			}

			this.correct = correctNotes;

			setTimeout(() => {
				this.correct = [];
				this.wrong = 0;
			}, 50);

			if (done) {
				this.newTask();
				this.taskMistake = false;
			}
		},

		start() {
			this.newTask();
			this.setGameClock();
		},

		async setGameClock() {
			this.lastTick = Date.now();

			while (this.isPlaying) {
				if (this.remainingTime <= 0) this.gameOver();

				const delta = Date.now() - this.lastTick;
				if (this.countdown > 0) {
					this.countdown -= delta;
				} else {
					this.remainingTime -= delta;
				}

				this.lastTick = Date.now();
				await animationFrame();
			}
		},

		restart() {
			Object.assign(this.$data, (this.$options.data as any).apply(this));
			this.start();
		},

		pause() {
			if (this.isPlaying && this.isCountdownDone) {
				this.state = 'paused';
			} else if (this.state === 'paused') {
				this.state = 'playing';
				this.setGameClock();
			}
		},

		gameOver() {
			this.remainingTime = 0;
			this.lives = 0;
			this.state = 'gameOver';
		},

		newTask() {
			this.task = randomTask(this.$refs.noteRenderer as HTMLElement);
			this.task.render();
		}
	},

	computed: {
		isRunning(): boolean {
			return (
				(this.state === 'playing' || this.state === 'paused') &&
				this.isCountdownDone
			);
		},
		isCountdownDone(): boolean {
			return this.countdown <= 0;
		},
		isPlaying(): boolean {
			return this.state === 'playing';
		}
	},

	mounted() {
		this.start();
	},

	beforeDestroy() {
		this.state = 'paused';
	}
});
</script>

<style lang="postcss" scoped>
.display {
	max-height: 300px;
}

.note-renderer {
	transition: opacity 0.3s;

	&.disabled {
		opacity: 0.5;
	}
}
</style>
