import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./utils/store";
import { router } from "./utils/router";
import axios from "axios";
import createMessage from "./components/createMessage";

const ICODE = process.env.VUE_APP_ICODE;

axios.defaults.baseURL = "http://apis.imooc.com/api";
axios.interceptors.request.use(config => {
  if (window.location.pathname !== "/create") {
    store.state.loading = true;
  }
  config.params = { ...config.params, icode: ICODE };
  // 每次POST 请求时会把 icode 放入请求体中
  if (config.data instanceof FormData) {
    config.data.append("icode", ICODE);
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: ICODE };
  }
  return config;
});

axios.interceptors.response.use(
  response => {
    store.commit("setError", { status: false, message: response.data.msg });
    store.state.loading = false;
    return response;
  },
  e => {
    store.commit("setError", {
      status: true,
      message: e.response.data.error
    });
    createMessage(e.response.data.error, "error");
    store.state.loading = false;
    return Promise.reject(e);
  }
);

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
