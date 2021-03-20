<template>
  <validate-form @form-submit="onFormSubmit">
    <!--  -->
    <template #default>
      <label class="form-label">邮箱</label>
      <validate-input
        v-model="email"
        :rules="emailRule"
        type="email"
        placeholder="请输入邮箱"
      ></validate-input>
      <label class="form-label">密码</label>
      <validate-input
        v-model="password"
        :rules="passwordRule"
        type="password"
        placeholder="请输入密码"
      ></validate-input>
    </template>
    <!--  -->
    <template #submit>
      <button type="submit" class="btn btn-danger">提交</button>
    </template>
  </validate-form>
</template>

<script lang="ts">
import ValidateForm from "@/components/ValidateForm.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateInput from "../components/ValidateInput.vue";
import { emailRule, passwordRule } from "../utils/validateRules";

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
              router.push({ name: "home" });
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
