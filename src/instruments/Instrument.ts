import { Clef } from '@/utils/types';

export default interface Instrument {
	name: string;
	clefs: Clef[];

	constants: {
		[clef in Clef]: {
			min: number;
			max: number;
		};
	};
}
