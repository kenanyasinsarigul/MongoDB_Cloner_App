import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "../src/config/axios";
import "../src/util/filter";
import router from "./router";
import store from "./store";
import VueToastify from "vue-toastify";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false;

Vue.use(VueToastify);
Vue.use(BootstrapVue,IconsPlugin);

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
