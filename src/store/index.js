import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'122',
    Authorization:''
  },
  mutations: {
    SET_TOKEN(state, val) {
      state.token = val
    },
    Authorization(state, val) {
      state.Authorization = val
    },
  },
  actions: {
  },
  modules: {
  }
})
