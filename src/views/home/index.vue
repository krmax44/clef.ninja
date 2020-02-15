<template>
	<div class="px-4">
		<portal to="header-right-small">
			<div class="flex items-center">
				<div
					class="btn-round"
					role="button"
					@click="$store.commit('stage', { name: 'settingsView' })"
				>
					<SettingsIcon fillColor="#718096" class="w-8 h-8" />
				</div>
			</div>
		</portal>

		<h2 class="text-2xl">Select your game mode.</h2>

		<div class="flex justify-around py-8 flex-wrap">
			<div class="card-container" @click="selectGamemode('training')">
				<div class="card">
					<div class="card-inner">
						<SchoolIcon class="w-12 h-12" />

						<h3>Training Mode</h3>
						<p>Get started reading treble and bass clefs.</p>
					</div>
				</div>
			</div>

			<div class="card-container" @click="selectGamemode('arcade')">
				<div class="card">
					<div class="card-inner">
						<GamepadIcon class="w-12 h-12" />

						<h3>Arcade Mode</h3>
						<p>
							Hit as many correct notes as possible. You have three lives and 60
							seconds. Go!
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
			this.$store.commit('gamemode', gamemode);
			this.$store.commit('stage', { name: 'gamePlay' });
		}
	}
});
</script>

<style lang="postcss" scoped>
@import '~@/assets/styles/cardPicker.pcss';

@screen md {
	.card-container {
		@apply w-1/2;
	}
}
</style>
