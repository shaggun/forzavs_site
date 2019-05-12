import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
export const eventBus = new Vue();
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
