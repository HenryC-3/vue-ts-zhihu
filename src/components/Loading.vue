<template>
  <!-- 挂载在 div#loading 上 -->
  <teleport to="#loading">
    <div
      class="loading-container d-flex justify-content-center align-items-center"
      v-if="loading"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";

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
    document.body.appendChild(loadingDiv);
    onUnmounted(() => {
      document.body.removeChild(loadingDiv);
    });
  }
});
</script>
<style scoped>
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  top: 0;
  bottom: 0;
  width: 100%;
  position: fixed;
  z-index: 100;
}
</style>
