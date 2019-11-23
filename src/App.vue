<template>
	<div class="min-h-screen container mx-auto">
		<div class="pt-12 md:pt-24 px-4">
			<SiteHeader />

			<main class="pt-12 md:pt-24">
				<GamemodeSelector @selected="gameodeSelected" />
			</main>
		</div>
	</div>
</template>

<script>
import SiteHeader from './components/SiteHeader';
import GamemodeSelector from './components/GamemodeSelector';

export default {
	components: { SiteHeader, GamemodeSelector },
	data() {
		return {
			gamemode: ''
		};
	},
	methods: {
		gameodeSelected(gamemode) {
			this.gamemode = gamemode;
		}
	}
};
</script>

<style lang="postcss">
@import './assets/styles/app.css';
</style>
