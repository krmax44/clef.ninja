import * as constants from './noteConstants';

export default function(
	midiNote: number,
	clefs: ('treble' | 'bass')[] = constants.clefs
): 'treble' | 'bass' {
	const viable = clefs.filter(
		clef => constants[clef].min <= midiNote && midiNote <= constants[clef].max
	);

	return viable[Math.floor(Math.random() * viable.length)];
}
