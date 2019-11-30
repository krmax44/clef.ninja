import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const stages = ['gamemodeSelector', 'keyboardSetup', 'game'];

export default new Vuex.Store({
	state: {
		stage: 'gamemodeSelector',
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
		nextStage(state) {
			const currentStage = stages.indexOf(state.stage);
			state.stage = stages[currentStage + 1];
		},
		stage(state, stage) {
			state.stage = stages[stage];
		}
	}
});
