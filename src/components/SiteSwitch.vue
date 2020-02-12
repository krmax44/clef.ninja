<template>
	<div class="form-switch-container">
		<div class="form-switch inline-block align-middle" :class="{ disabled }">
			<input
				type="checkbox"
				class="form-switch-checkbox"
				v-model="state"
				:id="id"
				:disabled="disabled"
				@change="$emit('input', $event.target.checked)"
			/>
			<label class="form-switch-label" :for="id"></label>
		</div>

		<label :for="id">
			<slot>{{ state ? onText : offText }}</slot>
		</label>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		value: Boolean,
		disabled: {
			type: Boolean,
			default: false
		},
		onText: {
			type: String,
			default: 'On'
		},
		offText: {
			type: String,
			default: 'Off'
		}
	},
	data() {
		return {
			state: true,
			id: Math.random()
				.toString(36)
				.slice(7)
		};
	},
	created() {
		this.state = this.value;
	}
});
</script>

<style lang="postcss">
.form-switch-container {
	@apply flex;

	.form-switch {
		@apply relative select-none w-12 mr-2 leading-normal;

		&.disabled {
			filter: grayscale(1);
		}
	}
}

.form-switch-checkbox {
	@apply hidden;
}

.form-switch-label {
	@apply block overflow-hidden cursor-pointer bg-white border rounded-full h-6 shadow-inner;
	transition: background-color 0.2s ease-in;
}

.form-switch-label::before {
	@apply absolute block bg-white inset-y-0 w-6 border rounded-full -ml-1;

	right: 50%;
	content: '';
	transition: all 0.2s ease-in;
}

.form-switch-checkbox:checked + .form-switch-label,
.form-switch-checkbox:checked + .form-switch-label::before {
}

.form-switch-checkbox:checked + .form-switch-label {
	@apply bg-brand-blue shadow-none;
}

.form-switch-checkbox:checked + .form-switch-label::before {
	@apply right-0;
}
</style>
