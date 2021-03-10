<template>
  <!-- 使用 ref 获取 DOM 元素 -->
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import useClickOutside from "@/hooks/useClickOutside";
import { watch } from "@vue/runtime-core";
export default {
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const isClickOutside = useClickOutside(dropdownRef);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    watch(isClickOutside, () => {
      if (isClickOutside.value && isOpen.value === true) {
        isOpen.value = false;
      }
    });
    return {
      toggleOpen,
      isOpen,
      // 获取 DOM 元素
      dropdownRef
    };
  }
};
</script>
