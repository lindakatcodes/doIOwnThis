import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AddItem from '../views/AddItem.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add',
    name: 'add-new',
    component: AddItem,
  },
  {
    path: '/edit',
    name: 'Edit Collections',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EditCollections.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
