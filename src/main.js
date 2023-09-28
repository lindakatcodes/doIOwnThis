
// Vue & main files
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// CSS
import 'normalize.css';
import './assets/global.css';

// Plugins and other libraries
// eslint-disable-next-line no-unused-vars
// import * as firebase from "../firebaseConfig";
// import { Auth0Plugin } from "./auth";
import { createAuth0 } from '@auth0/auth0-vue';
import Toasted from "vue-toasted";

const app = createApp(App);

app.use(
  createAuth0({
    domain: import.meta.env.VUE_APP_AUTH_DOMAIN,
    clientId: import.meta.env.VUE_APP_AUTH_CLIENTID,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
);

const toastOptions = {
  position: "bottom-center",
  duration: 2000,
  iconPack: "material",
  action: {
    icon: "close",
    class: "closeToast",
    onClick: (e, toastObject) => {
      toastObject.goAway(250);
    },
  },
};

const successOptions = {
  type: "success",
  icon: "check_circle_outline",
};

const errorOptions = {
  type: "error",
  icon: "error_outline",
};

app.use(Toasted, toastOptions, router);

app.toasted.register(
  "errorToast",
  (payload) => {
    if (!payload.message) {
      return "Sorry, something went wrong!";
    }

    return `Sorry! ${payload.message}`;
  },
  errorOptions
);

app.toasted.register(
  "successToast",
  (payload) => {
    if (!payload.message) {
      return "Success!";
    }

    return `Hurray! ${payload.message}`;
  },
  successOptions
);

app.use(router);
app.use(store);

app.mount("#app");
