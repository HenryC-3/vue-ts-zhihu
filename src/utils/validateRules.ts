import { RulesProp } from "../types/types";

export const emailRule: RulesProp = [
  { type: "required", message: "邮箱不能为空" },
  { type: "email", message: "邮箱格式错误" }
];
