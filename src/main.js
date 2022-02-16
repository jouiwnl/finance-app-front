import Vue from 'vue'
import App from './App.vue'
window.$ = window.jQuery = require('jquery');
import 'jquery';
window.tata = require('tata-js');
import 'tata-js';

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')