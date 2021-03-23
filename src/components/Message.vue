<template>
  <div
    v-if="isVisible"
    class="alert global-msg"
    :class="styleClass"
    role="alert"
  >
    <span>{{ message }}</span>
    <button
      type="button"
      class="btn-close"
      @click.prevent="hide"
      aria-label="Close"
    ></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { MessageType } from "@/types/types";

export default defineComponent({
  name: "Message",
  props: {
    message: {
      type: String as PropType<string>,
      required: true
    },
    type: {
      type: String as PropType<MessageType>,
      required: true
    }
  },
  setup(props) {
    const isVisible = ref(true);
    const styleClass = {
      "alert-success": props.type === "success",
      "alert-danger": props.type === "error",
      "alert-primary": props.type === "default"
    };

    const hide = () => {
      isVisible.value = false;
    };
    return {
      hide,
      isVisible,
      styleClass
    };
  }
});
</script>
<style scoped>
.global-msg {
  width: 50%;
  position: fixed;
  top: 70.2px;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
}
</style>
