<template>
  <div class="header">
    <h1 class="title">Do I Own This?</h1>
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
      <!-- <router-link>Got something new? Add it!</router-link> -->
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app';
  import 'firebase/auth';

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
      firebase.auth().onAuthStateChanged((user) => {
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
        firebase.auth().signInWithRedirect(provider);
      },
      logout() {
        firebase
          .auth()
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
    padding: 2% 0;
    background: var(--dark-bg);
    display: flex;
    justify-content: space-around;
  }

  .title {
    width: 60%;
    color: var(--light-font-color);
  }

  .signInBlock {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .signInBlock p {
    padding: 3px;
    margin: 8px 0;
    font-size: 1.2rem;
    color: var(--accent);
  }

  .toggleSignIn {
    width: 100%;
    padding: 5px;
    background: var(--light-bg);
    border-radius: 5px;
  }
</style>
