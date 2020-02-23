<template>
	<div class="flex items-center">
		<transition-group name="scale" tag="div" class="flex-center">
			<span class="text-2xl score inline-block mr-4" :key="'score'">
				Score: {{ score }}
			</span>

			<span
				:key="i"
				v-for="i of new Array(lives).fill(undefined).map((a, i) => i)"
				class="text-brand-red"
			>
				<HeartIcon class="h-6 w-6" />
			</span>
		</transition-group>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeartIcon from 'icons/HeartOutline.vue';

export default Vue.extend({
	props: {
		lives: {
			type: Number,
			required: true
		},
		score: {
			type: Number,
			required: true
		}
	},
	components: { HeartIcon }
});
</script>

<style lang="postcss" scoped>
.scale-move:not(.scale-leave-active),
.scale-enter-active {
	transition-delay: 0.3s;
}

.scale-leave-active {
	position: fixed;
}
</style>
