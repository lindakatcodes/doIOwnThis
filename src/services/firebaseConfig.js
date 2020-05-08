// eslint-disable-next-line no-unused-vars
// import dotenv from '../../env'

import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/performance'

// firebase init goes here
const config = {
  apiKey: process.env.API_KEY,
  authDomain: 'doiownthis.firebaseapp.com',
  databaseURL: 'https://doiownthis.firebaseio.com',
  projectId: 'doiownthis',
  storageBucket: 'doiownthis.appspot.com',
  messagingSenderId: process.env.MESSAGING_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const storage = firebase.storage()
const perf = firebase.performance()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const allItems = db.collection('all-items')

export {
  db,
  storage,
  perf,
  auth,
  currentUser,
  allItems
}
