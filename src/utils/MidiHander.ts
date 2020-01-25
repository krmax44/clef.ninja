import Houk from 'houk';

export default class MidiHandler extends Houk {
	public access: any;
	public inputs: any;
	public outputs: any;
	public state: 'none' | 'pending' | 'granted' | 'denied' = 'none';

	constructor() {
		super();
	}

	async requestAccess() {
		try {
			this.state = 'pending';

			const access = await navigator.requestMIDIAccess({
				sysex: true
			});
			const { inputs, outputs } = access;
			this.access = access;
			this.inputs = inputs;
			this.outputs = outputs;

			for (const input of inputs.values()) {
				input.addEventListener('midimessage', midiMessage => {
					const [type, note] = midiMessage.data;

					if (type === 128) {
						this.emit('noteUp', undefined, note);
					} else if (type === 144) {
						this.emit('noteDown', undefined, note);
					}

					this.emit('midiMessage', midiMessage);
				});
			}

			this.state = 'granted';
			return true;
		} catch {
			this.state = 'denied';
			return false;
		}
	}
}
