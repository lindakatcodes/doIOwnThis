// Vue & main files
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Firebase
// eslint-disable-next-line
import firebaseApp from '../firebaseConfig';
// import VueFirestore from 'vue-firestore';

// CSS
import 'normalize.css';
import './assets/global.css';

Vue.config.productionTip = false;

// Vue.use(VueFirestore);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
