export type ClefName = 'treble' | 'bass' | 'treble-8vb';
export type ClefAnnotation = '8va' | '8vb';

const annotations = {
	'8va': 1,
	'8vb': -1
};

export default class Clef {
	constructor(
		public name: ClefName,
		public min: number,
		public max: number,
		public annotation?: ClefAnnotation
	) {}

	get octaveShift() {
		return this.annotation ? annotations[this.annotation] : 0;
	}
}
