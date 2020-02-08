import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import InstrumentPiano from '@/instruments/InstrumentPiano';
import InstrumentGuitar from '@/instruments/InstrumentGuitar';
import MidiHandler from '@/utils/MidiHandler';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<State>({
	reducer: ({ keyboard, instrument }) => ({ keyboard, instrument })
});

const instruments = {
	piano: InstrumentPiano,
	guitar: InstrumentGuitar
};

export interface State {
	stage: {
		name: 'homeView' | 'settingsView' | 'gamePlay';
		transition: 'forwards' | 'backwards';
	};
	gamemode?: 'training' | 'arcade';
	keyboard: {
		type: 'virtual' | 'midi';
		midi?: MidiHandler;
	};
	instrument: string;
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
		instrument: 'piano'
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

			window.scrollTo({
				behavior: 'smooth',
				top: 0
			});

			state.stage.transition = stage.transition || 'forwards';
			state.stage.name = stage.name;
			window.history.pushState(stage, document.title);
		},
		instrument(state, instrument: string) {
			state.instrument = instrument;
		}
	},
	getters: {
		midi(state) {
			return state.keyboard.midi?.state && state.keyboard.midi;
		},
		midiState(state) {
			return state.keyboard.midi?.state || 'none';
		},
		instrument(state) {
			return (
				instruments[state.instrument as 'piano' | 'guitar'] || InstrumentPiano
			);
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
