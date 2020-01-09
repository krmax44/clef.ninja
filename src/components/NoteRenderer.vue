<template>
	<div ref="paper" class="paper" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		task: {
			type: Object,
			required: true
		}
	},
	mounted() {
		this.render();
	},
	methods: {
		render() {
			const target = this.$refs.paper as Element;
			[...target.children].forEach(c => c.remove());
			this.task.render(target as HTMLElement);
		}
	},
	watch: {
		task() {
			this.render();
		}
	}
});
</script>
