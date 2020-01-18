import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
			if (state.stage.name === stage.name) return;

			state.stage.transition = stage.transition || 'forwards';
			state.stage.name = stage.name;
			window.history.pushState(stage, document.title);
		}
	},
	getters: {
		midi(state) {
			return state.keyboard.type === 'midi' && state.keyboard.midi;
		}
	}
});
