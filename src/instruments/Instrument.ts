import Clef from '@/utils/Clef';

export default interface Instrument {
	name: string;
	clefs: Clef[];
	highestNote: number;
	lowestNote: number;
}
