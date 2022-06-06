import Vue from "vue";

import VueRouter from "vue-router";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import loginpage from "../views/loginpage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },

  {
    path: "/loginpage",
    name: "loginpage",
    component: loginpage,
  },

  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
