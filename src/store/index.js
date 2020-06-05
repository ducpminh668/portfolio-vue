import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: true,
    isActive: false,
    isMobile: false,
    isToggle: false,
    showDetail: false,
  },
  mutations: {
    checkLoading(state, n) {
      state.isLoading = n;
    },
    checkActive(state) {
      state.isActive = !state.isActive;
    },
    isMobile(state, n) {
      state.isMobile = n;
    },
    isToggle(state) {
      state.isToggle = !state.isToggle;
    },
    setToggle(state, n) {
      state.isToggle = n;
    },
    showDetail(state) {
      state.showDetail = !state.showDetail;
    },
  },
  actions: {
  },
  modules: {
  },
});
