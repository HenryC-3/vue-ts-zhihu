<template> <h1 v-if="loading">😄 正在加载</h1></template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
});
</script>
