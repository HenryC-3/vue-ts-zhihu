import { GlobalStore, PostProps } from "@/types/types";
import { createStore } from "vuex";
import axios from "axios";

export const store = createStore<GlobalStore>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: false }
  },
  mutations: {
    login(state) {
      state.user = { isLogin: true, name: "Zack", columnId: 1 };
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
    async fetchColumns(context) {
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
    }
  },
  getters: {
    // BUG: 页面刷新时会将 state 中的数据清空，导致报错
    getColumnById: state => (id: string) => {
      return state.columns.find(c => c._id === id);
    }
  }
});
