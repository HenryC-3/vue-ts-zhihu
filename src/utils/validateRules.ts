import { RulesProp } from "../types/types";

export const emailRule: RulesProp = [
  { type: "required", message: "邮箱不能为空" },
  { type: "email", message: "邮箱格式错误" }
];

export const passwordRule: RulesProp = [
  { type: "required", message: "密码不能为空" }
];

export const postTitleRule: RulesProp = [
  { type: "required", message: "文章标题不能为空" }
];

export const postContentRule: RulesProp = [
  { type: "required", message: "文章内容不能为空" }
];
