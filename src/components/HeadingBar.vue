<template>
  <div class="header">
    <div class="titleBlock">
      <router-link :to="{ name: 'home' }" class="title"><h1>Do I Own This?</h1></router-link>
      <p class="subtitle">Your collection in your pocket!</p>
    </div>
    <div v-if="!signedIn" class="signInBlock">
      <button class="toggleSignIn" type="button" @click="login">
        SIGN IN / <br />
        SIGN UP
      </button>
    </div>
    <div v-if="signedIn" class="signOutBlock">
      <p>Hi {{ getFirstName }}!</p>
      <button class="toggleSignIn" type="button" @click="logout">
        SIGN OUT
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
          this.$store.commit('SET_CURRENT_USER', user);
        } else {
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
            this.$store.commit('UNSET_CURRENT_USER');
          })
          .catch(function (error) {
            this.$toasted.global.errorToast({
              message: `Trouble signing you out: ${error}`,
            });
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

  .titleBlock {
    width: 65%;
    color: var(--light-font-color);
  }

  .title {
    color: var(--light-font-color);
    text-decoration: none;
  }

  .title h1 {
    font-size: 1.8rem;
    font-family: var(--serif);
    text-align: center;
  }

  .subtitle {
    margin-bottom: 5%;
    text-align: center;
  }

  .signInBlock {
    width: 25%;
    align-self: center;
  }

  .signOutBlock {
    width: 25%;
    align-self: stretch;
  }

  .signOutBlock p {
    margin: 8% 0;
    font-size: 1.1rem;
    color: var(--accent);
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.05rem;
  }

  .toggleSignIn {
    width: 100%;
    padding: 5px;
    background: var(--light-bg);
    border-radius: 5px;
    font-weight: 700;
    letter-spacing: 0.05rem;
    font-size: 0.9rem;
  }
</style>
