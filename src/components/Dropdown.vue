<template>
  <!-- 使用 ref 获取 DOM 元素 -->
  <div ref="dropdownRef" class="flex flex-col relative w-38">
    <action-button @click.prevent="toggleOpen" class="w-[100%] btn-light-blue">
      {{ title }}
    </action-button>
    <!-- constainer -->
    <div
      v-if="isOpen"
      class="absolute top-36px w-[100%] rounded shadow-lg flex flex-col"
    >
      <div class="triangle self-center"></div>
      <!-- 点击下拉列表后收起 -->
      <div class="bg-white">
        <!-- 下拉列表 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import useClickOutside from "@/hooks/useClickOutside";
import { watch } from "@vue/runtime-core";
import ActionButton from "./ActionButton.vue";
export default {
  name: "Dropdown",
  components: { ActionButton },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const { onClickOutside, addHandler, removeHandler } = useClickOutside(
      dropdownRef
    );
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value) addHandler();
    };
    watch(onClickOutside, () => {
      if (onClickOutside.value && isOpen.value === true) {
        isOpen.value = false;
        removeHandler();
      }
    });
    return {
      toggleOpen,
      isOpen,
      dropdownRef
    };
  }
};
</script>

<style scoped>
.triangle {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid white;
}
</style>
