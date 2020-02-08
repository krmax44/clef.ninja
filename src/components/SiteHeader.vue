<template>
	<header>
		<img
			src="../assets/images/logo.svg"
			class="logo cursor-pointer"
			@click="home()"
			alt="clef.ninja Logo"
			title="To Home screen"
		/>
		<h1
			class="brand cursor-pointer"
			:class="{ 'hidden lg:block': brandHidden, visible: brandVisible }"
			@click="home()"
			title="To Home screen"
		>
			<span class="font-bold">clef</span>
			<span class="text-gray-800">.ninja</span>
		</h1>

		<portal-target
			name="header-right"
			class="flex ml-auto"
			:transition="fadeTransition"
			@change="portalChange"
		/>

		<portal-target
			name="header-right-small"
			class="flex ml-auto"
			:transition="fadeTransition"
		/>
	</header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	data() {
		return {
			brandHidden: false,
			brandVisible: true
		};
	},
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
	},
	methods: {
		home() {
			this.$store.commit('stage', {
				name: 'homeView',
				transition: 'backwards'
			});
		},
		async portalChange(status: boolean) {
			if (status === true) {
				this.brandHidden = true;
				this.brandVisible = false;
			} else {
				setTimeout(() => {
					this.brandHidden = false;
				}, 500);
				setTimeout(() => {
					this.brandVisible = true;
				}, 700);
			}
		}
	}
});
</script>

<style lang="postcss" src="./SiteHeader.pcss"></style>
