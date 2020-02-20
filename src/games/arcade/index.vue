<template>
	<div class="flex flex-col flex-1 max-w-full">
		<ArcadeTimer :remainingTime="remainingTime" :state="state" />

		<portal to="header-right">
			<ArcadeStats :lives="lives" :score="score" />
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

							<template v-else-if="state === 'countdown'">
								<h2 class="font-bold text-6xl">{{ countdown || 'GO!' }}</h2>
							</template>

							<div ref="noteRenderer" v-show="state === 'playing'" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<VirtualInput
			@note="input"
			:correct="correct"
			:wrong="wrong"
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

export default Vue.extend({
	mixins: [midiLifecycle()],
	data() {
		return {
			task: (null as unknown) as Task, // TODO: yikes
			taskMistake: false,
			correct: [0],
			wrong: 0,
			lives: 5,
			state: 'countdown',
			score: 0,
			remainingTime: 60,
			countdown: 3,
			gameClock: 0
		};
	},
	components: {
		ArcadeTimer,
		ArcadeStats,
		ArcadeGameOver,
		VirtualInput
	},
	methods: {
		input(input: number) {
			if (this.state !== 'playing') return false;

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
			this.lives = 0;
			this.state = 'gameOver';
			clearInterval(this.gameClock);
		},

		newTask() {
			this.task = randomTask(this.$refs.noteRenderer as HTMLElement);
			this.task.render();
		}
	},

	mounted() {
		this.start();
	},

	beforeDestroy() {
		clearInterval(this.gameClock);
	}
});
</script>

<style lang="postcss" scoped>
.display {
	max-height: 300px;
}
</style>
