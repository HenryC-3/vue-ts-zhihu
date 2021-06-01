<template>
  <div class="bg-white mt-[1px]">
    <!-- container -->
    <div class="pt-4">
      <!-- 上传组件 -->
      <upload
        :action="'/upload'"
        :status="isSuccess"
        :fileChecker="handleFileChecker"
        @uploading="handleUploading"
        @fileUploaded="handleFileUploaded"
        @uploadedError="handleUploadedError"
        class="mx-auto cursor-pointer"
      >
        <!-- 未上传时样式 -->
        <template #ready>
          <h2 class="text-2xl text-gray-600">点击上传头图</h2>
        </template>
        <!-- 上传时样式 -->
        <template #uploading>
          <loading :loading="true" :hasMask="false" :teleport="false"></loading>
        </template>
        <!-- 上传成功样式 -->
        <template #success="dataProps">
          <!-- 如果 uploadImgURL 不存在则使用 currentPostURL -->
          <img
            :src="dataProps.uploadImgURL || currentPostImgURL"
            class="object-cover h-360px"
          />
        </template>
        <template #error>
          <h2 class="text-2xl text-gray-600">点击重新上传</h2>
        </template>
      </upload>
    </div>

    <!-- container -->
    <div class="mt-4 md:w-700px mx-auto">
      <!-- 表单组件 -->
      <validate-form @form-submit="onPostSubmit">
        <template #default>
          <validate-input
            placeholder="请输入标题"
            :rules="postTitleRule"
            v-model="title"
            class="text-2xl w-[100%]"
          ></validate-input>
          <validate-input
            placeholder="请输入内容"
            :tag="textarea"
            rows="10"
            :rules="postContentRule"
            v-model="content"
            class="w-[100%]"
          ></validate-input>
        </template>
        <template #submit>
          <action-button type="submit" class="btn-light-blue self-end">
            <div v-if="!postId">发布文章</div>
            <div v-else>更新文章</div>
          </action-button>
        </template>
      </validate-form>
    </div>
  </div>
</template>

<script lang="ts">
import { AvatarProps } from "@/types/types";
import { computed, defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
import { useStore } from "vuex";
import ValidateForm from "@/components/ValidateForm.vue";
import ValidateInput from "../components/ValidateInput.vue";
import ActionButton from "@/components/ActionButton.vue";
import Loading from "@/components/Loading.vue";
import Upload from "../components/Upload.vue";
import { postTitleRule, postContentRule } from "../utils/validateRules";
import createMessage from "../components/createMessage";
import { useRoute, useRouter } from "vue-router";
import imageCheck from "../utils/imageCheck";
export default defineComponent({
  name: "CreatePost",
  components: { ValidateInput, ValidateForm, Upload, ActionButton, Loading },
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
    // NOTE：在 request.ts 中返回了一个 new Promise，当请求被取消时，该 Promise 会捕获一个 cancel 错误
    // 对于这类错误的处理是，不向后传递，即不使用 reject。这就导致了当请求取消时，既不会 resolve 也不会 reject
    // 进而导致后续调用 then 无效 [如果 new Prmoise 不 resolve reject 会怎样](https://codepen.io/henryc-3/pen/ExWobBK?editors=0011)

    // NOTE: 这里使用 Promise 是为了应对，修改文章但 vuex 中无数据的情况，确保先发送请求，后获取数据
    if (postId) {
      Promise.resolve()
        .then(() => {
          store.dispatch("fetchPost", { postId });
        })
        .then(() => {
          if (post.value) {
            const {
              title: currTitle,
              content: currContent,
              image
            } = post.value;
            title.value = currTitle;
            content.value = currContent;
            if (image.url) {
              currentPostImgURL.value = image.url;
            } else {
              isSuccess.value = false;
            }
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
            createMessage("即将跳转至专栏页", "success");
            setTimeout(() => {
              router.push({ path: `/column/${column}` });
            }, 1000);
          })
          .catch(e => {
            createMessage("即将跳转至首页", "error");
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
    const handleFileChecker = (file: File): boolean => {
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
      handleFileChecker,
      postId,
      isSuccess,
      currentPostImgURL
    };
  }
});
</script>
