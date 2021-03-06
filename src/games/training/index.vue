<template>
	<div class="flex flex-col flex-1 max-w-full">
		<portal to="header-right">
			<div class="flex items-center">
				<transition name="scale">
					<button
						class="btn-round"
						title="Retry previous task"
						v-if="history.length !== 0"
						@click="previousTask"
					>
						<PreviousIcon class="h-8 w-8" />
					</button>
				</transition>

				<button class="btn-round" title="Retry task" @click="retryTask">
					<RetryIcon class="h-8 w-8" />
				</button>

				<button class="btn-round" title="Skip task" @click="skipTask">
					<SkipIcon class="h-8 w-8" />
				</button>

				<button class="btn-round" title="Settings" @click="showSettings = true">
					<SettingsIcon class="h-8 w-8" />
				</button>
			</div>
		</portal>

		<TrainingSettings
			:open="showSettings"
			v-model="settings"
			@close="showSettings = false"
		/>

		<div class="display">
			<div class="card-container h-full md:w-2/3">
				<div class="card flex flex-col justify-center cursor-auto">
					<div
						class="px-4 items-center justify-center flex paper"
						ref="noteRenderer"
					/>

					<div
						v-if="settings.helpText && task && task.helpText"
						class="flex justify-center text-lg"
					>
						<component :is="task.helpText" />
					</div>
				</div>
			</div>
		</div>

		<VirtualInput
			@note="input"
			:correct="correct"
			:wrong="wrong"
			:keyLabels="settings.keyLabels"
			class="mt-auto"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import VirtualInput from '@/components/VirtualInput.vue';
import TrainingSettings from './TrainingSettings.vue';
import RetryIcon from 'icons/Refresh.vue';
import PreviousIcon from 'icons/SkipPreviousOutline.vue';
import SkipIcon from 'icons/SkipNextOutline.vue';
import SettingsIcon from 'icons/SettingsOutline.vue';

import defaultSettings from './defaultSettings';
import Task from '@/tasks/Task';
import TaskSingleNote from '@/tasks/TaskSingleNote';
import TaskChord from '@/tasks/TaskChord/index';
import TaskPattern from '@/tasks/TaskPattern';

import Clef from '@/utils/Clef';
import { clefs } from '@/utils/noteConstants';
import { randomFromArray } from '@/utils/randomHelper';
import { midiLifecycle } from '@/utils/houkLifecycle';

const tasks: { [key: string]: any } = {
	singleNotes: TaskSingleNote,
	chords: TaskChord,
	patterns: TaskPattern
};

function randomTask(
	target: HTMLElement,
	clefs: Clef[],
	viableTasks: string[],
	difficulty: number
): Task {
	const name = randomFromArray(viableTasks);
	const task = tasks[name];
	return new task({ target, clefs, difficulty });
}

export default Vue.extend({
	mixins: [midiLifecycle()],
	data() {
		return {
			task: {} as Task,
			correct: [0],
			wrong: 0,
			halting: false,
			showSettings: false,
			settings: defaultSettings,
			history: [] as Task[]
		};
	},
	components: {
		VirtualInput,
		TrainingSettings,
		PreviousIcon,
		SkipIcon,
		RetryIcon,
		SettingsIcon
	},
	methods: {
		input(input: number): void {
			if (this.halting) return;

			const { correct, correctNotes, done } = this.task.check(input);
			this.task.render();

			if (!correct) {
				this.wrong = input;
			}

			this.correct = correctNotes;

			setTimeout(() => {
				this.correct = [];
				this.wrong = 0;
			}, 50);

			if (done) {
				this.history.push(this.task);
				this.halting = true;

				setTimeout(() => {
					this.newTask();
					this.halting = false;
				}, 700);
			}
		},
		newTask() {
			this.task = randomTask(
				this.$refs.noteRenderer as HTMLElement,
				this.clefs,
				this.tasks,
				this.settings.difficulty
			);
			this.task.render();
		},
		skipTask() {
			this.history.push(this.task);
			this.newTask();
		},
		previousTask() {
			if (this.halting) return;

			const previousTask = this.history.pop();
			if (previousTask) {
				this.task = previousTask;
				this.retryTask();
			}
		},
		retryTask() {
			this.task.retry();
			this.task.render();
		}
	},
	computed: {
		clefs(): Clef[] {
			return clefs.filter(c => this.settings.clefs[c.id]);
		},
		tasks(): string[] {
			return Object.keys(tasks).filter(t => this.settings.tasks[t]);
		}
	},
	created() {
		const clefNames = this.$store.getters.instrument.clefs.map(
			(c: Clef) => c.id
		);
		let clefs: { [key: string]: boolean } = {};

		for (const clef of clefNames) {
			clefs[clef] = true;
		}

		this.settings.clefs = clefs;
	},
	mounted() {
		this.newTask();
	},
	watch: {
		'settings.clefs': {
			handler(clefs) {
				if (!clefs[this.task.clef.id]) {
					this.newTask();
				}
			},
			deep: true
		}
	}
});
</script>

<style lang="postcss" scoped>
.display {
	max-height: 30vh;
	@apply flex items-center justify-center mb-8 flex-1;
}
</style>
