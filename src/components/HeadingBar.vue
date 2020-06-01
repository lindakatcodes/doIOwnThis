<template>
  <div class="header">
    <div class="titleBlock">
      <h1 class="title">Do I Own This?</h1>
      <p class="subtitle">View your collection anywhere!</p>
    </div>
    <div v-if="!signedIn" class="signInBlock">
      <button class="toggleSignIn" type="button" @click="login">
        Sign in w/ Google
      </button>
    </div>
    <div v-if="signedIn" class="signInBlock">
      <p>Hi {{ getFirstName }}!</p>
      <button class="toggleSignIn" type="button" @click="logout">
        Sign Out
      </button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app';
  import { auth } from '../../firebaseConfig';

  export default {
    data() {
      return {
        userId: '',
        name: '',
        signedIn: false,
      };
    },
    computed: {
      getFirstName() {
        const splitName = this.name.split(' ');
        return splitName[0];
      },
    },
    created() {
      auth.onAuthStateChanged((user) => {
        // console.debug('Callback context for created', this)
        if (user) {
          this.userId = user.uid;
          this.name = user.displayName;
          this.signedIn = true;
          console.log('User data pulled');
          this.$store.commit('setCurrentUser', user);
          console.log('Successfully signed in!');
        } else {
          console.log('No user detected.');
          this.signedIn = false;
        }
      });
    },
    methods: {
      login() {
        // console.debug('Callback context login', this)
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithRedirect(provider);
      },
      logout() {
        auth
          .signOut()
          .then(() => {
            console.log('Successfully signed out');
            this.$store.commit('unsetCurrentUser');
          })
          .catch(function (error) {
            console.error('Error signing out', error);
          });
      },
    },
  };
</script>

<style scoped>
  .header {
    width: 100%;
    padding: 1% 0 4%;
    background: var(--dark-bg);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .titleBlock {
    width: 65%;
    color: var(--light-font-color);
  }

  .subtitle {
    margin-bottom: 5%;
  }

  .signInBlock p {
    margin: 8% 0;
    font-size: 1.1rem;
    color: var(--accent);
    text-align: center;
  }

  .toggleSignIn {
    width: 100%;
    padding: 5px;
    background: var(--light-bg);
    border-radius: 5px;
  }
</style>
