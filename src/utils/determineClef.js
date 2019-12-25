import * as constants from './noteConstants';

export default function(midiNote, clefs = constants.clefs) {
	const viable = clefs.filter(
		clef => constants[clef].min <= midiNote && midiNote <= constants[clef].max
	);

	return viable[Math.floor(Math.random() * viable.length)];
}
