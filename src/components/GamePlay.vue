<template>
	<div class="flex flex-col flex-1 max-w-full">
		<GameTraining v-if="$store.state.gamemode === 'training'" />
		<GameArcade v-else />
	</div>
</template>
<script>
import GameTraining from './GameTraining';
import GameArcade from './GameArcade';

export default {
	components: { GameTraining, GameArcade }
};
</script>
