import { GlobalStore, PostProps } from "@/types/types";
import { createStore } from "vuex";
import axios from "axios";

export const store = createStore<GlobalStore>({
  state: {
    token: localStorage.getItem("token") || "",
    columns: [],
    posts: [],
    user: { isLogin: false },
    loading: false
  },
  mutations: {
    login(state, rawData) {
      state.token = rawData.token;
    },
    createPost(state, post: PostProps) {
      state.posts.push(post);
    },
    fetchColumns(state, rowData) {
      state.columns = rowData.data.list;
    },
    fetchColumn(state, rowData) {
      state.columns = [rowData.data];
    },
    fetchPosts(state, rowData) {
      state.posts = rowData.data.list;
    },
    fetchCurrentUser(state, rowData) {
      state.user = { isLogin: true, ...rowData.data };
    }
  },
  actions: {
    fetchColumns(context) {
      axios.get("columns").then(res => {
        context.commit("fetchColumns", res.data);
      });
    },
    fetchColumn(context, payload) {
      axios.get(`columns/${payload.columnId}`).then(res => {
        context.commit("fetchColumn", res.data);
      });
    },
    fetchPosts(context, payload) {
      axios.get(`columns/${payload.columnId}/posts`).then(res => {
        context.commit("fetchPosts", res.data);
      });
    },
    fetchCurrentUser(context) {
      axios.get("user/current").then(res => {
        context.commit("fetchCurrentUser", res.data);
      });
    },
    login(context, payload) {
      return axios.post(`user/login`, payload).then(res => {
        // VIEW: 需要将 axios 设置相关的代码放到单独文件中管理吗？ 分散在这里是不是不方便管理？
        // 现在每次请求都会带上 token
        localStorage.setItem("token", res.data.data.token);
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.data.token}`;
        context.commit("login", res.data);
        return res.data.data;
      });
    },
    loginAndFetch({ dispatch }, payload) {
      dispatch("login", payload).then(res => {
        dispatch("fetchCurrentUser");
      });
    }
  },
  getters: {
    getColumnById: state => (id: string) => {
      return state.columns.find(c => c._id === id) || [];
    }
  }
});
