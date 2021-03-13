import { GlobalStore } from "@/types/types";
import { createStore } from "vuex";
import { testData, testPostData, testUserData } from "./mockData";

export const store = createStore<GlobalStore>({
  state: {
    columns: testData,
    posts: testPostData,
    user: testUserData
  },
  mutations: {
    //
  }
});
