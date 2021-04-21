<template>
  <teleport to="#modal">
    <div class="modal-container" v-if="isShow">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">提示</h5>
          </div>
          <div class="modal-body">
            <!-- 自定义文本 -->
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="handleCancel"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="handleConfirm">
              确认
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import useTeleportDom from "@/hooks/useTeleportDom";
import { defineComponent } from "vue";

// FEAT:完成删除功能

export default defineComponent({
  name: "Modal",
  emits: ["modalConfirm", "modalClose"],
  props: {
    isShow: {
      type: Boolean
    }
  },
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

<style scoped>
.modal-container {
  background: rgba(255, 255, 255, 0.5);
  top: 0;
  bottom: 0;
  width: 100%;
  position: fixed;
  z-index: 100;
}
</style>
