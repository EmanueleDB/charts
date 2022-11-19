import { createStore } from 'vuex'
import State from '../models/state'

const state: State = {
  testState: {},
}

export default createStore({
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
