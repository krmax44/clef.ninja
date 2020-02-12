type Options = { [key: string]: boolean };

interface Settings {
	clefs: Options;
	tasks: Options;
	difficulty: number;
	keyLabels: boolean;
	helpText: boolean;
}

const defaultSettings: Settings = {
	clefs: {
		treble: true,
		bass: true
	},
	tasks: { singleNotes: true },
	difficulty: 1,
	keyLabels: true,
	helpText: true
};

export default defaultSettings;
