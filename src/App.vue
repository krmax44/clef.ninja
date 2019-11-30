<template>
	<div class="min-h-screen container mx-auto">
		<div class="pt-12 md:pt-24 px-4">
			<SiteHeader />

			<main class="pt-12 md:pt-24">
				<transition
					name="slide"
					@beforeLeave="bodyScroll('hidden')"
					@afterEnter="bodyScroll('auto')"
					mode="out-in"
				>
					<GamemodeSelector v-if="stage === 'gamemodeSelector'" />
					<KeyboardSetup v-else-if="stage === 'keyboardSetup'" />
					<GamePlay v-else />
				</transition>
			</main>
		</div>
	</div>
</template>

<script>
import SiteHeader from './components/SiteHeader';
import GamemodeSelector from './components/GamemodeSelector';
import KeyboardSetup from './components/KeyboardSetup';
import GamePlay from './components/GamePlay';

export default {
	components: { SiteHeader, GamemodeSelector, KeyboardSetup, GamePlay },
	computed: {
		stage() {
			return this.$store.state.stage;
		}
	},
	methods: {
		bodyScroll(to) {
			document.body.style.overflowX = to;
		}
	}
};
</script>

<style lang="postcss">
@import './assets/styles/app.css';

.slide-enter-active {
	transition: opacity 0.5s, transform 0.5s cubic-bezier(0, 0, 0.2, 1);
}
.slide-leave-active {
	transition: opacity 0.5s, transform 0.5s cubic-bezier(0.4, 0, 1, 1);
}

.slide-leave-to {
	opacity: 0;
	transform: translateX(-30%);
}
.slide-enter {
	opacity: 0;
	transform: translateX(30%);
}
</style>
