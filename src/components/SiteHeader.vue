<template>
	<header class="flex flex-row items-center overflow-hidden">
		<img
			src="../assets/images/logo.svg"
			class="h-16 self-start cursor-pointer"
			@click="$store.commit('stage', 'homeView')"
			alt="clef.ninja Logo"
		/>
		<h1
			class="text-4xl ml-4 cursor-pointer"
			@click="$store.commit('stage', 'homeView')"
		>
			<span class="font-bold">clef</span>
			<span class="text-gray-800">.ninja</span>
		</h1>

		<portal-target
			name="header-right"
			class="flex ml-auto"
			:transition="fadeTransition"
		/>
	</header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	computed: {
		fadeTransition() {
			return {
				functional: true,
				render(h: Vue.CreateElement, context: Vue.RenderContext) {
					return h(
						'transition',
						{ props: { name: 'fade', mode: 'out-in' } },
						context.children
					);
				}
			};
		}
	}
});
</script>

<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
