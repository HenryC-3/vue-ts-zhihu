import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ColumnDetail from "../views/ColumnDetail.vue";
import CreatePost from "../views/CreatePost.vue";
import PostDetail from "../views/PostDetail.vue";
import { store } from "../utils/store";
import axios from "axios";
import createMessage from "@/components/createMessage";

const routerHistory = createWebHistory();
export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: "/column/:id",
      name: "column",
      component: ColumnDetail
    },
    {
      path: "/post/:id",
      name: "post",
      component: PostDetail
    },
    {
      path: "/create",
      name: "create",
      component: CreatePost,
      meta: { requiredLogin: true }
    }
  ]
});

// NOTE：使用路由 meta 的意义是？
// - 很多时候跳转路由的逻辑是：如果满足了条件 A，那么就跳转路由。逻辑上，该条件与该路由是绑定在一起，因此可以放在 meta 信息中，方便管理
// - 借助 vue-router 钩子，可以读取当前路由的 meta 信息，编写跳转逻辑
// IMPR: 逻辑不够清晰，有待改善
router.beforeEach((to, from, next) => {
  const { user, token } = store.state;
  const { redirectAlreadyLogin, requiredLogin } = to.meta;

  if (user.isLogin) {
    redirectAlreadyLogin ? next("/") : next();
  } else {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      store
        .dispatch("fetchCurrentUser")
        .then(() => {
          redirectAlreadyLogin ? next("/") : next();
        })
        .catch(e => {
          localStorage.setItem("token", "");
          createMessage("登录过期，请重新登录", "error");
          next("login");
        });
    } else {
      requiredLogin ? next("login") : next();
    }
  }
});
