<template>
  <validate-form @form-submit="onFormSubmit">
    <!--  -->
    <template #default>
      <label class="form-label">邮箱</label>
      <validate-input
        :rules="emailRules"
        type="text"
        placeholder="请输入邮箱"
      ></validate-input
    ></template>
    <!--  -->
    <template #submit>
      <button type="submit" class="btn btn-danger">提交</button>
    </template>
  </validate-form>
</template>

<script lang="ts">
import ValidateForm from "@/components/ValidateForm.vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateInput from "../components/ValidateInput.vue";
import { RulesProp } from "../types/types";

export default defineComponent({
  name: "Login",
  components: { ValidateInput, ValidateForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    const emailRules: RulesProp = [
      { type: "required", message: "邮箱不能为空" },
      { type: "email", message: "邮箱格式错误" }
    ];
    const onFormSubmit = (result: boolean) => {
      // 如果验证通过，跳转到首页
      if (result) {
        router.push({ name: "home" });
        store.commit("login");
      }
    };
    return {
      emailRules,
      onFormSubmit
    };
  }
});
</script>
