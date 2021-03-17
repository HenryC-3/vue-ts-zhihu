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
    fetchPosts(context, payload) {
      axios.get(`columns/${payload.columnId}/posts`).then(res => {
        context.commit("fetchPosts", res.data);
      });
    }
  }
});
