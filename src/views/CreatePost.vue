<template>
  <h3 v-if="!postId">新建文章</h3>
  <upload
    :action="'/upload'"
    :status="isSuccess"
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
    <template #success="dataProps">
      <!-- 如果 uploadImgURL 不存在则使用 currentPostURL -->
      <img
        :src="dataProps.uploadImgURL || currentPostImgURL"
        class="file-upload-image"
      />
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
        <div v-if="!postId">发布文章</div>
        <div v-else>更新文章</div>
      </button>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { AvatarProps } from "@/types/types";
import { computed, defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
import { useStore } from "vuex";
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput from "../components/ValidateInput.vue";
import Upload from "../components/Upload.vue";
import { postTitleRule, postContentRule } from "../utils/validateRules";
import createMessage from "../components/createMessage";
import { useRoute, useRouter } from "vue-router";
import imageCheck from "../utils/imageCheck";
export default defineComponent({
  name: "CreatePost",
  components: { ValidateInput, ValidateForm, Upload },
  setup() {
    const title = ref("");
    const content = ref("");
    const currentPostImgURL = ref("");
    const imageId = ref<string | undefined>("");
    const textarea = "textarea";
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const postId = route.query.postId;
    const post = computed(() => store.state.posts[postId as string]);
    const { column, _id } = store.state.user;
    const isSuccess = ref(true);

    // 根据 postId 判断是否为修改状态
    // 在 action 中进行判断：如果该 Id 对应的文章存在，则直接从 store 中读取数据，并填充到输入框中
    if (postId) {
      store.dispatch("fetchPost", { postId }).then(() => {
        const { title: currTitle, content: currContent, image } = post.value;
        title.value = currTitle;
        content.value = currContent;
        if (image.url) {
          currentPostImgURL.value = image.url;
        } else {
          isSuccess.value = false;
        }
      });
    } else {
      isSuccess.value = false;
    }
    const onPostSubmit = (result: boolean) => {
      if (result) {
        const post = {
          content: content.value,
          title: title.value,
          image: imageId.value,
          column: column,
          author: _id,
          postId
        };

        // 新建文章
        const action = postId ? "modifyPost" : "createPost";
        store
          .dispatch(action, { post })
          .then(res => {
            createMessage("成功，即将跳转至专栏页", "success");
            setTimeout(() => {
              router.push({ path: `/column/${column}` });
            }, 1000);
          })
          .catch(e => {
            createMessage("失败，即将跳转至首页", "error");
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
      handleBeforeUpload,
      postId,
      isSuccess,
      currentPostImgURL
    };
  }
});
</script>
