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
					<NoteRenderer
						class="px-4 items-center justify-center flex"
						:task="task"
					/>
				</div>
			</div>
		</div>

		<VirtualKeyboard
			@note="input"
			:correct="correct"
			:wrong="wrong"
			class="mt-auto"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import NoteRenderer from '@/components/NoteRenderer.vue';
import VirtualKeyboard from '@/components/VirtualKeyboard.vue';
import TrainingSettings, {
	Settings,
	defaultSettings
} from './TrainingSettings.vue';

import SettingsIcon from 'vue-material-design-icons/SettingsOutline.vue';

import Gen from '@/generators/Gen';
import SingleNoteGenerator from '@/generators/SingleNoteGen';
import ChordGen from '@/generators/ChordGen';
import { randomPattern } from '@/generators/Patterns';

function randomTask({ tasks: viableTasks } = defaultSettings): Gen {
	const tasks = {
		singleNotes: () => SingleNoteGenerator,
		chords: () => ChordGen,
		patterns: randomPattern
	};

	const name = viableTasks[Math.floor(Math.random() * viableTasks.length)];
	const Task = tasks[name]();
	return new Task();
}

export default Vue.extend({
	data() {
		return {
			task: randomTask(),
			correct: [0],
			wrong: 0,
			halting: false,
			showSettings: false,
			settings: defaultSettings
		};
	},
	components: { NoteRenderer, VirtualKeyboard, TrainingSettings, SettingsIcon },
	methods: {
		input(input: number): void {
			if (this.halting) return;

			const { correct, correctNotes, done } = this.task.check(input);
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
					this.randomTask();
					this.halting = false;
				}, 700);
			}
		},
		randomTask() {
			this.task = randomTask(this.settings);
		},
		updateSettings(settings: Settings) {
			const { clefs } = settings;
			this.settings = settings;

			if (!clefs.includes(this.task.clef)) {
				this.randomTask();
			}
		}
	},
	mounted() {
		// TODO: vuex + ts
		const { midi } = (this as any).$store.getters;

		if (midi) {
			midi.on('noteDown', this.input);
		}
	},
	beforeDestroy() {
		// TODO: vuex + ts
		const { midi } = (this as any).$store.getters;

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
