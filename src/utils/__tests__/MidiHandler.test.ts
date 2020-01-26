import MidiHandler from '../MidiHandler';

type HandlerFn = (m: WebMidi.MIDIMessageEvent) => void;
describe('MidiHandler', () => {
	let handler: HandlerFn;

	const source = {
		values: jest.fn().mockImplementation(() => [
			{
				addEventListener: jest
					.fn()
					.mockImplementation((_eventName: string, h: HandlerFn) => {
						handler = h;
					})
			}
		])
	};

	Object.defineProperty(navigator, 'requestMIDIAccess', {
		value: () =>
			Promise.resolve({
				inputs: source,
				outputs: source
			})
	});

	test('listens to events', async () => {
		const midi = new MidiHandler();
		await midi.requestAccess();

		const listenerUp = jest.fn();
		const listenerDown = jest.fn();

		midi.on('noteUp', listenerUp);
		midi.on('noteDown', listenerDown);

		// noteUp C4
		handler({
			data: new Uint8Array([128, 60, 0])
		} as any);

		// noteDown D4
		handler({
			data: new Uint8Array([144, 62, 0])
		} as any);

		expect(midi.state).toBe('granted');
		expect(listenerUp.mock.calls[0][0]).toBe(60);
		expect(listenerDown.mock.calls[0][0]).toBe(62);
	});
});
