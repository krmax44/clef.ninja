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

		<portal-target name="header-right" class="flex ml-auto" />
	</header>
</template>
