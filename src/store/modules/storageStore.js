import { storage } from '../../../firebaseConfig';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // save new file & return  & storage path
    saveNewPhoto({ rootState }, file) {
      const filePath = `${rootState.currentUser.userId}/${file.path}`;
      storage
        .ref(filePath)
        .put(file)
        .then(function (fileSnapshot) {
          fileSnapshot.ref.getDownloadURL().then((url) => {
            const imageInfo = {
              url,
              storageUri: fileSnapshot.metadata.fullPath,
            };
            return imageInfo;
          });
        });
    },

    // remove old file from storage path
    removeOldPhoto(context, path) {
      storage.ref(path).delete();
    },
  },
  getters: {},
};
