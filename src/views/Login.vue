<template>
  <div></div>
  <form>
    <div class="mb-3">
      <label class="form-label">邮箱</label>
      <validate-input></validate-input>
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
import ValidateInput from "../components/ValidateInput.vue";

export default defineComponent({
  name: "Login",
  components: { ValidateInput },
  setup() {
    //
  }
});
</script>
