<template>
  <teleport to="#modal">
    <div class="mask shadow-lg flex flex-col justify-center items-center">
      <div
        class="justify-center bg-white flex flex-col w-[300px] h-[150px] rounded opacity-100"
      >
        <!-- 标题 -->
        <h5 class="flex-shrink-0 text-red-600 box-border p-2 border-b-1px">
          提示
        </h5>
        <!-- 信息 -->
        <p class="flex-1 box-border p-2 border-b-1px">
          <slot>确认删除该文章吗？</slot>
        </p>
        <!-- container -->
        <div class="flex box-border justify-end p-2 flex-shrink-0">
          <slot
            ><action-button @click="handleConfirm" class="mr-4 btn-red"
              >确认</action-button
            ></slot
          >
          <slot><action-button @click="handleCancel">取消</action-button></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import useTeleportDom from "@/hooks/useTeleportDom";
import { defineComponent } from "vue";
import ActionButton from "./ActionButton.vue";

// FEAT:完成删除功能

export default defineComponent({
  name: "Modal",
  components: { ActionButton },
  emits: ["modalConfirm", "modalClose"],
  setup(props, context) {
    useTeleportDom("div", "modal");

    const handleCancel = () => {
      context.emit("modalClose");
    };
    const handleConfirm = () => {
      context.emit("modalConfirm");
    };
    return {
      handleCancel,
      handleConfirm
    };
  }
});
</script>
