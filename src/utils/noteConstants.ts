import { Clef, Accidental } from './types';

export const treble = {
	min: 55, // G3
	max: 83 // B5
};

export const bass = {
	min: 36, // C2
	max: 65 // F4
};

export const clefs: Clef[] = ['treble', 'bass'];

export const accidentals: Accidental[] = ['#', 'b'];
