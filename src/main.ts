import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./utils/store";
import { router } from "./utils/router";
import axios from "axios";

const ICODE = process.env.VUE_APP_ICODE;

axios.get(`http://apis.imooc.com/api/columns?icode=${ICODE}`).then(res => {
  console.log(res.data);
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
