import midiToNote from '../utils/midiToNote';
import determineClef from '../utils/determineClef';
import * as constants from '../utils/noteConstants';
import Note from '../utils/note';

import Vex from 'vexflow';
const { Renderer, Stave, Voice, Formatter, StaveNote, Accidental } = Vex.Flow;

export default abstract class RandomMusic {
	public notes: Note[];
	public clef: 'treble' | 'bass';

	constructor() {
		this.notes = [];
		this.clef = 'treble';
	}

	public staveNotes() {
		return this.notes.map((note, i) => {
			const { pitchClass, octave, clef, accidental, color } = note;

			const staveNote = new StaveNote({
				keys: [`${pitchClass}/${octave}`],
				clef,
				duration: 'q'
			});

			if (typeof accidental === 'string') {
				staveNote.addAccidental(i, new Accidental(accidental));
			}

			if (color) {
				staveNote.setStyle({ fillStyle: color, strokeStyle: color });
			}

			return staveNote;
		});
	}

	public render(target: HTMLElement) {
		const staveNotes = this.staveNotes();

		const renderer = new Renderer(target, Renderer.Backends.SVG);

		renderer.resize(150, 300);
		const context = renderer.getContext();

		const stave = new Stave(0, 40, 150);
		stave.addClef(this.clef);

		stave.setContext(context).draw();

		const voice = new Voice({ num_beats: staveNotes.length, beat_value: 4 });
		voice.addTickables(staveNotes);

		new Formatter().joinVoices([voice]).format([voice], 60);

		const ties = this.ties();
		ties.forEach(t => t.setContext(context).draw());

		context.scale(1.5, 1.5);
		voice.draw(context, stave);
	}

	public ties(): Vex.Flow.StaveTie[] {
		return [];
	}

	public static randomNote(
		clefs = constants.clefs,
		minOffset = 0,
		maxOffset = 0
	): Note {
		const mins = clefs.map(clef => constants[clef].min);
		const maxs = clefs.map(clef => constants[clef].max);

		const MIN = Math.min(...mins) + minOffset;
		const MAX = Math.max(...maxs) - maxOffset;

		const midiNote = Math.floor(Math.random() * (MAX - MIN)) + MIN;
		const { pitchClass, octave, accidental } = midiToNote(
			midiNote,
			Math.random() < 0.5 ? '#' : 'b'
		);

		const clef = determineClef(midiNote, clefs);

		return { midiNote, pitchClass, octave, accidental, clef };
	}
}
