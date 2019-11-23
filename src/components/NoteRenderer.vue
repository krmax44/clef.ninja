<template>
	<div ref="paper" />
</template>

<script>
import { Flow } from 'vexflow';
const { Renderer, Stave, Voice, Formatter } = Flow;

export default {
	props: ['note'],
	mounted() {
		this.renderNote();
	},
	methods: {
		renderNote() {
			const div = this.$refs.paper;
			[...div.children].forEach(c => c.remove());

			const renderer = new Renderer(div, Renderer.Backends.SVG);

			renderer.resize(150, 300);
			const context = renderer.getContext();

			const stave = new Stave(0, 40, 100, 100);

			stave.addClef(this.note.clef);

			stave.setContext(context).draw();

			const notes = [this.note];

			const voice = new Voice({ num_beats: 1, beat_value: 4 });
			voice.addTickables(notes);

			new Formatter().joinVoices([voice]).format([voice], 100);

			context.scale(1.5, 1.5);
			voice.draw(context, stave);
		}
	},
	watch: {
		note() {
			this.renderNote();
		}
	}
};
</script>
