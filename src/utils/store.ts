import { GlobalStore, PostProps } from "@/types/types";
import { createStore } from "vuex";
import { arrToObj } from "../utils/helper";
import { fethchColumn, fethchColumns } from "@/api/column";
import {
  createPost,
  deletePost,
  fetchPost,
  fetchPosts,
  modifyPost
} from "@/api/post";
import { fetchCurrentUser, userLogin } from "@/api/user";
import instance from "./instance";

export const store = createStore<GlobalStore>({
  state: {
    error: { status: false },
    token: localStorage.getItem("token") || "",
    columns: {},
    posts: {},
    user: { isLogin: false },
    loading: false,
    loadedUrl: {}
  },
  mutations: {
    login(state, rawData) {
      state.token = rawData.token;
    },

    createPost(state, post: PostProps) {
      state.posts[post._id] = post;
    },
    fetchColumns(state, rawData) {
      state.columns = { ...state.columns, ...arrToObj(rawData.data.list) };
    },
    fetchColumn(state, rawData) {
      state.columns[rawData.data._id] = rawData.data;
    },
    fetchPosts(state, rawData) {
      state.posts = {
        ...state.posts,
        ...arrToObj(rawData.data.list)
      };
    },
    fetchPost(state, rawData) {
      state.posts[rawData.data._id] = rawData.data;
    },

    deletePost(state, rawData) {
      delete state.posts[rawData.data._id];
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data };
    },
    setError(state, rawData) {
      state.error = rawData;
    }
  },
  actions: {
    // 获取抓专栏列表
    fetchColumns({ commit }, payload) {
      let page;
      let size;
      if (payload) {
        page = payload.page;
        size = payload.size;
      }
      return fethchColumns(page, size).then(res => {
        commit("fetchColumns", res.data);
        return res.data;
      });
    },
    // 获取专栏详情
    fetchColumn({ commit, state }, { columnId }) {
      if (!state.columns[columnId]) {
        fethchColumn(columnId).then(res => {
          commit("fetchColumn", res.data);
        });
      }
    },
    // 创建一篇文章
    createPost(context, { post }) {
      return createPost(post).then(res => {
        context.commit("createPost", res.data);
      });
    },
    // 修改一篇文章
    modifyPost(context, { post }) {
      return modifyPost(post.postId, post).then(res => {
        context.commit("createPost", res.data.data);
      });
    },
    // 获取对应专栏文章
    fetchPosts({ commit }, { columnId, page, size }) {
      return fetchPosts(columnId, page, size).then(res => {
        commit("fetchPosts", res.data);
        return res.data;
      });
    },
    // 获取一篇文章
    fetchPost({ commit }, { postId }) {
      return fetchPost(postId).then(res => {
        commit("fetchPost", res.data);
      });
    },
    // 删除一篇文章
    deletePost(context, { postId }) {
      return deletePost(postId).then(res => {
        context.commit("deletePost", res.data);
        return res.data;
      });
    },
    // 获取登录用户信息
    fetchCurrentUser(context) {
      return fetchCurrentUser()
        .then(res => {
          context.commit("fetchCurrentUser", res.data);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    // 获取 token
    login(context, { email, password }) {
      return userLogin(email, password)
        .then(res => {
          localStorage.setItem("token", res.data.data.token);
          instance.defaults.headers.common.Authorization = `Bearer ${res.data.data.token}`;
          context.commit("login", res.data);
          return res.data.data;
        })
        .catch(e => {
          return Promise.reject(e);
        });
    }
  },
  getters: {
    getColumnById: state => (id: string) => {
      return state.columns[id];
    },
    getCurrentPost: state => (id: string) => {
      return state.posts[id];
    }
  }
});
