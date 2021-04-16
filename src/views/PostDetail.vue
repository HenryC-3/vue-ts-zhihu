<template>
  <div>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <!-- 头图 -->
      <img
        :src="currentImageUrl"
        alt="currentPost.title"
        class="rounded-lg img-fluid my-4"
        v-if="currentImageUrl"
      />
      <!-- 标题 -->
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <!-- 用户头像、描述 -->
          <user-profile
            :user="currentPost.author"
            v-if="typeof currentPost.author === 'object'"
          ></user-profile>
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ currentPost.createdAt }}</span
        >
      </div>
      <!-- 文章内容 -->
      <div v-html="currentHTML"></div>
      <!-- 编辑按钮 -->
      <div v-if="showEdit" class="d-flex justify-content-between">
        <button class="btn btn-primary" @click="handleModify">修改</button>
        <button class="btn btn-danger" @click="handleDelete">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { PostProps, AvatarProps } from "../types/types";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import UserProfile from "../components/UserProfile.vue";
import markdownIt from "markdown-it";
export default {
  name: "PostDetail",
  components: { UserProfile },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const md = new markdownIt();
    onMounted(() => {
      store.dispatch("fetchPost", { postId: route.params.id });
    });

    const currentPost = computed<PostProps>(() =>
      store.getters.getCurrentPost(route.params.id)
    );

    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value;
        return (image as AvatarProps).url + "?x-oss-process=image/resize,w_850";
      } else {
        return null;
      }
    });

    const currentHTML = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        const { content, isHTML } = currentPost.value;
        return isHTML ? content : md.render(content);
      }
    });

    const showEdit = computed(() => {
      // 未登录情况下，user.column 一定为空
      return (
        store.state.user.column ===
        store.state.posts.data[route.params.id as string].column
      );
    });

    const handleModify = () => {
      router.push({ path: "/create", query: { postId: route.params.id } });
    };

    const handleDelete = () => {
      //
    };

    return {
      currentPost,
      currentImageUrl,
      currentHTML,
      showEdit,
      handleModify,
      handleDelete
    };
  }
};
</script>
