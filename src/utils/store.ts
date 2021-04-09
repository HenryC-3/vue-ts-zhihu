import { GlobalStore, PostProps } from "@/types/types";
import { createStore } from "vuex";
import axios from "axios";
import { arrToObj } from "../utils/helper";

export const store = createStore<GlobalStore>({
  state: {
    error: { status: false },
    token: localStorage.getItem("token") || "",
    columns: [],
    posts: { data: {} },
    user: { isLogin: false },
    loading: false
  },
  mutations: {
    login(state, rawData) {
      state.token = rawData.token;
    },
    createPost(state, post: PostProps) {
      state.posts.data[post._id] = post;
    },
    fetchColumns(state, rowData) {
      state.columns = rowData.data.list;
    },
    fetchColumn(state, rowData) {
      state.columns = [rowData.data];
    },
    fetchPosts(state, rowData) {
      state.posts.data = {
        ...state.posts.data,
        ...arrToObj(rowData.data.list)
      };
    },
    fetchCurrentUser(state, rowData) {
      state.user = { isLogin: true, ...rowData.data };
    },
    setError(state, rowData) {
      state.error = rowData;
    }
  },
  actions: {
    fetchColumns(context) {
      axios.get("/columns").then(res => {
        context.commit("fetchColumns", res.data);
      });
    },
    fetchColumn(context, payload) {
      axios.get(`/columns/${payload.columnId}`).then(res => {
        context.commit("fetchColumn", res.data);
      });
    },
    fetchPosts(context, payload) {
      axios.get(`/columns/${payload.columnId}/posts`).then(res => {
        context.commit("fetchPosts", res.data);
      });
    },
    fetchCurrentUser(context) {
      return axios
        .get("/user/current")
        .then(res => {
          context.commit("fetchCurrentUser", res.data);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    },
    login(context, payload) {
      return axios
        .post(`/user/login`, payload)
        .then(res => {
          localStorage.setItem("token", res.data.data.token);
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
      return state.columns.find(c => c._id === id) || [];
    }
  }
});
