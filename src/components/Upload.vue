<template>
  <button
    v-if="uploadingStatus === 'ready'"
    class="btn btn-primary"
    @click.prevent="triggerUpload"
  >
    点击上传
  </button>
  <button v-else-if="uploadingStatus === 'uploading'">正在上传</button>
  <button
    v-else-if="uploadingStatus === 'success'"
    class="btn btn-success"
    @click.prevent="triggerUpload"
  >
    上传成功, 重新上传
  </button>
  <button
    v-else-if="uploadingStatus === 'error'"
    class="btn btn-danger"
    @click.prevent="triggerUpload"
  >
    上传失败，重新上传
  </button>
  <input type="file" ref="inputRef" class="d-none" @change="handleFileChange" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { uploadingStatus } from "../types/types";
import axios from "axios";

export default defineComponent({
  name: "Upload",
  props: {
    action: {
      type: String,
      required: true
    },
    BeforeUpload: Function
  },
  emits: ["uploading", "fileUploaded", "uploadedError"],
  setup(props, context) {
    // NOTE: HTMLInputElement 继承了 HTMLElement
    // [HTMLInputElement - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)
    // [javascript - why we are using HTMLInputElement in typescript? - Stack Overflow](https://stackoverflow.com/questions/52325814/why-we-are-using-htmlinputelement-in-typescript)
    const inputRef = ref<null | HTMLInputElement>(null);
    const uploadingStatus = ref<uploadingStatus>("ready");
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
        })
        .catch(() => {
          uploadingStatus.value = "error";
          context.emit("uploadedError");
        });
    };

    return {
      inputRef,
      triggerUpload,
      handleFileChange,
      uploadingStatus
    };
  }
});
</script>
