import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/performance'

// firebase init goes here
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'doiownthis.firebaseapp.com',
  databaseURL: 'https://doiownthis.firebaseio.com',
  projectId: 'doiownthis',
  storageBucket: 'doiownthis.appspot.com',
  messagingSenderId: process.env.VUE_APP_MESSAGING_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
}
firebase.initializeApp(config)

export default firebase
