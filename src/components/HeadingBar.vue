<template>
  <div class="header">
    <h1 class="title">Do I Own This?</h1>
    <div v-if="!token" class="signInBlock">
      <button @click="login">Sign in w/ Google</button>
    </div>
    <div v-if="token" class="signInBlock">
      <p>Hi, {{ user.name }}!</p>
      <router-link>Got something new? Add it!</router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      token: ''
    }
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)

      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          if (result.credential) {
            this.token = result.credential.accessToken
          }
          this.$store.commit('setCurrentUser', result.user)
          console.log('Signed in sucessfully! ' + result)
        })
        .catch(function(error) {
          console.error('Error with signing in: ' + error)
        })
    }
  },
  computed: mapState({
    user: 'currentUser'
  })
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
