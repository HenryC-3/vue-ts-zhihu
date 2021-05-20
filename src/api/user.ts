import request from "../utils/request";

export function userLogin(email: string, password: string) {
  return request("/user/login", "post", { email, password });
}

export function fetchCurrentUser() {
  return request("/user/current", "get", null, { cache: true });
}

export function userSignUp(email: string, password: string, nickName: string) {
  request("/users", "post", {
    email,
    password,
    nickName
  });
}
