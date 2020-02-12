<template>
	<div class="option">
		<div class="options-title">Key labels</div>
		<div class="options-selector">
			<div v-for="{ value, label } of values" :key="value">
				<label class="flex items-center">
					<input
						type="radio"
						class="form-radio text-brand-blue h-5 w-5"
						v-model="state"
						:value="value"
						@change="$emit('input', state)"
					/>
					<span class="ml-2">{{ label }}</span>
				</label>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		values: Array,
		value: [String, Number, Object],
		title: String
	},
	data() {
		const state: any = undefined;
		return { state };
	},
	created() {
		this.state = this.value;
	}
});
</script>
