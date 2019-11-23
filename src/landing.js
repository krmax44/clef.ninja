import Vue from 'vue';
import Landing from './Landing.vue';

Vue.config.productionTip = false;

new Vue({
	render: h => h(Landing)
}).$mount('#app');
