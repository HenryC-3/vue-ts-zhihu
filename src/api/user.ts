import { AxiosResponse } from "axios";
import request from "../utils/request";
import { store } from "../utils/store";

export function userLogin(email: string, password: string) {
  return request("/user/login", "post", { email, password });
}

/**
 * @description 如果用户处于登录状态，取消发送该请求
 */
export function fetchCurrentUser(): Promise<AxiosResponse> {
  return store.state.user.isLogin
    ? request("/user/current", "get", null, { cache: true })
    : request("/user/current", "get");
}

export function userSignUp(email: string, password: string, nickName: string) {
  request("/users", "post", {
    email,
    password,
    nickName
  });
}
