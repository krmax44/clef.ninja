<template>
	<div>
		<h2 class="text-2xl">Select your game mode.</h2>

		<div class="flex justify-around py-8">
			<div
				class="card-container md:w-2/5"
				@click="$emit('selected', 'traning')"
			>
				<div class="card">
					<div class="card-inner">
						<SchoolIcon size="48" />

						<h3>Training Mode</h3>
						<p>Get started.</p>
					</div>
				</div>
			</div>

			<div class="card-container md:w-2/5" @click="$emit('selected', 'arcade')">
				<div class="card">
					<div class="card-inner">
						<GamepadIcon size="48" />

						<h3>Arcade Mode</h3>
						<p>Get started.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SchoolIcon from 'vue-material-design-icons/SchoolOutline';
import GamepadIcon from 'vue-material-design-icons/GamepadSquareOutline';

export default {
	components: { SchoolIcon, GamepadIcon }
};
</script>

<style lang="postcss" scoped>
.card {
	@apply cursor-pointer;
}

.card-inner {
	@apply flex flex-col items-center;
}

.card svg {
	@apply my-2;
}
</style>
