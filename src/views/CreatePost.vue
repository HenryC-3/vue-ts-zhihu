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
import { PostProps } from "@/types/types";
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
    const textarea = "textarea";
    const store = useStore();
    const router = useRouter();
    const columnId = store.state.user.columnId;
    // BUG:此处未接入后端 API，新建的文章临时储存在 vuex 中
    const onPostSubmit = (result: boolean) => {
      if (result) {
        const post: PostProps = {
          _id: Math.floor(Math.random() * 10).toString(),
          excerpt: "",
          content: content.value,
          title: title.value,
          createdAt: new Date().toDateString(),
          // 用户创建的文章，包含在该用户的创建的专栏中，用 columnId 标识该文章属于哪个专栏
          columnId: columnId
        };
        store.commit("createPost", post);
        router.push({ path: `/column/${columnId}` });
      }
    };
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
