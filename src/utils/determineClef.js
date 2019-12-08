const B = 'bass';
const T = 'treble';

export default function(midiNote) {
	if (midiNote < 55) {
		return B;
	} else if (midiNote > 65) {
		return T;
	} else {
		return Math.random() > 0.5 ? B : T;
	}
}
