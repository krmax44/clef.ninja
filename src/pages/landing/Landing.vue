<template>
	<div class="min-h-screen flex flex-col container mx-auto">
		<div class="flex flex-1">
			<div class="lg:w-8/12 pt-8 md:pt-12 px-4">
				<SiteHeader />

				<main class="pt-12 md:pt-24">
					<h2 class="text-3xl">
						Train reading music the
						<span class="text-brand-blue">fun</span> way.
					</h2>

					<div class="flex flex-wrap py-8">
						<div class="card-container">
							<div class="card">
								<div class="card-inner">
									<GamepadIcon />

									<h3>Learn By Playing</h3>
									<p class="text-gray-700 text-base">
										A random note in a random clef will be shown to you, which
										you have to recognize and enter correctly. In Arcade Mode,
										you have 60 seconds to get as many hits as possible. Don't
										feel ready yet? You can up your skills in Training Mode.
									</p>
								</div>
							</div>
						</div>

						<div class="card-container">
							<div class="card">
								<div class="card-inner">
									<PianoIcon />

									<h3>Connect Your Keyboard</h3>
									<p>
										Using MIDI, you can connect your keyboard to your computer
										and use it to input the correct notes! Unfortunately, this
										feature only works in Chromium-based browsers.
									</p>
								</div>
							</div>
						</div>

						<div class="card-container">
							<div class="card">
								<div class="card-inner">
									<GiftIcon />

									<h3>Completely Free With No Ads</h3>
									<p>
										This site is free to use, doesn't spy on you or serves you
										ads. You're welcome!
									</p>
								</div>
							</div>
						</div>

						<div class="card-container">
							<div class="card">
								<div class="card-inner">
									<HeartIcon />

									<h3>Open-Source Software</h3>
									<p>
										Are you missing a feature or encountering a nasty bug? Feel
										free to contribute to the code on
										<a href="https://github.com/krmax44/clef.ninja">Github</a>.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div class="py-4">
						<a class="btn btn-red" href="app/">Let's jam!</a>
					</div>
				</main>
			</div>

			<div class="w-4/12 items-center justify-center hidden lg:flex pl-16">
				<div class="rounded overflow-hidden shadow-lg">
					<img
						class="w-auto max-h-3/4-screen"
						src="@/assets/images/reading-music.jpg"
						alt="Person playing piano"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import GamepadIcon from 'vue-material-design-icons/GamepadSquareOutline.vue';
import PianoIcon from 'vue-material-design-icons/Piano.vue';
import GiftIcon from 'vue-material-design-icons/GiftOutline.vue';
import HeartIcon from 'vue-material-design-icons/HeartOutline.vue';

import SiteHeader from '@/components/SiteHeader.vue';

export default {
	components: { GamepadIcon, PianoIcon, GiftIcon, HeartIcon, SiteHeader }
};
</script>

<style lang="postcss">
@import '~@/assets/styles/app.css';

.center {
	@apply flex flex-col justify-center items-center;
}

@screen md {
	.card-container {
		@apply w-1/2 px-2;
	}

	.card-container:nth-child(2n) {
		@apply pr-0;
	}

	.card-container:nth-child(2n + 1) {
		@apply pl-0;
	}
}

.btn-blue {
	@apply text-xl px-16;
}

.btn-blue:hover {
	@apply bg-brand-red;
}
</style>
