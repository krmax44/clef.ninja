<template>
	<div class="h-full w-full flex flex-col items-center justify-center">
		<TrophyIcon :size="48" />

		<h2 class="font-bold text-3xl">Game Over</h2>
		<p class="text-xl">
			You scored {{ score }} point{{ score !== 1 ? 's' : '' }}!
		</p>

		<button class="btn btn-red mt-8" @click="$emit('restart')">
			Play again
		</button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import TrophyIcon from 'vue-material-design-icons/TrophyAward.vue';

export default Vue.extend({
	props: ['score'],
	components: { TrophyIcon }
});
</script>
