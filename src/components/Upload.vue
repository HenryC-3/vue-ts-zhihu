<template>
  <div
    class="file-upload-container"
    @click.prevent="triggerUpload"
    v-bind="$attrs"
  >
    <slot v-if="uploadingStatus === 'ready'" name="ready">
      <button class="btn btn-primary">
        点击上传
      </button>
    </slot>
    <slot v-else-if="uploadingStatus === 'uploading'" name="uploading">
      <button class="btn btn-primary is-disabled">正在上传</button>
    </slot>
    <slot v-else-if="uploadingStatus === 'success'" name="success">
      <img :src="uploadImgURL" class="file-upload-image" />
    </slot>
    <slot v-else-if="uploadingStatus === 'error'" name="error">
      <button class="btn btn-danger">
        上传失败，重新上传
      </button>
    </slot>
  </div>
  <input type="file" ref="inputRef" class="d-none" @change="handleFileChange" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// eslint-disable-next-line
import { uploadingStatus } from "../types/types";
import axios from "axios";

export default defineComponent({
  name: "Upload",
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: Function
  },
  emits: ["uploading", "fileUploaded", "uploadedError"],
  setup(props, context) {
    // NOTE: HTMLInputElement 继承了 HTMLElement
    // [HTMLInputElement - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)
    // [javascript - why we are using HTMLInputElement in typescript? - Stack Overflow](https://stackoverflow.com/questions/52325814/why-we-are-using-htmlinputelement-in-typescript)
    const inputRef = ref<null | HTMLInputElement>(null);
    const uploadingStatus = ref<uploadingStatus>("ready");
    const uploadImgURL = ref<string>("");
    const triggerUpload = () => {
      if (inputRef.value) {
        inputRef.value.click();
      }
    };

    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      const formData = new FormData();
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files);
        formData.append("uploadImg", files[0]);
        if (props.beforeUpload) {
          // 如果文件验证失败，不进行后续操作
          if (!props.beforeUpload(files[0])) {
            uploadingStatus.value = "error";
            return;
          }
        }
      }
      uploadingStatus.value = "uploading";
      context.emit("uploading");
      axios
        .post(props.action, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          uploadingStatus.value = "success";
          context.emit("fileUploaded");
          uploadImgURL.value = res.data.data.url;
        })
        .catch(() => {
          uploadingStatus.value = "error";
          context.emit("uploadedError");
        })
        .finally(() => {
          if (inputRef.value) {
            inputRef.value.files = null;
          }
        });
    };

    return {
      inputRef,
      triggerUpload,
      handleFileChange,
      uploadingStatus,
      uploadImgURL
    };
  }
});
</script>

<style>
.file-upload-container {
  height: 200px;
  cursor: pointer;
}
.file-upload-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
