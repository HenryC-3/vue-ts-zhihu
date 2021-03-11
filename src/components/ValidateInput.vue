<template>
  <input
    type="email"
    class="form-control"
    @blur="validateEmail"
    v-model="emailRef.val"
    :class="{ 'is-invalid': emailRef.error }"
  />
  <div class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailRef = reactive({
      val: "",
      error: false,
      message: ""
    });
    const validateEmail = () => {
      if (emailRef.val.trim() === "") {
        emailRef.error = true;
        emailRef.message = "邮箱不能为空";
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true;
        emailRef.message = "邮箱格式错误";
      } else {
        emailRef.error = false;
      }
    };

    return {
      emailRef,
      validateEmail
    };
  }
});
</script>
