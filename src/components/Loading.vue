<template>
  <!-- 挂载在 div#loading 上 -->
  <teleport to="#loading">
    <div
      class="loading-container d-flex justify-content-center align-items-center"
    >
      <div class="spinner-border text-primary" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
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
