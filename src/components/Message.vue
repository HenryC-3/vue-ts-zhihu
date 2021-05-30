<template>
  <div
    :class="[
      type === 'success' ? 'text-green-500 border-green-300' : '',
      type === 'default' ? 'text-ligth-blue-500 border-ligth-blue-300' : '',
      type === 'error' ? 'text-red-500 border-red-300' : ''
    ]"
    class="fixed top-[10%] left-[50%] transform translate-x-[-50%] box-border p-2 bg-white border-1 border-solid rounded shadow-xl text-sm w-48 h-14 flex justify-center items-center"
  >
    <p>{{ message }}</p>
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
      default: "default"
    }
  },
  setup(props) {
    const isVisible = ref(true);
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
