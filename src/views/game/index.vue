<template>
	<div class="flex flex-col flex-1 max-w-full">
		<component :is="$store.state.gamemode" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import training from '@/games/training/index.vue';
import arcade from '@/games/arcade/index.vue';

export default Vue.extend({
	components: { training, arcade }
});
</script>
