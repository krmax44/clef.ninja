<template>
	<div class="flex flex-col flex-1 max-w-full">
		<portal to="header-right">
			<div class="flex items-center">
				<div class="btn-options" role="checkbox" @click="showSettings = true">
					<SettingsIcon :size="32" fillColor="#718096" />
				</div>
			</div>
		</portal>

		<TrainingSettings
			:open="showSettings"
			@close="showSettings = false"
			@update="updateSettings"
		/>

		<div class="display">
			<div class="card-container h-full md:w-2/3">
				<div class="card flex justify-center cursor-auto">
					<div
						class="px-4 items-center justify-center flex paper"
						ref="noteRenderer"
					/>
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
import TrainingSettings, {
	Settings,
	defaultSettings
} from './TrainingSettings.vue';

import SettingsIcon from 'vue-material-design-icons/SettingsOutline.vue';

import Task from '@/tasks/Task';
import TaskSingleNote from '@/tasks/TaskSingleNote';
import TaskChord from '@/tasks/TaskChord';
import { randomPattern } from '@/tasks/PatternTasks';

function randomTask(
	target: HTMLElement,
	{ tasks: viableTasks } = defaultSettings
): Task {
	const tasks = {
		singleNotes: () => TaskSingleNote,
		chords: () => TaskChord,
		patterns: randomPattern
	};

	const name = viableTasks[Math.floor(Math.random() * viableTasks.length)];
	const Task = tasks[name]();
	return new Task(target);
}

export default Vue.extend({
	data() {
		return {
			task: (undefined as unknown) as Task,
			correct: [0],
			wrong: 0,
			halting: false,
			showSettings: false,
			settings: defaultSettings
		};
	},
	components: { VirtualInput, TrainingSettings, SettingsIcon },
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
				this.settings
			);
			this.task.render();
		},
		updateSettings(settings: Settings) {
			const { clefs } = settings;
			this.settings = settings;

			if (!clefs.includes(this.task.clef)) {
				this.newTask();
			}
		}
	},
	mounted() {
		this.newTask();

		const { midi } = this.$store.getters;

		if (midi) {
			midi.on('noteDown', this.input);
		}
	},
	beforeDestroy() {
		const { midi } = this.$store.getters;

		if (midi) {
			midi.off('noteDown', this.input);
		}
	}
});
</script>

<style lang="postcss" scoped>
.display {
	max-height: 30vh;
	@apply flex items-center justify-center mb-8 flex-1;
}

.btn-options {
	@apply flex items-center justify-center w-12 h-12 mx-2 rounded-full bg-gray-300 cursor-pointer;

	&:last-child {
		@apply mr-0;
	}
}
</style>
