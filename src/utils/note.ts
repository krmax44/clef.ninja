export default interface Note {
	midiNote: number;
	octave: number;
	pitchClass?: string;
	accidental?: '#' | 'b' | boolean;
	clef?: 'treble' | 'bass';
	color?: string;
	duration?: string;
}
