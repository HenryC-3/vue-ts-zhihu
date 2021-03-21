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
import { defineComponent } from "vue";
import useTeleportDom from "../hooks/useTeleportDom";

export default defineComponent({
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    useTeleportDom("div", "loading");
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
