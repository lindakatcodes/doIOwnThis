import { storage } from '../../../firebaseConfig';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // save new file & return url & storage path
    async saveNewPhoto({ rootState }, file) {
      let imageUrl = '';
      let imagePath = '';
      const filePath = `${rootState.currentUser.userId}/${file.name}`;
      await storage
        .ref(filePath)
        .put(file)
        .then(function (fileSnapshot) {
          return fileSnapshot.ref.getDownloadURL().then((url) => {
            imageUrl = url;
            imagePath = fileSnapshot.metadata.fullPath;
            // console.log('inside function: ', imageUrl, imagePath);
          });
        })
        .catch((error) => {
          console.log('error saving image ', error);
        });
      const imageData = [imageUrl, imagePath];
      return imageData;
    },

    // remove old file from storage path
    removeOldPhoto(context, path) {
      storage.ref(path).delete();
    },
  },
  getters: {},
};
