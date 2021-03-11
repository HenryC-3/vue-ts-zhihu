<template>
  <input
    class="form-control"
    @blur="validateEmail"
    v-model="inputRef.val"
    :class="{ 'is-invalid': inputRef.error }"
    v-bind="$attrs"
  />
  <div class="form-text" v-if="inputRef.error">{{ inputRef.message }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";

interface RuleProp {
  type: "required" | "email";
  message: string;
}

export type RulesProp = RuleProp[];

export default defineComponent({
  name: "ValidateInput",
  props: {
    rules: Array as PropType<RulesProp>
  },
  setup(props) {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const inputRef = reactive({
      val: "",
      error: false,
      message: ""
    });
    const validateEmail = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          inputRef.message = rule.message;
          let passed = true;
          switch (rule.type) {
            case "required":
              passed = inputRef.val.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.val);
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
      }
    };

    return {
      inputRef,
      validateEmail
    };
  }
});
</script>
