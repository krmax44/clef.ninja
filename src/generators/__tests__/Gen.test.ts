import Gen from '../Gen';
import * as constants from '../../utils/noteConstants';

describe('Gen', () => {
	it('generates a random note', () => {
		const clef = Math.random() > 0.5 ? 'treble' : 'bass';
		const note = Gen.randomNote([clef]);

		expect(note.midiNote).toBeGreaterThanOrEqual(constants[clef].min);
		expect(note.midiNote).toBeLessThanOrEqual(constants[clef].max);
		expect(note.clef).toBe(clef);
	});
});
