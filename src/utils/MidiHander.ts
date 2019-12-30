import Houk from 'houk';

export default class MidiHandler extends Houk {
	public access: any;
	public inputs: any;
	public outputs: any;

	constructor() {
		super();
	}

	async requestAccess() {
		try {
			const access = await (navigator as any).requestMIDIAccess({
				sysex: true
			});
			const { inputs, outputs } = access;
			this.access = access;
			this.inputs = inputs;
			this.outputs = outputs;

			for (const input of inputs.values()) {
				input.onmidimessage = (midiMessage: any) => {
					const [type, note] = midiMessage.data;

					if (type === 128) {
						this.emit('noteUp', undefined, note);
					} else if (type === 144) {
						this.emit('noteDown', undefined, note);
					}

					this.emit('midiMessage', midiMessage);
				};
			}

			return true;
		} catch {
			return false;
		}
	}
}
