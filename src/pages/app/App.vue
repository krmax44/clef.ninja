<template>
	<div class="min-h-screen container mx-auto flex flex-col">
		<div class="pt-8 md:pt-12 flex flex-col flex-1">
			<SiteHeader class="px-4" />

			<main class="pt-12 md:pt-24 flex flex-1">
				<transition
					name="slide"
					@beforeLeave="bodyScroll('hidden')"
					@afterEnter="bodyScroll('auto')"
					mode="out-in"
				>
					<HomeView v-if="stage === 'homeView'" />
					<SettingsView v-else-if="stage === 'settingsView'" />
					<GameView v-else />
				</transition>
			</main>
		</div>
	</div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader';
import HomeView from '@/views/home/';
import SettingsView from '@/views/settings/';
import GameView from '@/views/game/';

export default {
	components: { SiteHeader, HomeView, SettingsView, GameView },
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

<style lang="postcss" scoped>
@import '~@/assets/styles/app.css';

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

main > div {
	@apply w-full;
}
</style>
