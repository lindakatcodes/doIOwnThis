import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from '../services/firebaseConfig'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {}
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = {
        userName: val.displayName,
        userId: val.uid
      }
    },
    unsetCurrentUser(state) {
      state.currentUser = {}
    }
  },
  actions: {},
  modules: {}
})
