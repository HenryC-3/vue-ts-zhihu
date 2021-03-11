<template>
  <form>
    <div class="mb-3">
      <!--  NOTE：使用具名插槽指定多个 slot -->
      <slot name="default"></slot>
    </div>
    <slot name="submit">
      <!-- NOTE：在 slot 内容渲染默认内容 -->
      <button type="submit" class="btn btn-primary">登录</button>
    </slot>
  </form>
</template>

<script>
export default {
  setup() {
    //
  }
};
</script>
