<template>
  <validate-form @form-submit="showValidate">
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
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";

export default defineComponent({
  name: "Login",
  components: { ValidateInput, ValidateForm },
  setup() {
    const emailRules: RulesProp = [
      { type: "required", message: "邮箱不能为空" },
      { type: "email", message: "邮箱格式错误" }
    ];
    const showValidate = (result: boolean) => {
      console.log("验证结果：", result);
    };
    return {
      emailRules,
      showValidate
    };
  }
});
</script>
