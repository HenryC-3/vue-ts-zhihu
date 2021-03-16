import { GlobalStore, PostProps } from "@/types/types";
import { createStore } from "vuex";
import { testData, testPostData } from "./mockData";
import axios from "axios";

export const store = createStore<GlobalStore>({
  state: {
    columns: testData,
    posts: testPostData,
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
    }
  },
  actions: {
    fetchColumns(context) {
      axios.get("columns").then(res => {
        context.commit("fetchColumns", res.data);
      });
    }
  },
  getters: {
    getPostByColumnId: state => (columnId: number) =>
      state.posts.filter(post => post.columnId === columnId)
  }
});
