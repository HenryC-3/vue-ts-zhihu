<template>
  <!-- container -->
  <div
    class="w-300px bg-white box-border rounded p-2 absolute top-[50%] transform translate-y-[-50%] left-[50%] translate-x-[-50%]"
  >
    <!-- 标题 -->
    <h5 class="text-center text-2xl text-light-blue-600 mb-10">登录</h5>
    <!-- container -->
    <validate-form @form-submit="onFormSubmit">
      <div>
        <validate-input
          :rules="emailRule"
          v-model="email"
          placeholder="请输入邮箱"
          type="text"
          ref="inputRef"
          class="w-[100%]"
        />
      </div>
      <!-- container -->
      <div>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRule"
          v-model="password"
          class="w-[100%]"
        />
      </div>
      <template #submit>
        <action-button type="submit" class="btn-light-blue">登录</action-button>
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
import ActionButton from "@/components/ActionButton.vue";

export default defineComponent({
  name: "Login",
  components: { ValidateInput, ValidateForm, ActionButton },
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
