import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method
} from "axios";
import { store } from "./store";
import createMessage from "../components/createMessage";
import instance from "./instance";
import { Option } from "@/types/types";

type CustomRequest = (
  url: string,
  method: Method,
  payload?: any,
  option?: Option,
  config?: AxiosRequestConfig
) => Promise<AxiosResponse>;

/**
 *
 * @param url url
 * @param method http 方法
 * @param payload 请求参数
 * @param option 功能参数
 * @param option.loading 是否开启 loading 组件，默认开启
 * @param option.error 是否在响应出错时，开启 message 组件，默认开启
 * @param option.cache 是否缓存该请求，默认不缓存
 * @param option.expires 缓存过期时间，默认为 10 min
 * @returns Promise
 */
const request: CustomRequest = function(url, method, payload, option) {
  const defaultOption = {
    loading: true,
    error: true,
    cache: false,
    expires: 60000 * 10
  };

  option = Object.assign(defaultOption, option);
  const { loading, error } = option;

  // 显示 loading 组件
  if (loading) store.state.loading = true;
  return new Promise<AxiosResponse>(resolve => {
    let data = {};

    if (
      method === "post" ||
      method === "POST" ||
      method === "patch" ||
      method === "PATCH"
    )
      data = { data: payload };
    if (
      method === "get" ||
      method === "GET" ||
      method === "delete" ||
      method === "DELETE"
    )
      data = { params: payload };

    // NOTE: 将 option 传递给了 axios 实例
    instance({
      url: url,
      method: method,
      ...option,
      ...data
    })
      .then(res => {
        if (res.status === 200) {
          resolve(res);
        }
      })
      .catch((err: AxiosError) => {
        if (axios.isCancel(err)) {
          console.log(JSON.parse(err.message).message);
        }

        // cancel error 不显示弹出框提示，设置了 error 为 true 的显示错误提示信息
        if (error && !axios.isCancel(err)) createMessage(err.message, "error");
        // NOTE：不再将错误传递至后续 promise 中
        // reject(err);
      })
      .finally(() => {
        // 关闭 loading 组件
        store.state.loading = false;
      });
  });
};

export default request;
