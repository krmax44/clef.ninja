import Vue from 'vue';
import Vuex from 'vuex';
import InstrumentPiano from '@/instruments/InstrumentPiano';
import InstrumentGuitar from '@/instruments/InstrumentGuitar';

Vue.use(Vuex);

const instruments = {
	piano: InstrumentPiano,
	guitar: InstrumentGuitar
};

export default new Vuex.Store({
	state: {
		stage: 'homeView',
		gamemode: '',
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
			state.stage = stage;
		},
		instrument(state, instrument: string) {
			if (Object.keys(instruments).includes(instrument)) {
				state.instrument = instruments[instrument as 'guitar' | 'piano'];
			}
		}
	},
	getters: {
		midi(state) {
			return state.keyboard.type === 'midi' && state.keyboard.midi;
		}
	}
});
