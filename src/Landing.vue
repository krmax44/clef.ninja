<template>
	<div class="min-h-screen flex flex-col container mx-auto">
		<div class="flex flex-1 px-4">
			<div class="lg:w-8/12 pt-12 md:pt-24">
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
						<!-- <a class="btn-cta" href="app/">Let's play!</a> -->
						<span class="text-italic text-gray-700">
							Currently under development - coming soon...
						</span>
					</div>
				</main>
			</div>

			<div class="w-4/12 items-center justify-center hidden lg:flex pl-16">
				<div class="rounded overflow-hidden shadow-lg">
					<img
						class="w-auto max-h-3/4-screen"
						src="./assets/images/hero_home_portrait.jpg"
						alt="Person playing piano"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import GamepadIcon from 'vue-material-design-icons/GamepadSquareOutline';
import PianoIcon from 'vue-material-design-icons/Piano';
import GiftIcon from 'vue-material-design-icons/GiftOutline';
import HeartIcon from 'vue-material-design-icons/HeartOutline';

import SiteHeader from './components/SiteHeader';

export default {
	components: { GamepadIcon, PianoIcon, GiftIcon, HeartIcon, SiteHeader }
};
</script>

<style lang="postcss">
@import './assets/styles/app.css';

.center {
	@apply flex flex-col justify-center items-center;
}

.btn-cta {
	@apply bg-brand-blue text-white text-xl py-2 px-16 rounded inline-flex items-center;
	transition: background-color 0.3s;
}

.btn-cta:hover {
	@apply bg-brand-red;
}
</style>
