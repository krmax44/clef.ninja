import * as constants from './noteConstants';
import { Clef } from './types';

export default function(
	midiNote: number,
	clefs: Clef[] = constants.clefs
): Clef {
	const viable = clefs.filter(
		clef => constants[clef].min <= midiNote && midiNote <= constants[clef].max
	);

	return viable[Math.floor(Math.random() * viable.length)];
}
