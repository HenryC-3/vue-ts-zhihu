<template>
  <!-- 使用 ref 获取 DOM 元素 -->
  <div class="flex flex-col mr-[16px]">
    <a
      ref="dropdownRef"
      @click.prevent="toggleOpen"
      href="#"
      class="relative btn btn-light-blue w-38 transform transition-all hover:shadow-x-sm hover:translate-y-[-2px]"
      >{{ title }}</a
    >

    <!-- 添加下拉动画 -->
    <div
      v-if="isOpen"
      class="absolute top-[56px] mt-2 w-38 rounded-md shadow-lg bg-white"
    >
      <div class="trangle absolute top-[-18px] right-[54px] "></div>
      <slot></slot>
    </div>
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

<style scoped>
.dropdown-logout {
  cursor: pointer;
}
.trangle {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid white;
}
</style>
