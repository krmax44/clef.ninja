import Vex from 'vexflow';
import Clef from './Clef';
import Note from './Note';
import Task from '@/tasks/Task';
const VF = Vex.Flow;

export function StaveNote(notes: Note[], clef?: Clef, color?: string) {
	clef = clef || notes[0].determineClef();

	const keys = notes.map(note => {
		return `${note.pitchClass}/${note.octave}`;
	});

	const staveNote = new VF.StaveNote({
		keys,
		clef: clef.name,
		octave_shift: clef.octaveShift,
		duration: notes[0].duration || 'q',
		auto_stem: true
	});

	notes.forEach((note, i) => {
		if (typeof note.accidental === 'string') {
			staveNote.addAccidental(i, new VF.Accidental(note.accidental));
		}
	});

	if (notes[0].color) {
		staveNote.setStyle({
			fillStyle: notes[0].color,
			strokeStyle: notes[0].color
		});
	}

	return staveNote;
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
