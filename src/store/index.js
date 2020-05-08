import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from '../services/firebaseConfig'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    }
  },
  actions: {
  },
  modules: {
  }
})
