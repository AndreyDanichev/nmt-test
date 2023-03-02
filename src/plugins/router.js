import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/pages/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../components/pages/cart.vue"),
  },
  {
    path: "/category/:id",
    name: "Category",
    component: () => import("../components/pages/category.vue"),
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../components/pages/product.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
