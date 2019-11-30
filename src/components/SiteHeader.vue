<template>
	<header class="flex flex-row items-center">
		<img
			src="../assets/images/logo.svg"
			class="h-24 self-start cursor-pointer"
			@click="$store.commit('stage', 0)"
		/>
		<h1 class="text-4xl ml-4 cursor-pointer" @click="$store.commit('stage', 0)">
			<span class="font-bold">clef</span>
			<span class="text-gray-800">.ninja</span>
		</h1>
	</header>
</template>
