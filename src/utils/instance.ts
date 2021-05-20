import { Option } from "@/types/types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "./store";

const ICODE = process.env.VUE_APP_ICODE;
const BASE_URL = process.env.VUE_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

// NOTE: axios - 请求拦截
instance.interceptors.request.use((config: AxiosRequestConfig & Option) => {
  // 请求参数附带 icode
  config.params = { ...config.params, icode: ICODE };

  // 请求体附带 icode
  if (config.data instanceof FormData) {
    // 请求体为 FormData 格式
    config.data.append("icode", ICODE);
  } else {
    // 请求体为普通对象
    config.data = { ...config.data, icode: ICODE };
  }

  // 添加 cancel token，让请求“可取消”
  const source = axios.CancelToken.source();
  config.cancelToken = source.token;

  const { loadedUrl } = store.state;
  const { cache, url, data, params } = config;
  const key = url + JSON.stringify(data) + JSON.stringify(params);

  // 如果开启缓存
  if (cache) {
    // 如果 loadedUrl 中存在当前 url
    if (url && loadedUrl[key]) {
      const config = loadedUrl[key];
      // 如果数据存在且未过期，取消发送
      if (config && config.expries > Date.now()) {
        source.cancel(
          JSON.stringify({
            message: "请求取消"
          })
        );
      } else {
        // 如果数据存在，但过期，移除该属性
        delete store.state.loadedUrl[key];
      }
    }
  }

  return config;
});

// NOTE: axios - 响应拦截
instance.interceptors.response.use(
  (
    response: AxiosResponse & {
      config: Option;
    }
  ) => {
    const { cache, url, data, params, expires } = response.config;
    // NOTE: data 为什么变成了字符串，不应该是对象吗？ 相关 issue: https://github.com/axios/axios/issues/1386#issue-300082029
    const key = url + data + JSON.stringify(params);

    const { loadedUrl } = store.state;

    // 缓存
    // 如果 cache 为 true
    if (cache) {
      // 且 loadedUrl 上没有缓存当前 url，则缓存
      // eslint-disable-next-line no-prototype-builtins
      if (!loadedUrl.hasOwnProperty(key)) {
        if (expires) loadedUrl[key] = { expries: Date.now() + expires };
      }
    }
    return response;
  },
  e => {
    return Promise.reject(e);
  }
);

export default instance;
