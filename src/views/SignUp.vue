<template>
  <!-- container -->
  <div
    class="w-300px bg-white box-border rounded p-2 absolute top-[50%] transform translate-y-[-50%] left-[50%] translate-x-[-50%]"
  >
    <h5 class="text-center text-2xl text-light-blue-600 mb-10">注册</h5>

    <validate-form @form-submit="onFormSubmit">
      <validate-input
        :rules="emailRule"
        v-model="formData.email"
        placeholder="请输入邮箱地址"
        type="text"
        class="w-[100%]"
      />
      <validate-input
        :rules="nameRule"
        v-model="formData.nickName"
        placeholder="请输入昵称"
        type="text"
        class="w-[100%]"
      />
      <validate-input
        type="password"
        placeholder="请输入密码"
        :rules="passwordRule"
        v-model="formData.password"
        class="w-[100%]"
      />
      <validate-input
        type="password"
        placeholder="再次输入密码"
        :rules="repeatPasswordRule"
        v-model="formData.repeatPassword"
        class="w-[100%]"
      />
      <template #submit>
        <action-button class="btn-light-blue">注册</action-button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import ValidateInput from "../components/ValidateInput.vue";
import ValidateForm from "../components/ValidateForm.vue";
import createMessage from "../components/createMessage";
import { RulesProp } from "@/types/types";
import { nameRule, emailRule, passwordRule } from "../utils/validateRules";
import ActionButton from "@/components/ActionButton.vue";

export default defineComponent({
  name: "Signup",
  components: {
    ValidateInput,
    ValidateForm,
    ActionButton
  },
  setup() {
    const formData = reactive({
      email: "",
      nickName: "",
      password: "",
      repeatPassword: ""
    });
    const router = useRouter();
    const repeatPasswordRule: RulesProp = [
      { type: "required", message: "重复密码不能为空" },
      {
        type: "custom",
        validator: () => {
          return formData.password === formData.repeatPassword;
        },
        message: "前后两次密码不相同"
      }
    ];
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: formData.email,
          password: formData.password,
          nickName: formData.nickName
        };
        axios
          .post("/users", payload)
          .then(res => {
            createMessage("注册成功 正在跳转登录页面", "success");
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          })
          .catch(e => {
            console.log(e);
          });
      }
    };
    return {
      emailRule,
      nameRule,
      passwordRule,
      repeatPasswordRule,
      onFormSubmit,
      formData
    };
  }
});
</script>

<style>
.w-330 {
  max-width: 330px;
}
</style>
