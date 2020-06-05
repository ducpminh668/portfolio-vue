import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
import { VueHammer } from 'vue2-hammer';
import App from './App.vue';
import router from './router';
import store from './store';
import './directives/directives';
import '@/assets/scss/general.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

Vue.use(VueScrollTo, {
  container: 'body',
  easing: 'ease-in-out',
  offset: store.state.isMobile ? -200 : -70,
});

Vue.use(VueHammer);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
