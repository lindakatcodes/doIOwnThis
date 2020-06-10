import Vue from 'vue';
import Vuex from 'vuex';
import dbStore from './modules/dbStore';
import storageStore from './modules/storageStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dbStore,
    storageStore,
  },
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
  getters: {},
});
