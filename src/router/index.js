import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AddItem from '../views/AddItem.vue';
import SwatchDetails from '../views/SwatchDetails.vue';
import EditItem from '../views/EditItem.vue';
import Stats from '../views/Stats.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/add',
    name: 'add-new',
    component: AddItem,
  },
  {
    path: '/swatch/:id',
    name: 'single-swatch',
    component: SwatchDetails,
    props: true,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditItem,
    props: true,
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
