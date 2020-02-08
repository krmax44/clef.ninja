<template>
	<div class="flex flex-col flex-1 max-w-full">
		<portal to="header-right-small">
			<div class="flex items-center">
				<div
					class="btn-options"
					role="button"
					@click="showSettings = true"
					title="Settings"
				>
					<SettingsIcon :size="32" fillColor="#718096" />
				</div>
			</div>
		</portal>

		<TrainingSettings
			:open="showSettings"
			v-model="settings"
			@close="showSettings = false"
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
import TrainingSettings from './TrainingSettings.vue';

import SettingsIcon from 'vue-material-design-icons/SettingsOutline.vue';

import Task from '@/tasks/Task';
import TaskSingleNote from '@/tasks/TaskSingleNote';
import TaskChord from '@/tasks/TaskChord';
import { randomPattern } from '@/tasks/PatternTasks';
import Clef from '@/utils/Clef';

function randomTask(
	target: HTMLElement,
	{ tasks: viableTasks, clefs } = defaultSettings
): Task {
	const tasks = {
		singleNotes: () => TaskSingleNote,
		chords: () => TaskChord,
		patterns: randomPattern
	};

	const name = viableTasks[Math.floor(Math.random() * viableTasks.length)];
	const Task = tasks[name]();
	return new Task(target, clefs);
}

interface Settings {
	clefs: Clef[];
	tasks: ('singleNotes' | 'patterns' | 'chords')[];
	keyLabels: boolean;
}

const defaultSettings: Settings = {
	clefs: [],
	tasks: ['singleNotes'],
	keyLabels: true
};

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
		}
	},
	created() {
		this.settings.clefs = this.$store.state.instrument.clefs;
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
	},
	watch: {
		async 'settings.clefs'(now, before) {
			if (now.length === 0) {
				await this.$nextTick();
				this.settings.clefs = before;
				return;
			}

			if (!this.settings.clefs.map(c => c.name).includes(this.task.clef.name)) {
				this.newTask();
			}
		},
		async 'settings.tasks'(now, before) {
			if (now.length === 0) {
				await this.$nextTick();
				this.settings.tasks = before;
				return;
			}
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
