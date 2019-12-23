import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		stage: 'homeView',
		gamemode: '',
		keyboard: {
			type: 'virtual',
			midi: undefined
		}
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
		}
	},
	getters: {
		midi(state) {
			return state.keyboard.type === 'midi' && state.keyboard.midi;
		}
	}
});
