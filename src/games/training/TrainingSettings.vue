<template>
	<div class="modal-container" :class="{ open }" @click="close" ref="container">
		<div class="modal">
			<h3 class="text-xl font-bold mb-4">Settings</h3>

			<div class="option">
				<div class="options-title">Clefs</div>
				<div class="options-selector">
					<div>
						<input
							type="checkbox"
							id="treble"
							:value="allClefs[0]"
							v-model="settings.clefs"
						/>
						<label for="treble">Treble</label>
					</div>

					<div>
						<input
							type="checkbox"
							id="bass"
							:value="allClefs[1]"
							v-model="settings.clefs"
						/>
						<label for="bass">Bass</label>
					</div>

					<div>
						<input
							type="checkbox"
							id="treble8"
							:value="allClefs[2]"
							v-model="settings.clefs"
						/>
						<label for="treble8">Treble (one octave lower)</label>
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
							v-model="settings.tasks"
						/>
						<label for="singlenotes">Single notes</label>
					</div>

					<div>
						<input
							type="checkbox"
							id="patterns"
							value="patterns"
							v-model="settings.tasks"
						/>
						<label for="patterns">Patterns</label>
					</div>

					<div>
						<input
							type="checkbox"
							id="chords"
							value="chords"
							v-model="settings.tasks"
						/>
						<label for="chords">Chords</label>
					</div>
				</div>
			</div>

			<div class="option">
				<div class="options-title">Key labels</div>
				<div class="options-selector">
					<div>
						<input
							type="checkbox"
							id="keylabels"
							v-model="settings.keyLabels"
						/>
						<label for="keylabels">Enable</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Clef from '@/utils/Clef';
import { clefs } from '../../utils/noteConstants';

export default Vue.extend({
	data() {
		return {
			settings: {
				clefs: [],
				tasks: [],
				keyLabels: true
			},
			allClefs: clefs
		};
	},
	props: {
		open: {
			type: Boolean,
			required: true
		},
		value: {
			type: Object,
			required: true
		}
	},
	created() {
		this.settings = this.value;
	},
	methods: {
		close(e: MouseEvent) {
			if (e.target === this.$refs.container) {
				this.$emit('close');
			}
		},
		update() {
			this.$emit('input', this.settings);
		}
	},
	watch: {
		settings: {
			deep: true,
			handler() {
				this.update();
			}
		}
	}
});
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
