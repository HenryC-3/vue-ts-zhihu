<template>
  <modal
    :isShow="isShow"
    @modalClose="handleModalClose"
    @modalConfirm="handleConfirmDelete"
    >确定删除文章吗？</modal
  >
  <div>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <!-- 头图 -->
      <div class="post-image-container">
        <img
          :src="currentImageUrl"
          alt="currentPost.title"
          class="post-image"
          v-if="currentImageUrl"
        />
      </div>
      <!-- 标题 -->
      <h2 class="mt-4 mb-4">{{ currentPost.title }}</h2>
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
        <span class="text-muted col text-end font-italic"
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
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import UserProfile from "../components/UserProfile.vue";
import markdownIt from "markdown-it";
import Modal from "@/components/Modal.vue";
import createMessage from "@/components/createMessage";
export default {
  name: "PostDetail",
  components: { UserProfile, Modal },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const md = new markdownIt();
    const isShow = ref(false);
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
      isShow.value = true;
    };

    const handleModalClose = () => {
      isShow.value = false;
    };

    const handleConfirmDelete = () => {
      store.dispatch("deletePost", { postId: route.params.id }).then(res => {
        createMessage("删除成功，即将跳转到专栏首页", "success");
        router.push({ path: `/column/${res.data.column}` });
      });
    };
    return {
      currentPost,
      currentImageUrl,
      currentHTML,
      showEdit,
      handleModify,
      handleDelete,
      handleModalClose,
      isShow,
      handleConfirmDelete
    };
  }
};
</script>

<style scoped>
.post-image-container {
  height: 200px;
  cursor: pointer;
}
.post-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
