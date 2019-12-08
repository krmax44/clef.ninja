<template>
	<div class="flex justify-center mb-8">
		<div class="card-container">
			<div class="card flex justify-center cursor-auto">
				<div ref="paper" class="paper" />
			</div>
		</div>
	</div>
</template>

<script>
import { Renderer } from 'vexflow/src/renderer';
import { Stave } from 'vexflow/src/stave';
import { Voice } from 'vexflow/src/voice';
import { Formatter } from 'vexflow/src/formatter';
import staveNote from '../utils/staveNote';

export default {
	props: ['notes'],
	mounted() {
		this.render(this.notes);
	},
	methods: {
		render(notes) {
			const div = this.$refs.paper;
			[...div.children].forEach(c => c.remove());

			const renderer = new Renderer(div, Renderer.Backends.SVG);

			renderer.resize(150, 300);
			const context = renderer.getContext();

			const stave = new Stave(0, 40, 100, 100);

			stave.addClef(notes[0].clef);

			stave.setContext(context).draw();

			const staveNotes = staveNote(notes);
			const voice = new Voice({ num_beats: staveNotes.length, beat_value: 4 });
			voice.addTickables(staveNotes);

			new Formatter().joinVoices([voice]).format([voice], 60);

			context.scale(1.5, 1.5);
			voice.draw(context, stave);
		}
	}
};
</script>

<style lang="postcss" scoped>
.paper >>> svg {
	max-height: 30vh;
}
</style>
