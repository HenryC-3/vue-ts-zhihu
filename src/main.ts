import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./utils/store";
import { router } from "./utils/router";
import axios from "axios";

const ICODE = process.env.VUE_APP_ICODE;

axios.defaults.baseURL = "http://apis.imooc.com/api/";
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: ICODE };
  return config;
});

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.state.loading = false;
    // 结束后移除 DOM 节点
    const loadingDiv = document.getElementById("loading");
    if (loadingDiv?.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }
  }, 2000);
  return config;
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
