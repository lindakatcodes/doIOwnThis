import Vue from 'vue';
import Vuex from 'vuex';
// import firebase from '../services/firebaseConfig'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {},
    signedIn: false,
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = {
        userName: val.displayName,
        userId: val.uid,
      };
      state.signedIn = true;
    },
    unsetCurrentUser(state) {
      state.currentUser = {};
      state.signedIn = false;
    },
  },
  actions: {},
  modules: {},
});
