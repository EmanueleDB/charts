import Vue from "vue"
import Vuex from "vuex"
// import createPersistedState from "vuex-persistedstate"
import State from "../models/state"

Vue.use(Vuex)

const state: State = {
  testState: {},
}

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state,
  getters: {},
  mutations: {
    // testMutation(state: any: payload: something){}
  },
  actions: {
    // testAction({ commit, state }, payload) {},
  },
  modules: {},
})
