import { storage } from '../../../firebaseConfig';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // save new file & return url & storage path
    saveNewPhoto({ rootState }, file) {
      const imageData = {};
      const filePath = `${rootState.currentUser.userId}/${file.name}`;
      storage
        .ref(filePath)
        .put(file)
        .then(function (fileSnapshot) {
          return fileSnapshot.ref.getDownloadURL().then((url) => {
            imageData.url = url;
            imageData.storageUri = fileSnapshot.metadata.fullPath;
          });
        })
        .catch((error) => {
          console.log('error saving image ', error);
        });
      return imageData;
    },

    // remove old file from storage path
    removeOldPhoto(context, path) {
      storage.ref(path).delete();
    },
  },
  getters: {},
};
