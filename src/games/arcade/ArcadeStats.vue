<template>
	<div class="flex items-center">
		<transition-group name="lives" tag="div" class="flex-center">
			<span class="text-2xl score inline-block mr-4" :key="'score'">
				Score: {{ score }}
			</span>

			<span
				:key="i"
				v-for="i of new Array(lives).fill(undefined).map((a, i) => i)"
				class="live"
			>
				<HeartIcon fillColor="#fc5130" class="h-6 w-6" />
			</span>
		</transition-group>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeartIcon from 'vue-material-design-icons/HeartOutline.vue';

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
.lives-enter-active,
.lives-leave-active,
.lives-move {
	transition: all 0.5s;
}

.lives-leave-active {
	position: fixed;
}

.lives-enter,
.lives-leave-to {
	transform: scale(0);
	opacity: 0;
}
</style>
