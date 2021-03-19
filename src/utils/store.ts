import { GlobalStore, PostProps } from "@/types/types";
import { createStore } from "vuex";
import axios from "axios";

export const store = createStore<GlobalStore>({
  state: {
    token: "",
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
    login(context, payload) {
      return axios.post(`user/login`, payload).then(res => {
        debugger;
        context.commit("login", res.data);
        return res.data;
      });
    }
  },
  getters: {
    getColumnById: state => (id: string) => {
      return state.columns.find(c => c._id === id) || [];
    }
  }
});
