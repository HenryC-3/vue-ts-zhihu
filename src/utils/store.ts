import { createStore } from "vuex";

export const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    add: state => {
      state.count++;
    }
  }
});
