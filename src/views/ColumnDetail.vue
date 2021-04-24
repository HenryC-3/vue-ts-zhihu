<template>
  <!-- ColumnDetail Header -->
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar && column.avatar.fitUrl"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <!-- 文章列表 -->
    <post-list :posts="posts"></post-list>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary" @click="loadMorePage" v-if="!isLastPage">
        加载更多
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import PostList from "@/components/PostList.vue";
import useLoadMore from "@/hooks/useLoadMore";
import { PostProps } from "@/types/types";
import { addColumnAvatar } from "@/utils/helper";
import createMessage from "../components/createMessage";
import { computed, defineComponent, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: { PostList },
  name: "ColumnDetail",
  setup() {
    const route = useRoute();
    const store = useStore();
    const currentCount = computed(
      () => Object.keys(store.state.posts.data).length
    );
    onMounted(() => {
      store.dispatch("fetchPosts", {
        columnId: route.params.id,
        page: 1,
        size: 2 // NOTE: 为展示加载更多功能，特地请求少量文章
      });
      store.dispatch("fetchColumn", {
        columnId: route.params.id
      });
    });
    const column = computed(() => {
      const selectedColumn = store.getters.getColumnById(route.params.id);
      if (selectedColumn) {
        addColumnAvatar(selectedColumn, 50, 50);
      }
      return selectedColumn;
    });

    const currentColumnPosts = computed(() => {
      const posts = Object.values(store.state.posts.data) as PostProps[];
      return posts.filter(post => {
        return post.column === route.params.id;
      });
    });

    const { isLastPage, loadMorePage } = useLoadMore(
      "fetchPosts",
      {
        columnId: route.params.id,
        page: 2,
        size: 2
      },
      currentCount
    );

    watch(isLastPage, () => {
      createMessage("全部加载完毕", "success");
    });

    return {
      posts: currentColumnPosts,
      column,
      isLastPage,
      loadMorePage
    };
  }
});
</script>
