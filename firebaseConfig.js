import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// import 'firebase/analytics';
// import 'firebase/performance';

// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'doiownthis.firebaseapp.com',
  databaseURL: 'https://doiownthis.firebaseio.com',
  projectId: 'doiownthis',
  storageBucket: 'doiownthis.appspot.com',
  messagingSenderId: process.env.VUE_APP_MESSAGING_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export default firebaseApp;
