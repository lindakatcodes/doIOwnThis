import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AddItem from '../views/AddItem.vue';
import SwatchDetails from '../views/SwatchDetails.vue';
import EditItem from '../views/EditItem.vue';

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
];

const router = new VueRouter({
  routes,
});

export default router;
