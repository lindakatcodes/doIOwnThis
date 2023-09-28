import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// firebase init goes here
const config = {
  apiKey: import.meta.env.VUE_APP_API_KEY,
  authDomain: "doiownthis.netlify.app",
  databaseURL: "https://doiownthis.firebaseio.com",
  projectId: "doiownthis",
  storageBucket: "doiownthis.appspot.com",
  messagingSenderId: import.meta.env.VUE_APP_MESSAGING_ID,
  appId: import.meta.env.VUE_APP_APP_ID,
  measurementId: import.meta.env.VUE_APP_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.firestore();
export const storage = firebaseApp.storage();

export default firebaseApp;
