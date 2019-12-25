<template>
	<div class="flex items-center">
		<transition-group name="lives" tag="div" class="flex flex-row">
			<span class="text-2xl score inline-block mr-4" :key="'score'">
				<span class="hidden md:inline-block">Score:</span> {{ score }}
			</span>

			<span :key="i" v-for="i of lives" class="live">
				<HeartIcon fillColor="#fc5130" :size="32" />
			</span>
		</transition-group>
	</div>
</template>

<script>
import HeartIcon from 'vue-material-design-icons/HeartOutline';

export default {
	props: ['lives', 'score'],
	components: { HeartIcon }
};
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
