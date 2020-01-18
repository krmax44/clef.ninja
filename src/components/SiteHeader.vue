<template>
	<header class="flex flex-row items-center overflow-hidden">
		<img
			src="../assets/images/logo.svg"
			class="h-16 self-start cursor-pointer"
			@click="home()"
			alt="clef.ninja Logo"
		/>
		<h1
			class="brand"
			:class="{ 'hidden lg:block': brandHidden, visible: brandVisible }"
			@click="home()"
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
			// TODO: vuex + ts
			(this as any).$store.commit('stage', {
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

<style lang="postcss">
.brand {
	width: 100%;
	transition: opacity 0.3s;
	opacity: 0;
	@apply text-4xl ml-4 cursor-pointer w-auto;

	&.visible {
		opacity: 1;
	}
}

@screen lg {
	.brand {
		opacity: 1;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
