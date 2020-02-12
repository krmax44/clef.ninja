<template>
	<div class="option">
		<div class="options-title">{{ title }}</div>

		<div class="options-selector">
			<div v-for="{ value, label } in values" :key="value">
				<SiteSwitch v-model="state[value]" :disabled="disabled(value)">
					{{ label }}
				</SiteSwitch>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import SiteSwitch from '@/components/SiteSwitch.vue';

export default Vue.extend({
	components: { SiteSwitch },
	props: {
		values: Array,
		value: [String, Number, Object],
		atLeast: {
			type: Number,
			default: 1
		},
		title: String
	},
	data() {
		const state: { [key: string]: boolean } = {};
		return { state };
	},
	methods: {
		disabled(value: any) {
			const state = this.state as any;
			const enabled = Object.values(state).filter(t => t).length;
			if (enabled <= this.atLeast && state[value]) {
				return true;
			}
		}
	},
	created() {
		this.state = this.value;
	},
	watch: {
		state: {
			deep: true,
			handler() {
				this.$emit('input', this.state);
			}
		}
	}
});
</script>
