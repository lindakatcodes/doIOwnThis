import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/performance';

// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'doiownthis.netlify.app',
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
export const performance = firebaseApp.performance();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();
// export const provider = new firebase.auth.GoogleAuthProvider();

export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult() {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      // console.log(authResult);
      return true;
    },
    signInFailure(error) {
      // For merge conflicts, the error.code will be
      // 'firebaseui/anonymous-upgrade-merge-conflict'.
      if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
        console.log('Cannot log in: ', error);
        return Promise.resolve();
      }
    },
  },
  signInFlow: 'popup',
  signInSuccessUrl: 'https://doiownthis.netlify.app',
  queryParameterForSignInSuccessUrl: 'https://doiownthis.netlify.app',
  signInOptions: [
    // {
    //   provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   customParameters: {
    //     // Forces account selection even when one account
    //     // is available.
    //     prompt: 'select_account',
    //   },
    //   // Required to enable ID token credentials for this provider.
    //   clientId: process.env.VUE_APP_CLIENT_ID,
    // },
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

// Initialize the FirebaseUI Widget using Firebase.
export const ui = new firebaseui.auth.AuthUI(firebaseApp.auth());

export default firebaseApp;
