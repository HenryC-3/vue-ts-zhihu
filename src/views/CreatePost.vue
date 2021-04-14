<template>
  <h3>新建文章</h3>
  <upload
    :action="'/upload'"
    :beforeUpload="handleBeforeUpload"
    @uploading="handleUploading"
    @fileUploaded="handleFileUploaded"
    @uploadedError="handleUploadedError"
    class="d-flex justify-content-center align-items-center bg-light text-secondary w-100 my-4"
  >
    <template #ready>
      <h2>点击上传头图</h2>
    </template>
    <template #uploading>
      <div class="d-flex">
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h2>正在上传</h2>
      </div>
    </template>
  </upload>
  <validate-form @form-submit="onPostSubmit">
    <template #default>
      <p>文章标题：</p>
      <validate-input
        placeholder="请输入文章标题"
        :rules="postTitleRule"
        v-model="title"
      ></validate-input>
      <p>文章内容：</p>
      <validate-input
        placeholder="请输入文章详情"
        :tag="textarea"
        rows="10"
        :rules="postContentRule"
        v-model="content"
      ></validate-input>
    </template>
    <template #submit>
      <button type="submit" class="btn btn-primary btn-outline-light">
        发布文章
      </button>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { AvatarProps } from "@/types/types";
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
import { useStore } from "vuex";
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput from "../components/ValidateInput.vue";
import Upload from "../components/Upload.vue";
import { postTitleRule, postContentRule } from "../utils/validateRules";
import createMessage from "../components/createMessage";
import { useRouter } from "vue-router";
import imageCheck from "../utils/imageCheck";
export default defineComponent({
  name: "CreatePost",
  components: { ValidateInput, ValidateForm, Upload },
  setup() {
    const title = ref("");
    const content = ref("");
    const imageId = ref<string | undefined>("");
    const textarea = "textarea";
    const store = useStore();
    const router = useRouter();
    const { column, _id } = store.state.user;

    const onPostSubmit = (result: boolean) => {
      if (result) {
        const post = {
          content: content.value,
          title: title.value,
          image: imageId.value,
          column: column,
          author: _id
        };
        store
          .dispatch("createPost", { post })
          .then(res => {
            createMessage("创建成功，即将跳转至专栏页", "success");
            setTimeout(() => {
              router.push({ path: `/column/${column}` });
            }, 1000);
          })
          .catch(e => {
            createMessage("创建失败，即将跳转至首页", "error");
            setTimeout(() => {
              router.push({ path: `/` });
            }, 1000);
          });
      }
    };
    const handleUploading = () => {
      createMessage("上传中", "default");
    };
    const handleFileUploaded = (rawData: AvatarProps) => {
      imageId.value = rawData._id;
      createMessage("上传成功", "success");
    };
    const handleUploadedError = () => {
      createMessage("上传失败", "error");
    };
    const handleBeforeUpload = (file: File): boolean => {
      const { passed, error } = imageCheck(file, {
        type: ["image/png"],
        size: 1
      });

      if (error === "format") {
        createMessage("文件类型必须为 png", "error");
      } else {
        createMessage("文件过大", "error");
      }

      return passed;
    };
    return {
      textarea,
      postTitleRule,
      postContentRule,
      title,
      content,
      onPostSubmit,
      handleUploading,
      handleFileUploaded,
      handleUploadedError,
      handleBeforeUpload
    };
  }
});
</script>
