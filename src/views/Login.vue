<template>
  <div></div>
  <form>
    <div class="mb-3">
      <label class="form-label">邮箱</label>
      <validate-input :rules="emailRules"></validate-input>
    </div>
    <div class="mb-3">
      <!-- <label class="form-label">密码</label> -->
      <!-- <validate-input></validate-input> -->
    </div>
    <button type="submit" class="btn btn-primary">登录</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";

export default defineComponent({
  name: "Login",
  components: { ValidateInput },
  setup() {
    const emailRules: RulesProp = [
      { type: "required", message: "邮箱不能为空" },
      { type: "email", message: "邮箱格式错误" }
    ];
    return {
      emailRules
    };
  }
});
</script>
