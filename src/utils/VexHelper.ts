import Vex from 'vexflow';
import Clef from './Clef';
import Note from './Note';
import Task from '@/tasks/Task';
import { treble } from './noteConstants';
const VF = Vex.Flow;

export function StaveNote(
	notes: Note[],
	clef?: Clef,
	autoStem = true,
	notesBefore?: Note[]
) {
	clef = clef || notes[0].determineClef();

	const keys = notes.map(note => {
		return `${note.pitchClass}/${note.octave}`;
	});

	const staveNote = new VF.StaveNote({
		keys,
		clef: clef.name,
		octave_shift: clef.octaveShift,
		duration: notes[0].duration || 'q',
		auto_stem: autoStem
	});

	notes.forEach(({ accidental, color, pitchClass }, i) => {
		if (notesBefore) {
			const renderedAccidental = notesBefore.reduce((a, n) => {
				if (n.pitchClass[0] === pitchClass[0] && n.accidental === accidental)
					return false;
				else if (
					n.pitchClass[0] === pitchClass[0] &&
					n.accidental !== accidental
				) {
					return accidental || 'n';
				}
				return a;
			}, accidental);

			if (renderedAccidental)
				staveNote.addAccidental(i, new VF.Accidental(renderedAccidental));
		} else if (typeof accidental === 'string') {
			staveNote.addAccidental(i, new VF.Accidental(accidental));
		}

		staveNote.setKeyStyle(i, { fillStyle: color, strokeStyle: color });
	});

	if (notes.length === 0) {
		const { color } = notes[0];
		staveNote.setStyle({ fillStyle: color, strokeStyle: color });
	}

	return staveNote;
}

export function StaveRest(
	duration: string,
	clef = treble,
	key = clef === treble ? 'b/4' : 'd/3',
	autoStem = true
) {
	return new VF.StaveNote({
		keys: [key],
		clef: clef.name,
		octave_shift: clef.octaveShift,
		duration: duration + 'r',
		auto_stem: autoStem
	});
}

export function Renderer(this: Task, width = 150) {
	[...this.target.children].forEach(c => c.remove());

	const staveNotes = this.staveNotes();

	const renderer = new VF.Renderer(this.target, VF.Renderer.Backends.SVG);

	renderer.resize(width, 150);
	const context = renderer.getContext();

	const stave = new VF.Stave(0, 10, width);
	stave.addClef(this.clef.name, undefined, this.clef.annotation);

	stave.setContext(context).draw();

	const beams = VF.Beam.generateBeams(staveNotes);

	VF.Formatter.FormatAndDraw(context, stave, staveNotes);

	beams.forEach(t => t.setContext(context).draw());
}
