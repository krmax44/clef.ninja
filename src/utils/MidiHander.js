import { Houk } from 'houk';

export default class MidiHandler extends Houk {
	constructor() {
		super();
	}

	async requestAccess() {
		try {
			const access = await navigator.requestMIDIAccess({ sysex: true });
			const { inputs, outputs } = access;
			this.access = access;
			this.inputs = inputs;
			this.outputs = outputs;

			for (const input of inputs.values()) {
				input.onmidimessage = midiMessage => {
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
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}
