import { db, timestamp } from '../../../firebaseConfig';

export default {
  namespaced: true,
  state: {
    allSwatches: [],
    filteredSwatches: [],
    noFilter: true,
    loading: '',
  },
  mutations: {
    // populate allSwatches
    BUILD_SWATCHES(state, swatches) {
      state.allSwatches = swatches;
    },
    // when signed out, clear allSwatches
    CLEAR_SWATCHES(state) {
      state.allSwatches = [];
      state.filteredSwatches = [];
    },
    // populate filtered swatch list
    BUILD_FILTERED_SWATCHES(state, swatches) {
      state.filteredSwatches = swatches;
      state.noFilter = false;
    },
    CLEAR_FILTER_RESULTS(state) {
      state.filteredSwatches = [];
      state.noFilter = true;
    },
    LOADING_STATE(state, value) {
      state.loading = value;
    },
  },
  actions: {
    // get allSwatches
    getAllSwatches({ state, commit, rootState }) {
      if (state.allSwatches.length === 0) {
        commit('LOADING_STATE', true);

        const buildSwatches = [];

        db.collection('nailPolish')
          .where('addedBy', '==', rootState.currentUser.userId)
          .orderBy('lastUpdated', 'desc')
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              const currSwatch = doc.data();
              currSwatch.id = doc.id;
              buildSwatches.push(currSwatch);
            });
          })
          .then(() => {
            commit('BUILD_SWATCHES', buildSwatches);
            commit('LOADING_STATE', false);
          });
      }
    },
    // search allSwatches for provided term
    async searchSwatches({ commit, dispatch, rootState }, payload) {
      commit('LOADING_STATE', true);

      const results = [];
      const prop = payload[0];
      const option = await dispatch('titleCase', payload[1]);

      db.collection('nailPolish')
        .where('addedBy', '==', rootState.currentUser.userId)
        .where(prop, '==', option)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const currSwatch = doc.data();
            currSwatch.id = doc.id;
            results.push(currSwatch);
          });
        })
        .then(() => {
          commit('BUILD_FILTERED_SWATCHES', results);
          commit('LOADING_STATE', false);
        });
    },
    // clear search results & go back to view all
    clearFilteredResults({ commit }) {
      commit('CLEAR_FILTER_RESULTS');
    },
    // view data on a single swatch
    async getSingleSwatch({ commit }, id) {
      commit('LOADING_STATE', true);

      let singleDoc = '';

      await db
        .collection('nailPolish')
        .doc(id)
        .get()
        .then(function (docSnapshot) {
          singleDoc = docSnapshot.data();
        });

      commit('LOADING_STATE', false);
      return singleDoc;
    },
    // add new single swatch
    addNewSwatch({ rootState }, singleSwatch) {
      db.collection('nailPolish')
        .add({
          name: singleSwatch.name,
          brand: singleSwatch.brand,
          subBrand: singleSwatch.subBrand,
          colorGroup: singleSwatch.colorGroup,
          finish: singleSwatch.finish,
          image: singleSwatch.image,
          storageUri: singleSwatch.storageUri,
          lastUpdated: timestamp,
          addedBy: rootState.currentUser.userId,
        })
        .then(function (docRef) {
          singleSwatch.id = docRef.id;
        });
    },
    // update single swatch with edit form data
    updateExistingSwatch(context, updatedSwatch) {
      db.collection('nailPolish').doc(updatedSwatch.id).update({
        name: updatedSwatch.name,
        brand: updatedSwatch.brand,
        subBrand: updatedSwatch.subBrand,
        colorGroup: updatedSwatch.colorGroup,
        finish: updatedSwatch.finish,
        image: updatedSwatch.image,
        storageUri: updatedSwatch.storageUri,
        lastUpdated: timestamp,
      });
    },
    // delete single swatch
    removeSingleSwatch(context, id) {
      db.collection('nailPolish').doc(id).delete();
    },
    titleCase(context, str) {
      const originalArray = str.split(' ');
      const casedResult = [];
      originalArray.forEach((word) => {
        const first = word.charAt(0).toUpperCase();
        const rest = word.slice(1).toLowerCase();
        casedResult.push(first.concat(rest));
      });
      return casedResult.join(' ');
    },
  },
  getters: {},
};
