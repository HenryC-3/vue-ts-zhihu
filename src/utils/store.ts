import { GlobalStore } from "@/types/types";
import { createStore } from "vuex";
import { testData, testPostData } from "./mockData";

export const store = createStore<GlobalStore>({
  state: {
    columns: testData,
    posts: testPostData,
    user: { isLogin: false }
  },
  mutations: {
    login(state) {
      state.user = { isLogin: true, name: "Zack" };
    }
  },
  getters: {
    getPostByColumnId: state => (columnId: number) =>
      state.posts.filter(post => post.columnId === columnId)
  }
});
