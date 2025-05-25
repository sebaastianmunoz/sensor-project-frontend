import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null, // El estado inicial es null cuando no hay un usuario autenticado
    sensors: [
      { id: 1, name: "Sensor 1", temperature: 23, humidity: 60 },
      { id: 2, name: "Sensor 2", temperature: 25, humidity: 55 },
    ],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    updateSensors(state, payload) {
      state.sensors = payload;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("logout");
    },
    fetchSensors({ commit }) {
      // Aquí puedes integrar llamada a backend o Firebase
      commit("updateSensors", []);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  modules: {},
});
