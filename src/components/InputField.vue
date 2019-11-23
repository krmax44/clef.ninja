<template>
	<input
		type="text"
		v-bind="$attrs"
		@input="$emit('input', $event.target.value)"
		v-on="delete $listeners.input && $listeners"
	/>
</template>

<style lang="scss" scoped>
input {
	padding: 1em;
	font-size: 1em;
	color: #262626;
	border-radius: 50px;
	border: 1px transparentize(#262626, 0.7) solid;
	box-shadow: 0 2px 6px transparentize(#262626, 0.9);
	text-align: center;
}
</style>
