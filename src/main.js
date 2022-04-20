import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import IdleVue from "idle-vue";

const eventsHub = new Vue();

Vue.config.productionTip = false;

const options = {
  eventEmitter: eventsHub,
  idleTime: 7000000,
};

Vue.use(IdleVue, options);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
