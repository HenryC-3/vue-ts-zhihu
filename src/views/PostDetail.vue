<template>
  <!-- 操作按钮 -->
  <modal
    v-if="isShow"
    @modalClose="handleModalClose"
    @modalConfirm="handleConfirmDelete"
  ></modal>

  <!-- 返回上级页面 -->

  <article
    v-if="currentPost"
    class="flex flex-col items-center bg-white border-t-2px"
  >
    <!-- 头图 -->
    <div v-if="currentImageUrl" class="w-[100%] mt-[1px]">
      <img
        :src="currentImageUrl"
        :alt="currentPost.title"
        class="w-700px h-[360px] object-cover mt-4 rounded mx-auto"
      />
    </div>
    <!-- container -->
    <div class="w-[100%]">
      <div class="md:w-700px mx-auto <md:mx-4">
        <!-- 标题 -->
        <h2
          class="block text-2xl font-semibold tracking-wide mt-4 mb-2 break-all line-clamp-1 overflow-ellipsis"
        >
          {{ currentPost.title }}
        </h2>
        <!-- 作者信息 -->
        <user-profile
          :user="currentPost.author"
          v-if="typeof currentPost.author === 'object'"
          class="border-t-1px border-b-1px"
        ></user-profile>
      </div>
    </div>

    <!-- container -->
    <div class="relative md:w-700px <md:w-[100%] min-h-600px mt-2 mb-4 rounded">
      <!-- 正文 -->
      <div
        v-html="currentHTML"
        class="space-y-6 tracking-wide bg:bg-red-400 <md:mx-4"
      ></div>
      <!-- 编辑按钮 -->
      <div v-if="showEdit" class="flex md:justify-end box-border p-2 rounded">
        <action-button
          @click="handleDelete"
          class="md:w-16 <md:flex-1 <md:border-r-0px btn-red md:mr-4"
          >删除</action-button
        >
        <action-button
          @click="handleModify"
          class="md:w-16 <md:flex-1 btn-light-blue"
          >编辑</action-button
        >
      </div>
    </div>
  </article>
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
import ActionButton from "@/components/ActionButton.vue";
export default {
  name: "PostDetail",
  components: { UserProfile, Modal, ActionButton },
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
        store.state.posts[route.params.id as string].column
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
