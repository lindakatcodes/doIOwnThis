import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AddItem from "../views/AddItem.vue";
import SwatchDetails from "../views/SwatchDetails.vue";
import EditItem from "../views/EditItem.vue";
import Stats from "../views/Stats.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/add",
    name: "add-new",
    component: AddItem,
  },
  {
    path: "/swatch/:id",
    name: "single-swatch",
    component: SwatchDetails,
    props: true,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditItem,
    props: true,
  },
  {
    path: "/stats",
    name: "stats",
    component: Stats,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
