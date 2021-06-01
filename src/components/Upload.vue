<template>
  <!-- container -->
  <div
    @click.prevent="triggerUpload"
    v-bind="$attrs"
    class="flex justify-center items-center rounded md:w-700px h-360px"
    :class="[
      uploadingStatus !== 'success'
        ? 'border-3 border-dashed border-gray-500 bg-gray-100'
        : ''
    ]"
  >
    <!-- 未上传样式 -->
    <slot v-if="uploadingStatus === 'ready'" name="ready">
      <button class="btn btn-gray">
        点击上传
      </button>
    </slot>
    <!-- 上传样式 -->
    <slot v-else-if="uploadingStatus === 'uploading'" name="uploading">
      <button class="btn btn-gray is-disabled">正在上传</button>
    </slot>
    <!-- 上传成功样式 -->
    <slot
      v-else-if="uploadingStatus === 'success'"
      name="success"
      :uploadImgURL="uploadImgURL"
    >
      <img :src="uploadImgURL" />
    </slot>
    <!-- 上传失败样式 -->
    <slot v-else-if="uploadingStatus === 'error'" name="error">
      <button class="btn btn-red">
        上传失败，重新上传
      </button>
    </slot>
  </div>
  <input type="file" ref="inputRef" class="hidden" @change="handleFileChange" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { uploadingStatus } from "../types/types";
import { fileUpload } from "@/api/file";

export default defineComponent({
  name: "Upload",
  props: {
    // 目标地址
    action: {
      type: String,
      required: true
    },
    // 图片发送之前的检查
    fileChecker: Function,
    // 指定上传组件状态
    status: {
      type: Boolean,
      required: true
    }
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

    // NOTE：点击修改按钮时，status 为 true，显示当前文章上传的图片
    uploadingStatus.value = props.status ? "success" : "ready";

    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      const formData = new FormData();
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files);
        formData.append("uploadImg", files[0]);
        if (props.fileChecker) {
          // 如果文件验证失败，不进行后续操作
          if (!props.fileChecker(files[0])) {
            uploadingStatus.value = "error";
            return;
          }
        }
      }
      uploadingStatus.value = "uploading";
      context.emit("uploading");
      fileUpload(formData)
        .then(res => {
          uploadingStatus.value = "success";
          uploadImgURL.value = res.data.data.url;
          context.emit("fileUploaded", res.data.data);
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
