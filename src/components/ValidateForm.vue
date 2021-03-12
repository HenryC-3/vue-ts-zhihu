<template>
  <form>
    <div class="mb-3">
      <!--  NOTE：使用具名插槽指定多个 slot -->
      <slot name="default"></slot>
    </div>
    <!-- 点击提交时触发 form-submit 事件 -->
    <div @click.prevent="submitForm">
      <!-- IMPR:点击触发区域为默认宽度 100% 限定点击触发区域为 slot 渲染区域大小-->
      <slot name="submit">
        <!-- NOTE：在 slot 内容渲染默认内容 -->
        <button type="submit" class="btn btn-primary">登录</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import emitter from "../utils/emitter";
import { Handler } from "mitt";
import { defineComponent } from "@vue/runtime-core";
type validateFunc = () => boolean;
const funcArr: validateFunc[] = [];
export default defineComponent({
  // VIEW：为什么之前没用 defineComponent 也
  emits: ["form-submit"],
  setup(props, context) {
    const handler: Handler = (func: validateFunc) => {
      funcArr.push(func);
    };
    emitter.on("form-item-created", handler);
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result);
      context.emit("form-submit", result);
    };
    return {
      submitForm
    };
  }
});
</script>
