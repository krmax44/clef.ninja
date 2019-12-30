<template>
	<div class="flex flex-col flex-1 max-w-full">
		<GameTraining v-if="$store.state.gamemode === 'training'" />
		<GameArcade v-else />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameTraining from '@/games/training/index.vue';
import GameArcade from '@/games/arcade/index.vue';

export default Vue.extend({
	components: { GameTraining, GameArcade }
});
</script>
