import { midiToGuitarNote } from '../InstrumentGuitar';

describe('InstrumentGuitar', () => {
	it('finds the guitar note', () => {
		const note = 41; // F2
		const guitarNote = midiToGuitarNote(note);

		expect(guitarNote).not.toBe(undefined);
		expect(guitarNote!.note).toBe(note);
		expect(guitarNote!.fret).toBe(1);
		expect(guitarNote!.string).toBe(5);
	});
});
