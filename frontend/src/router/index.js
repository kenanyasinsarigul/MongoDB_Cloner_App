import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";
import Cloner from "../views/Cloner";
import Main from "../views/Main";
import EnvironmentView from "../views/Environment";
import Schedule from "../views/Schedule";
import { FRONTEND_URL } from "../config/index";

Vue.use(VueRouter);
Vue.use(Router);

export default new Router({
  //mode: "history",
  base: FRONTEND_URL,
  routes: [
    {
      path: "/",
      component: Main,
    },
    {
      path: "/cloner",
      component: Cloner,
    },
    {
      path: "/environments",
      component: EnvironmentView,
    },
    {
      path: "/schedule",
      component: Schedule,
    },
  ],
});

const router = new VueRouter({
  mode: "history",
  base: FRONTEND_URL,
});
