import Clef from './Clef';

export const accidentals = ['#', 'b'];

export const treble = new Clef('treble', 55, 83); // G3 - B5
export const bass = new Clef('bass', 36, 65); // C2 - F4
export const treblevb8 = new Clef('treble', 43, 71, '8vb');

export const clefs: Clef[] = [treble, bass, treblevb8];
export const clefIds = clefs.map(c => c.id);
