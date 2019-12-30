<template>
	<div ref="paper" class="paper" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		note: {
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
			this.note.render(target);
		}
	},
	watch: {
		note() {
			this.render();
		}
	}
});
</script>

<style lang="postcss" scoped>
.paper >>> svg {
	max-height: 30vh;
}
</style>
