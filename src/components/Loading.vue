<template>
  <!-- 挂载在 div#loading 上 -->
  <teleport to="#loading">
    <h1 v-if="loading">😄 正在加载</h1>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    // 创建 teleport 挂载 DOM 节点
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    const rootDiv = document.getElementById("app");
    document.body.insertBefore(loadingDiv, rootDiv);
  }
});
</script>
