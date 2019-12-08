// modified from @tonaljs/midi

const S = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
const F = ['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb', 'b'];
const ACCIDENTALS = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

export default function(midi, accidentals = '#') {
	const notes = accidentals === '#' ? S : F;
	const step = midi % 12;
	const pitchClass = notes[step];
	const octave = Math.floor(midi / 12) - 1;
	const accidental = ACCIDENTALS[step] === 0 ? false : accidentals; // false || # || b

	return { pitchClass, octave, accidental };
}
