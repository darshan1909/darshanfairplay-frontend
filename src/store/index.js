import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const snackbarModule = {
  namespaced: true,
  state: () => ({
    snackbar: {
      content: "",
      color: "",
      icon: "",
      isVisible: false,
    },
  }),
  mutations: {
    setSnackbar(state, payload) {
      state.snackbar = payload;
    },
    closeSnackbar(state) {
      state.snackbar.isVisible = false;
    },
  },
  getters: {
    getSnackbar: (state) => {
      return state.snackbar;
    },
  },
};
export default new Vuex.Store({
  modules: {
    snackbar: snackbarModule,
  },
});
