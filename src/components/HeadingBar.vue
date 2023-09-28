<template>

  <div class="header">

    <div class="titleBlock">

      <router-link :to="{ name: 'home' }" class="title">

        <h1>Do I Own This?</h1>

      </router-link>

      <p class="subtitle">Your collection in your pocket!</p>

    </div>

    <div v-if="!loading" class="signInBlock">

      <button
        v-if="!isAuthenticated"
        class="toggleSignIn"
        @click="login"
      >
         Log in / Sign Up
      </button>

      <button
        v-if="isAuthenticated"
        class="toggleSignIn"
        @click="logout"
      >
         Log out
      </button>

    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
    };
  },
  created() {
    this.checkUserLoginStatus();
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect().then(() => {
        this.$store.commit("SET_CURRENT_USER", this.user);
      });
    },
    logout() {
      this.$auth0
        .logout({
          returnTo: window.location.origin,
        })
        .then(() => {
          this.$store.commit("UNSET_CURRENT_USER");
        });
    },
    async checkUserLoginStatus() {
      if (this.isAuthenticated) {
        this.$store.commit("SET_CURRENT_USER", this.user);
      }
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

@media screen and (min-width: 750px) {
  .title h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .signOutBlock p {
    font-size: 1.4rem;
  }

  .toggleSignIn {
    font-size: 1.1rem;
  }
}

@media screen and (min-width: 1000px) {
  .header {
    padding: 0;
  }

  .subtitle {
    margin-bottom: 4%;
  }

  .signOutBlock p {
    margin: 10% 0;
  }

  .toggleSignIn {
    width: 70%;
    margin-left: 15%;
  }
}
</style>

