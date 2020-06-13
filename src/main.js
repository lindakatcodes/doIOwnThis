import Toasted from 'vue-toasted';

// Vue & main files
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Firebase
// eslint-disable-next-line
import * as firebase from '../firebaseConfig';

// CSS
import 'normalize.css';
import './assets/global.css';

Vue.config.productionTip = false;

const toastOptions = {
  position: 'bottom-center',
  duration: 2000,
  iconPack: 'material',
  action: {
    icon: 'close',
    class: 'closeToast',
    onClick: (e, toastObject) => {
      toastObject.goAway(250);
    },
  },
};

const successOptions = {
  type: 'success',
  icon: 'check_circle_outline',
};

const errorOptions = {
  type: 'error',
  icon: 'error_outline',
};

Vue.use(Toasted, toastOptions, router);

Vue.toasted.register(
  'errorToast',
  (payload) => {
    if (!payload.message) {
      return 'Sorry, something went wrong!';
    }

    return `Sorry! ${payload.message}`;
  },
  errorOptions
);

Vue.toasted.register(
  'successToast',
  (payload) => {
    if (!payload.message) {
      return 'Success!';
    }

    return `Hurray! ${payload.message}`;
  },
  successOptions
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
