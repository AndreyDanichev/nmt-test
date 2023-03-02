import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./plugins/router";
import api from "./helpers/api";

Vue.config.productionTip = false;

import "./assets/style.css";

Vue.prototype.$http = api;

api.interceptors.request.use(
  (config) => {
    const token = "public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD";
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    console.log(error);
    if (error.response.status === 401) {
      console.log("unauthorized");
      return Promise.reject(error.response);
    }
  }
);

export const bus = new Vue();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
