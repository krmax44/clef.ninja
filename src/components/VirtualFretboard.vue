<template>
	<div class="fretboard">
		<div
			class="fret"
			v-for="(fret, i) in frets"
			:key="i"
			:style="{ width: `${fret}%` }"
		>
			<div class="string" v-for="(string, k) in new Array(6)" :key="k" />
			<div class="dots">
				<div class="dot" v-if="[3, 7, 9, 12, 15, 17].includes(20 - i)" />
				<div class="dot" v-if="20 - i === 12" />
			</div>
		</div>
	</div>
</template>

<script>
const FRETS = [8, 8, 7, 7, 6, 6, 6, 6, 5, 5, 5, 4, 4, 4, 4, 4, 3, 3, 3, 2];
export default {
	data() {
		return {
			frets: FRETS
		};
	}
};
</script>

<style lang="postcss" scoped>
.fretboard {
	margin-left: 50%;
	transform: translateX(-50%);
	transition: opacity 0.5s;
	box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1),
		0 -2px 4px -1px rgba(0, 0, 0, 0.06);
	@apply flex w-screen overflow-x-auto;

	&.disabled {
		opacity: 0.7;
	}

	& > .fret {
		min-width: 50px;
		height: 300px;
		z-index: -1;
		@apply flex flex-col justify-around py-2 border-gray-300 border-r-2 w-full relative;

		&:first-of-type {
			border-left-width: 14px;
			border-left-color: #718096;
		}

		&:last-of-type {
			@apply border-r-0;
		}
	}

	& .string {
		margin: 0 -2px;
		width: calc(100% + 2px);
		@apply border-gray-600 border-b-4 z-10;
	}

	& .dots {
		top: 15%;
		bottom: 15%;
		@apply flex flex-col justify-around items-center absolute inset-x-0 py-2;
	}

	& .dot {
		@apply rounded-full h-4 w-4 bg-gray-200;
	}
}
</style>
