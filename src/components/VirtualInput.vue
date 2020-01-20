<template>
	<component
		:is="$store.state.instrument.name"
		v-bind="$attrs"
		v-on="$listeners"
	/>
</template>

<script lang="ts">
import Vue from 'vue';

import piano from './VirtualKeyboard.vue';
import guitar from './VirtualFretboard.vue';

export default Vue.extend({
	components: { piano, guitar }
});
</script>
