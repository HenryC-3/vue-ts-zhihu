import { GlobalStore, PostProps } from "@/types/types";
import { createStore } from "vuex";
import axios from "axios";
import { arrToObj } from "../utils/helper";

export const store = createStore<GlobalStore>({
  state: {
    error: { status: false },
    token: localStorage.getItem("token") || "",
    columns: {},
    posts: { data: {}, loadedColumns: [], homePageInitialLoaded: false },
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
      state.posts.homePageInitialLoaded = true;
      state.columns = { ...state.columns, ...arrToObj(rowData.data.list) };
    },
    fetchColumn(state, rowData) {
      state.columns[rowData.data._id] = rowData.data;
    },
    fetchPosts(state, { data: rowData, columnId }) {
      // 使用 loadedcolumns 储存 columnId，标记已请求过文章列表的 column
      state.posts.loadedColumns.push(columnId);
      state.posts.data = {
        ...state.posts.data,
        ...arrToObj(rowData.data.list)
      };
    },
    fetchPost(state, rawData) {
      // 在 action fetchPosts 中，后端会返回文章除 “文章内容” 外的所有信息，包括 id
      // 所以不能通过储存 postId 来标记已经请求过的文章
      state.posts.data[rawData.data._id] = rawData.data;
    },

    deletePost(state, rawData) {
      delete state.posts.data[rawData.data._id];
    },
    fetchCurrentUser(state, rowData) {
      state.user = { isLogin: true, ...rowData.data };
    },
    setError(state, rowData) {
      state.error = rowData;
    }
  },
  actions: {
    // 获取抓专栏列表
    fetchColumns(context, payload) {
      const urlParams = payload
        ? `?currentPage=${payload.page}&pageSize=${payload.size}`
        : "";
      if (urlParams || !context.state.posts.homePageInitialLoaded) {
        return axios.get("/columns" + urlParams).then(res => {
          context.commit("fetchColumns", res.data);
          return res.data;
        });
      }
    },
    // 获取专栏详情
    fetchColumn({ commit, state }, { columnId }) {
      if (!state.columns[columnId]) {
        axios.get(`/columns/${columnId}`).then(res => {
          commit("fetchColumn", res.data);
        });
      }
    },
    // 创建一篇文章
    createPost(context, payload) {
      return axios.post("posts", payload.post).then(res => {
        context.commit("createPost", res.data);
      });
    },
    // 修改一篇文章
    modifyPost(context, payload) {
      axios.patch(`posts/${payload.post.postId}`, payload.post).then(res => {
        context.commit("createPost", res.data);
      });
    },
    // 获取对应专栏文章
    fetchPosts({ state, commit }, { columnId, page, size }) {
      const urlParams =
        page || size ? `?currentPage=${page}&pageSize=${size}` : "";
      return axios.get(`/columns/${columnId}/posts` + urlParams).then(res => {
        commit("fetchPosts", { data: res.data, columnId });
        return res.data;
      });
    },
    // 获取一篇文章
    fetchPost({ state, commit }, { postId }) {
      const currentPost = state.posts.data[postId];
      if (!currentPost || !currentPost.content)
        return axios.get(`/posts/${postId}`).then(res => {
          commit("fetchPost", res.data);
        });
    },
    // 删除一篇文章
    deletePost(context, payload) {
      return axios.delete(`/posts/${payload.postId}`).then(res => {
        context.commit("deletePost", res.data);
        return res.data;
      });
    },
    // 获取登录用户信息
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
    // 获取 token
    login(context, payload) {
      return axios
        .post(`/user/login`, payload)
        .then(res => {
          localStorage.setItem("token", res.data.data.token);
          axios.defaults.headers.common.Authorization = `Bearer ${res.data.data.token}`;
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
      return state.posts.data[id];
    }
  }
});
