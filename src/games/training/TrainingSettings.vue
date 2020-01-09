<template>
	<div class="modal-container" :class="{ open }" @click="close" ref="container">
		<div class="modal" @click="() => {}">
			<h3 class="text-xl font-bold mb-4">Settings</h3>

			<div class="option">
				<div class="options-title">Clefs</div>
				<div class="options-selector">
					<div>
						<input type="checkbox" id="treble" value="treble" v-model="clefs" />
						<label for="treble">Treble</label>
					</div>

					<div>
						<input type="checkbox" id="bass" value="bass" v-model="clefs" />
						<label for="bass">Bass</label>
					</div>
				</div>
			</div>

			<div class="option">
				<div class="options-title">Train</div>
				<div class="options-selector">
					<div>
						<input
							type="checkbox"
							id="singlenotes"
							value="singleNotes"
							v-model="tasks"
						/>
						<label for="singlenotes">Single notes</label>
					</div>

					<div>
						<input
							type="checkbox"
							id="patterns"
							value="patterns"
							v-model="tasks"
						/>
						<label for="patterns">Patterns</label>
					</div>

					<div>
						<input type="checkbox" id="chords" value="chords" v-model="tasks" />
						<label for="chords">Chords</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Clef } from '../../utils/types';

export interface Settings {
	clefs: Clef[];
	tasks: ('singleNotes' | 'patterns' | 'chords')[];
}

export const defaultSettings: Settings = {
	clefs: ['bass', 'treble'],
	tasks: ['singleNotes']
};

export default Vue.extend({
	data() {
		return defaultSettings;
	},
	props: {
		open: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		close(e: MouseEvent) {
			if (e.target === this.$refs.container) {
				this.$emit('close');
			}
		},
		update() {
			const { clefs, tasks } = this;
			this.$emit('update', { clefs, tasks });
		}
	},
	watch: {
		clefs: atLeastOne('clefs'),
		tasks: atLeastOne('tasks')
	}
});

function atLeastOne(key: any) {
	return async function(this: any, now: any, before: any) {
		if (now.length === 0) {
			await this.$nextTick();
			this[key] = before;
		} else {
			this.update();
		}
	};
}
</script>

<style lang="postcss" scoped>
.modal-container {
	background-color: rgba(0, 0, 0, 0.4);
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.3s;
	@apply flex justify-center items-center fixed inset-0 z-10;

	.modal {
		transform: scale(0.8) translateY(100px);
		transition: transform 0.5s ease;
		@apply max-w-2xl w-2/3 p-4 shadow-lg bg-white rounded;
	}

	&.open {
		opacity: 1;
		pointer-events: auto;

		& .modal {
			transform: scale(1) translateY(0);
		}
	}
}

.option {
	@apply flex flex-col w-full;

	&:not(:last-child) {
		@apply mb-4;
	}
}

.options-title {
	@apply font-bold;
}

.options-selector {
	@apply flex flex-col;

	& > div {
		@apply flex;
	}
}

input[type='checkbox'] {
	@apply leading-tight mr-2;

	&:first-child {
		@apply ml-0;
	}
}

@screen md {
	.option {
		@apply flex-row;
	}

	.options-selector {
		@apply ml-auto flex-row;
	}

	.options-selector > div:not(:first-child) {
		@apply ml-6;
	}
}
</style>
