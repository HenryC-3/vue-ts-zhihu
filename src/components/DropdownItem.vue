<template>
  <!-- IMPR: 修改 div 为 li -->
  <div :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped>
.is-disabled * {
  color: #8d959c;
  pointer-events: none;
  background-color: transparent;
}
</style>
