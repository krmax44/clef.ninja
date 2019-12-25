<template>
	<div class="timer" :class="{ away: state !== 'playing' }">
		<div
			class="timer-inner"
			:class="{ hurry: remainingTime <= 10 }"
			:style="{ width: `${(remainingTime / 60) * 100}%` }"
			@click="remainingTime -= 10"
		/>
	</div>
</template>

<script>
export default {
	props: ['state', 'remainingTime']
};
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
		transition: all 1s linear;
		@apply bg-brand-blue;

		&.hurry {
			@apply bg-brand-red;
		}
	}
}
</style>
