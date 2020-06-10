import { db, timestamp } from '../../../firebaseConfig';

export default {
  namespaced: true,
  state: {
    allSwatches: [],
    filteredSwatches: [],
  },
  mutations: {
    // populate allSwatches
    BUILD_SWATCHES(state, swatches) {
      state.allSwatches = swatches;
    },
    // add new item to allSwatches
    ADD_NEW_SWATCH(state, newSwatch) {
      state.allSwatches.unshift(newSwatch);
    },
    // update single swatch in allSwatches
    UPDATE_SWATCH(state, singleSwatch) {
      const updatedSwatchIndex = state.allSwatches.findIndex((swatch) => swatch.id === singleSwatch.id);
      state.allSwatches.splice(updatedSwatchIndex, 1, singleSwatch);
    },
    // remove deleted swatch from allSwatches
    REMOVE_SWATCH(state, swatchId) {
      const singleSwatchIndex = state.allSwatches.findIndex((swatch) => swatch.id === swatchId);
      state.allSwatches.splice(singleSwatchIndex, 1);
    },
    // when signed out, clear allSwatches
    CLEAR_SWATCHES(state) {
      state.allSwatches = [];
      state.filteredSwatches = [];
    },
    // populate filtered swatch list
    BUILD_FILTERED_SWATCHES(state, swatches) {
      state.filteredSwatches = swatches;
    },
  },
  actions: {
    // get allSwatches
    getAllSwatches({ commit, rootState }) {
      commit('CLEAR_SWATCHES');
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
        });
    },
    // search allSwatches for provided term
    searchSwatches({ commit, rootState }, searchProp, searchTerm) {
      const results = [];

      db.collection('nailPolish')
        .where('addedBy', '==', rootState.currentUser.userId)
        .where(searchProp, '==', searchTerm)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const currSwatch = doc.data();
            currSwatch.id = doc.id;
            results.push(currSwatch);
          });
        });
      commit('BUILD_FILTERED_SWATCHES', results);
    },

    // add new single swatch
    addNewSwatch({ commit, rootState }, singleSwatch) {
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
        })
        .then(() => {
          commit('ADD_NEW_SWATCH', singleSwatch);
        });
    },
    // update single swatch with edit form data
    updateExistingSwatch({ commit }, updatedSwatch) {
      db.collection('nailPolish').update({
        name: updatedSwatch.name,
        brand: updatedSwatch.brand,
        subBrand: updatedSwatch.subBrand,
        colorGroup: updatedSwatch.colorGroup,
        finish: updatedSwatch.finish,
        image: updatedSwatch.image,
        storageUri: updatedSwatch.storageUri,
        lastUpdated: timestamp,
      });
      commit('UPDATE_SWATCH', updatedSwatch);
    },
    // delete single swatch
    removeSingleSwatch({ commit }, id) {
      db.collection('nailPolish')
        .doc(id)
        .delete()
        .then(() => {
          commit('REMOVE_SWATCH', id);
        });
    },
  },
  getters: {
    // get single swatch details
    getSingleSwatch: (state) => (id) => state.allSwatches.find((swatch) => swatch.id === id),
  },
};
