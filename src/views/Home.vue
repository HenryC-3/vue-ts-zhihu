<template>
  <upload
    :action="'upload'"
    :beforeUpload="handleBeforeUpload"
    @uploading="handleUploading"
    @fileUploaded="handleFileUploaded"
    @uploadedError="handleUploadedError"
  >
    <template #uploading>
      <button class="btn btn-primary is-disabled">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </button>
    </template>
  </upload>
  <div class="container">
    <column-list :list="data"></column-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import ColumnList from "../components/ColumnList.vue";
import createMessage from "../components/createMessage";
import Upload from "../components/Upload.vue";
export default defineComponent({
  name: "Home",
  components: { ColumnList, Upload },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("fetchColumns").then(() => {
        createMessage("专栏列表已更新", "success");
      });
    });
    const handleUploading = () => {
      createMessage("上传中", "default");
    };
    const handleFileUploaded = () => {
      createMessage("上传成功", "success");
    };
    const handleUploadedError = () => {
      createMessage("上传失败", "error");
    };
    const handleBeforeUpload = (file: File): boolean => {
      if (file.type !== "image/png") {
        createMessage("文件类型必须为 png", "error");
        return false;
      }
      return true;
    };
    return {
      data: computed(() => store.state.columns),
      handleUploading,
      handleFileUploaded,
      handleUploadedError,
      handleBeforeUpload
    };
  }
});
</script>
<style></style>
