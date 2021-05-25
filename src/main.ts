import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./utils/store";
import { router } from "./utils/router";
import "windi.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
