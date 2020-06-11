<template>
  <div class="header">
    <div class="titleBlock">
      <router-link :to="{ name: 'home' }" class="title"><h1>Do I Own This?</h1></router-link>
      <p class="subtitle">View your collection anywhere!</p>
    </div>
    <div v-if="!signedIn" class="signInBlock">
      <button class="toggleSignIn" type="button" @click="login">
        Sign in / <br />
        Create Account
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
        if (user) {
          this.userId = user.uid;
          this.name = user.displayName;
          this.signedIn = true;
          console.log('User data pulled');
          this.$store.commit('SET_CURRENT_USER', user);
          console.log('Successfully signed in!');
        } else {
          console.log('No user detected.');
          this.signedIn = false;
        }
      });
    },
    methods: {
      login() {
        this.$router.push({
          name: 'login',
        });
      },
      logout() {
        auth
          .signOut()
          .then(() => {
            console.log('Successfully signed out');
            this.$store.commit('UNSET_CURRENT_USER');
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

  .title {
    color: var(--light-font-color);
    text-decoration: none;
  }

  .title h1 {
    font-size: 1.95rem;
  }

  .subtitle {
    margin-bottom: 5%;
  }

  .signInBlock {
    width: 35%;
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
