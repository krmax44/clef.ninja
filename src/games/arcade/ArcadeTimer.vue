<template>
	<div class="timer" :class="{ away: !visible }">
		<div
			class="timer-inner"
			:class="{ hurry: remainingTime <= 10 }"
			:style="{ width: `${(remainingTime / totalTime) * 100}%` }"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		visible: {
			type: Boolean,
			required: true
		},
		remainingTime: {
			type: Number,
			required: true
		},
		totalTime: {
			type: Number,
			required: false,
			default: 60000
		}
	}
});
</script>

<style lang="postcss" scoped>
.timer {
	transition: all 0.5s;
	@apply fixed inset-x-0 top-0 bg-gray-200;

	&.away {
		opacity: 0;
		transform: translateY(-8px);
	}

	&-inner {
		height: 8px;
		@apply bg-brand-blue;

		&.hurry {
			@apply bg-brand-red;
		}
	}
}
</style>
