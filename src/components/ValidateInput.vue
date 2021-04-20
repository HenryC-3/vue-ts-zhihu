<template>
  <input
    v-if="tag === 'input'"
    class="form-control"
    @blur="validateInput"
    v-model="inputRef.val"
    :class="{ 'is-invalid': inputRef.error }"
    v-bind="$attrs"
  />
  <div class="form-text" v-if="inputRef.error">{{ inputRef.message }}</div>
  <textarea
    v-if="tag === 'textarea'"
    class="form-control"
    @blur="validateInput"
    v-model="inputRef.val"
    :class="{ 'is-invalid': inputRef.error }"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, computed } from "vue";
import emitter from "../utils/emitter";
import { RulesProp, TagType } from "../types/types";

export default defineComponent({
  name: "ValidateInput",
  emits: ["update:modelValue"],
  props: {
    rules: Array as PropType<RulesProp>,
    // NOTE: [组件基础 | Vue.js](https://v3.cn.vuejs.org/guide/component-basics.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model)
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: "input"
    }
  },
  setup(props, context) {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || "",
        set: val => {
          context.emit("update:modelValue", val);
        }
      }),
      error: false,
      message: ""
    });
    const validateInput = () => {
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
        return allPassed;
      }
      return true;
    };

    onMounted(() => {
      emitter.emit("form-item-created", validateInput);
    });

    return {
      inputRef,
      validateInput
    };
  }
});
</script>
