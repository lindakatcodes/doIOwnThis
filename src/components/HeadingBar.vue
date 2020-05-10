<template>
  <div class="header">
    <h1 class="title">Do I Own This?</h1>
    <div v-if="!signedIn" class="signInBlock">
      <button @click="login">Sign in w/ Google</button>
    </div>
    <div v-if="signedIn" class="signInBlock">
      <p>Hi!</p>
      <button @click="logout">Sign Out</button>
      <!-- <router-link>Got something new? Add it!</router-link> -->
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data() {
    return {
      userId: '',
      name: '',
      signedIn: false
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user)
        this.userId = user.uid
        this.name = user.displayName
        this.signedIn = true
      } else {
        console.log('No user detected.')
        this.signedIn = false
      }
    })
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logout() {
      firebase.auth().signOut().then(function() {
        console.log('Successfully signed out')
        this.signedIn = false
      }).catch(function(error) {
        console.error('Error signing out', error)
      })
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 20%;
  background: var(--heading-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin: 5px auto 0;
}

.signInBlock {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.signInBlock p {
  padding: 5px;
}
</style>
