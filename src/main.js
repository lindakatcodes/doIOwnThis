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

Vue.filter('titleCase', function (str) {
  if (!str) return '';

  const originalArray = str.toString().split(' ');
  const casedResult = [];
  originalArray.forEach((word) => {
    const first = word.charAt(0).toUpperCase();
    const rest = word.slice(1).toLowerCase();
    casedResult.push(first.concat(rest));
  });
  return casedResult.join(' ');
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
