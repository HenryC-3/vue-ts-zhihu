<template>
  <div class="login-page mx-auto p-3" style="max-width: 330px">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRule"
          v-model="email"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRule"
          v-model="password"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">
          登录
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import ValidateForm from "@/components/ValidateForm.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateInput from "../components/ValidateInput.vue";
import { emailRule, passwordRule } from "../utils/validateRules";
import createMessage from "../components/createMessage";

export default defineComponent({
  name: "Login",
  components: { ValidateInput, ValidateForm },
  setup() {
    const email = ref("");
    const password = ref("");

    const store = useStore();
    const router = useRouter();
    const onFormSubmit = (result: boolean) => {
      // 如果验证通过，跳转到首页
      if (result) {
        const payload = {
          email: email.value,
          password: password.value
        };
        store.dispatch("login", payload).then(res => {
          store.dispatch("fetchCurrentUser", res).then(
            res => {
              createMessage("登录成功，即将跳转至首页", "success");
              setTimeout(() => {
                router.push({ name: "home" });
              }, 2000);
            },
            e => {
              console.log(e);
            }
          );
        });
      }
    };
    return {
      emailRule,
      passwordRule,
      onFormSubmit,
      email,
      password
    };
  }
});
</script>
