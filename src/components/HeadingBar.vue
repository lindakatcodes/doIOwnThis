<template>
  <div class="header">
    <h1 class="title">Do I Own This?</h1>
    <div v-if="!signedIn" class="signInBlock">
      <button @click="login">Sign in w/ Google</button>
    </div>
    <div v-if="signedIn" class="signInBlock">
      <p>Hi, {{ name }}!</p>
      <router-link>Got something new? Add it!</router-link>
    </div>
  </div>
</template>

<script>
import auth from '../services/firebaseConfig'

export default {
  methods: {
    login() {
      const provider = auth.GoogleAuthProvider()
      auth.signInWithRedirect(provider)

      auth.getRedirectResult().then(function(result) {
        console.log(result)
        this.$store.commit('setCurrentUser', result.user)
      }).catch(function(error) {
        console.log('Error with signing in: ' + error)
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
