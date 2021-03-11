<template>
  <form>
    <div class="mb-3">
      <!--  NOTE：使用具名插槽指定多个 slot -->
      <slot name="default"></slot>
    </div>
    <!-- 点击提交时触发 form-submit 事件 -->
    <div @click="submitForm">
      <slot name="submit">
        <!-- NOTE：在 slot 内容渲染默认内容 -->
        <button type="submit" class="btn btn-primary">登录</button>
      </slot>
    </div>
  </form>
</template>

<script>
import miit from "mitt";
export const emitter = miit();
export default {
  emits: ["form-submit"],
  setup(props, context) {
    const handler = val => {
      console.log(val);
    };
    emitter.on("form-item-created", handler);
    const submitForm = () => {
      context.emit("form-submit", true);
    };
    return {
      submitForm
    };
  }
};
</script>
