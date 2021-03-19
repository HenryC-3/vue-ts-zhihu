import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./utils/store";
import { router } from "./utils/router";
import axios from "axios";

const ICODE = process.env.VUE_APP_ICODE;

axios.defaults.baseURL = "http://apis.imooc.com/api/";
axios.interceptors.request.use(config => {
  store.state.loading = true;
  config.params = { ...config.params, icode: ICODE };
  // 每次POST 请求时会把 icode 放入请求体中
  config.data = { ...config.data, icode: ICODE };
  return config;
});

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.state.loading = false;
  }, 2000);
  return config;
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
