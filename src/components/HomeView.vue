<template>
	<div class="px-4">
		<h2 class="text-2xl">Select your game mode.</h2>

		<div class="flex justify-around py-8 flex-wrap">
			<div class="card-container" @click="selectGamemode('training')">
				<div class="card">
					<div class="card-inner">
						<SchoolIcon :size="48" />

						<h3>Training Mode</h3>
						<p>Get started reading treble and bass clefs.</p>
					</div>
				</div>
			</div>

			<div class="card-container" @click="selectGamemode('arcade')">
				<div class="card">
					<div class="card-inner">
						<GamepadIcon :size="48" />

						<h3>Arcade Mode</h3>
						<p>
							Hit as many correct notes as possible. You have three lives and 60
							seconds. Go!
						</p>
					</div>
				</div>
			</div>

			<div
				class="card-container"
				@click="$store.commit('stage', 'settingsView')"
			>
				<div class="card">
					<div class="card-inner">
						<SettingsIcon :size="48" />

						<h3>Settings</h3>
						<p>
							Setup your MIDI keyboard.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SchoolIcon from 'vue-material-design-icons/SchoolOutline';
import GamepadIcon from 'vue-material-design-icons/GamepadSquareOutline';
import SettingsIcon from 'vue-material-design-icons/SettingsOutline';

export default {
	components: { SchoolIcon, GamepadIcon, SettingsIcon },
	methods: {
		selectGamemode(gamemode) {
			this.$store.commit('gamemode', gamemode);
			this.$store.commit('stage', 'gamePlay');
		}
	}
};
</script>

<style lang="postcss" scoped>
@import '../assets/styles/card-picker.css';

@screen md {
	.card-container {
		@apply w-1/3;
	}
}
</style>
