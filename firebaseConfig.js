import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  databaseURL: 'https://doiownthis.firebaseio.com',
  projectId: 'doiownthis',
  storageBucket: 'doiownthis.appspot.com',
  appId: process.env.VUE_APP_APP_ID,
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export default firebaseApp;
