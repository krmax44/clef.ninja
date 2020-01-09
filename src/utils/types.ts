export interface Note {
	midiNote: number;
	octave: number;
	pitchClass?: string;
	accidental?: Accidental | false;
	clef?: Clef;
	color?: string;
	duration?: string;
}

export type Clef = 'treble' | 'bass';

export type Accidental = '#' | 'b';
