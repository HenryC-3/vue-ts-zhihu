<template>
  <form>
    <div class="mb-3">
      <!--  NOTE：使用具名插槽指定多个 slot -->
      <slot name="default"></slot>
    </div>
    <!-- 点击提交时触发 form-submit 事件 -->
    <div @click.prevent="submitForm">
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
type validateFunc = () => boolean;
const funcArr: validateFunc[] = [];
export default {
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
};
</script>
