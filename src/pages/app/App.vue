<template>
	<div class="min-h-screen container mx-auto flex flex-col">
		<div class="pt-8 md:pt-12 flex flex-col flex-1">
			<SiteHeader class="px-4" />

			<main class="pt-12 md:pt-24 flex flex-1">
				<transition
					:name="stage.transition === 'forwards' ? 'slide' : 'slide-back'"
					@beforeLeave="bodyScroll('hidden')"
					@afterEnter="bodyScroll('auto')"
					mode="out-in"
				>
					<HomeView v-if="stage.name === 'homeView'" />
					<SettingsView v-else-if="stage.name === 'settingsView'" />
					<GameView v-else />
				</transition>
			</main>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import SiteHeader from '@/components/SiteHeader.vue';
import HomeView from '@/views/home/index.vue';
import SettingsView from '@/views/settings/index.vue';
import GameView from '@/views/game/index.vue';

export default Vue.extend({
	components: { SiteHeader, HomeView, SettingsView, GameView },
	computed: {
		stage() {
			// TODO: vuex + ts
			return (this as any).$store.state.stage;
		}
	},
	methods: {
		bodyScroll(to: string) {
			document.body.style.overflowX = to;
		}
	},
	mounted() {
		window.addEventListener('popstate', event => {
			event.preventDefault();
			const { name } = event.state || { name: 'homeView' };

			// TODO: vuex + ts
			(this as any).$store.commit('stage', { name, transition: 'backwards' });
		});
	}
});
</script>

<style lang="postcss" scoped>
@import '~@/assets/styles/app.css';

.slide-enter-active,
.slide-back-enter-active {
	transition: opacity 0.5s, transform 0.5s cubic-bezier(0, 0, 0.2, 1);
}
.slide-leave-active,
.slide-back-leave-active {
	transition: opacity 0.5s, transform 0.5s cubic-bezier(0.4, 0, 1, 1);
}

.slide-leave-to,
.slide-enter,
.slide-back-leave-to,
.slide-back-enter {
	opacity: 0;
}

.slide-leave-to {
	transform: translateX(-30%);
}
.slide-enter {
	transform: translateX(30%);
}

.slide-back-leave-to {
	transform: translateX(30%);
}
.slide-back-enter {
	transform: translateX(-30%);
}

main > div {
	@apply w-full;
}
</style>
