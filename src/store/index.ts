import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import InstrumentPiano from '@/instruments/InstrumentPiano';
import InstrumentGuitar from '@/instruments/InstrumentGuitar';
import MidiHandler from '@/utils/MidiHandler';
import Instrument from '@/instruments/Instrument';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<State>({
	reducer: ({ keyboard, instrument }) => ({ keyboard, instrument })
});

const instruments = {
	piano: InstrumentPiano,
	guitar: InstrumentGuitar
};

interface State {
	stage: {
		name: 'homeView' | 'settingsView' | 'gamePlay';
		transition: 'forwards' | 'backwards';
	};
	gamemode?: 'training' | 'arcade';
	keyboard: {
		type: 'virtual' | 'midi';
		midi?: MidiHandler;
	};
	instrument: Instrument;
}

const store = new Vuex.Store<State>({
	state: {
		stage: {
			name: 'homeView',
			transition: 'forwards'
		},
		gamemode: undefined,
		keyboard: {
			type: 'virtual',
			midi: undefined
		},
		instrument: InstrumentPiano
	},
	mutations: {
		gamemode(state, gamemode) {
			state.gamemode = gamemode;
		},
		keyboard(state, keyboard) {
			state.keyboard = keyboard;
		},
		stage(state, stage) {
			if (state.stage.name === stage.name) return;

			state.stage.transition = stage.transition || 'forwards';
			state.stage.name = stage.name;
			window.history.pushState(stage, document.title);
		},
		instrument(state, instrument: string) {
			if (Object.keys(instruments).includes(instrument)) {
				state.instrument = instruments[instrument as 'guitar' | 'piano'];
			}
		}
	},
	getters: {
		midi(state) {
			return state.keyboard.midi?.state && state.keyboard.midi;
		},
		midiState(state) {
			return state.keyboard.midi?.state || 'none';
		}
	},
	plugins: [vuexLocal.plugin]
});

(async () => {
	if (store.state.keyboard.type === 'midi') {
		store.state.keyboard.midi = new MidiHandler();
		const access = store.state.keyboard.midi.requestAccess();
		if (!access) store.state.keyboard.type = 'virtual';
	}
})();

export default store;
