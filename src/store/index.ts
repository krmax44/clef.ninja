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
		stage: {
			name: 'homeView',
			transition: 'forwards'
		},
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
			return state.keyboard.type === 'midi' && state.keyboard.midi;
		}
	}
});
