<template>
  <teleport to="#message">
    <div
      v-if="isVisible"
      class="alert global-msg"
      :class="{ 'alert-success': !error.status, 'alert-danger': error.status }"
      role="alert"
    >
      <span>{{ error.message }}</span>
      <button
        type="button"
        class="btn-close"
        @click.prevent="hide"
        aria-label="Close"
      ></button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { ErrorProps } from "@/types/types";
import { useStore } from "vuex";
import useTeleportDom from "../hooks/useTeleportDom";

export default defineComponent({
  name: "Message",
  props: {
    error: {
      type: Object as PropType<ErrorProps>,
      required: true
    }
  },
  setup() {
    const store = useStore();
    const isVisible = ref(false);
    useTeleportDom("div", "message");
    watch(
      computed(() => {
        return store.state.error.message;
      }),
      () => {
        isVisible.value = true;
      }
    );
    const hide = () => {
      isVisible.value = false;
    };
    return {
      hide,
      isVisible
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
