<template>
	<div>
		<h2 class="text-2xl">Select your game mode.</h2>

		<div class="flex justify-around py-8 flex-wrap">
			<div class="card-container" @click="selectGamemode('traning')">
				<div class="card">
					<div class="card-inner">
						<SchoolIcon :size="48" />

						<h3>Training Mode</h3>
						<p>Get started reading treble and bass clefs.</p>
					</div>
				</div>
			</div>

			<div class="card-container opacity-25">
				<div class="card cursor-auto">
					<div class="card-inner">
						<GamepadIcon :size="48" />

						<h3>Arcade Mode</h3>
						<p>Coming soon.</p>
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
	components: { SchoolIcon, GamepadIcon },
	methods: {
		selectGamemode(gamemode) {
			this.$store.commit('gamemode', gamemode);
			this.$store.commit('nextStage');
		}
	}
};
</script>

<style lang="postcss" scoped>
@import '../assets/styles/cardPicker.css';
</style>
