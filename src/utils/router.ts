import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ColumnDetail from "../views/ColumnDetail.vue";
import CreatePost from "../views/CreatePost.vue";
import PostDetail from "../views/PostDetail.vue";
import SignUp from "../views/SignUp.vue";
import { store } from "../utils/store";
import createMessage from "@/components/createMessage";
import instance from "./instance";

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
      path: "/signUp",
      name: "signUp",
      component: SignUp,
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

router.beforeEach((to, from, next) => {
  const { user, token } = store.state;
  const { redirectAlreadyLogin, requiredLogin } = to.meta;

  // 用户已经登录，跳转至首页
  if (user.isLogin) {
    redirectAlreadyLogin ? next("/") : next();
  } else {
    // 用户未登录，但存在 token，获取用户登录信息
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      store
        .dispatch("fetchCurrentUser") // 利用 token 登录成功，将登录状态设置为已登录
        .then(() => {
          redirectAlreadyLogin ? next("/") : next();
        })
        .catch(e => { // token 过期，登录失败，跳转至登录页
          localStorage.removeItem("token");
          createMessage("登录过期，请重新登录", "error");
          next("login");
        });
    } else {
      requiredLogin ? next("login") : next();
    }
  }
});
