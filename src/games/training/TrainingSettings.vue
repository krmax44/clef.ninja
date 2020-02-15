<template>
	<div class="modal-container" :class="{ open }" @click="close" ref="container">
		<div class="modal">
			<div class="flex-center w-full mb-6">
				<h3 class="text-3xl font-bold">Exercise Regimen</h3>
				<div
					class="btn-round w-8 h-8 ml-auto"
					role="button"
					@click="$emit('close')"
					title="Close"
				>
					<CloseIcon fillColor="#718096" class="w-6 h-6" />
				</div>
			</div>

			<SettingsSwitches
				title="Clefs"
				:values="[
					{ value: 'treble', label: 'Treble' },
					{ value: 'bass', label: 'Bass' },
					{ value: 'treble8vb', label: 'Treble (one octave lower)' }
				]"
				v-model="settings.clefs"
			/>

			<SettingsSwitches
				title="Tasks"
				:values="[
					{ value: 'singleNotes', label: 'Single Notes' },
					{ value: 'patterns', label: 'Patterns' },
					{ value: 'chords', label: 'Chords' }
				]"
				v-model="settings.tasks"
			/>

			<SettingsRadio
				title="Difficulty"
				:values="[
					{ value: 1, label: 'Easy' },
					{ value: 2, label: 'Medium' },
					{ value: 3, label: 'Hard' }
				]"
				v-model="settings.difficulty"
			/>

			<div class="option">
				<div class="options-title">Help text</div>
				<div class="options-selector">
					<div>
						<SiteSwitch v-model="settings.helpText" />
					</div>
				</div>
			</div>

			<div class="option">
				<div class="options-title">Key labels</div>
				<div class="options-selector">
					<div>
						<SiteSwitch v-model="settings.keyLabels" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Clef from '@/utils/Clef';
import SiteSwitch from '@/components/SiteSwitch.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import SettingsSwitches from './SettingsSwitches.vue';
import SettingsRadio from './SettingsRadio.vue';
import defaultSettings from './defaultSettings';

export default Vue.extend({
	components: { SiteSwitch, SettingsSwitches, SettingsRadio, CloseIcon },
	data() {
		return {
			settings: defaultSettings
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
		}
	},
	watch: {
		settings: {
			deep: true,
			handler() {
				this.$emit('input', this.settings);
			}
		}
	}
});
</script>

<style lang="postcss" scoped>
.modal-container {
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.4s;
	@apply flex justify-center items-center fixed inset-0 z-10;

	.modal {
		transform: translateY(50vh);
		transition: transform 0.5s ease;
		max-height: 90vh;
		@apply max-w-4xl w-full p-6 m-2 shadow-lg bg-white rounded overflow-auto;
	}

	&.open {
		opacity: 1;
		pointer-events: auto;

		& .modal {
			transform: scale(1) translateY(0);
		}
	}
}

.modal >>> .option {
	@apply flex flex-col w-full;

	&:not(:last-child) {
		@apply mb-4;
	}

	.options-title {
		@apply flex items-center font-bold;
	}

	.options-selector {
		@apply flex flex-col justify-center items-start my-2;

		& > div {
			@apply flex my-1;
		}
	}
}

@screen md {
	.modal-container .modal {
		@apply p-12;
	}

	.modal >>> .option {
		@apply flex-row;

		.options-selector {
			@apply ml-auto flex-row;
		}

		.options-selector > div:not(:first-child) {
			@apply ml-6;
		}

		.form-switch {
			order: 2;
			@apply mr-0 ml-2;
		}
	}
}
</style>
