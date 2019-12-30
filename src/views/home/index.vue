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

<script lang="ts">
import Vue from 'vue';
import SchoolIcon from 'vue-material-design-icons/SchoolOutline.vue';
import GamepadIcon from 'vue-material-design-icons/GamepadSquareOutline.vue';
import SettingsIcon from 'vue-material-design-icons/SettingsOutline.vue';

export default Vue.extend({
	components: { SchoolIcon, GamepadIcon, SettingsIcon },
	methods: {
		selectGamemode(gamemode: string) {
			// TODO: vuex + ts
			(this as any).$store.commit('gamemode', gamemode);
			(this as any).$store.commit('stage', 'gamePlay');
		}
	}
});
</script>

<style lang="postcss" scoped>
@import '~@/assets/styles/card-picker.css';

@screen md {
	.card-container {
		@apply w-1/3;
	}
}
</style>
