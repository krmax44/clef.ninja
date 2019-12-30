import RandomMusic from './RandomMusic';
import { clefs as CLEFS } from '../utils/noteConstants';

export default class RandomNote extends RandomMusic {
	constructor(clefs = CLEFS) {
		super();
		const note = RandomMusic.randomNote(clefs);
		this.notes = [note];
		this.clef = note.clef as 'treble' | 'bass';
	}

	check(input: number) {
		return input === this.notes[0].midiNote;
	}

	public staveNotes = super.staveNotes;
	public render = super.render;
	public ties = super.ties;
}
