import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginView.vue";
import RegisterPage from "../views/RegisterView.vue";
import Dashboard from "../views/HomeView.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: LoginPage },
  { path: "/register", component: RegisterPage },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL || "/",
  routes,
});

// Guardia global para rutas que requieren autenticación
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
