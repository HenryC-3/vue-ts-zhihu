<template>
  <h3>新建文章</h3>
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
import { postTitleRule, postContentRule } from "../utils/validateRules";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "CreatePost",
  components: { ValidateInput, ValidateForm },
  setup() {
    const title = ref("");
    const content = ref("");
    const textarea = "textarea";
    const store = useStore();
    const router = useRouter();
    const columnId = store.state.user.columnId;
    const onPostSubmit = (result: boolean) => {
      if (result) {
        const post: PostProps = {
          id: Math.floor(Math.random() * 10),
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
    return {
      textarea,
      postTitleRule,
      postContentRule,
      title,
      content,
      onPostSubmit
    };
  }
});
</script>
