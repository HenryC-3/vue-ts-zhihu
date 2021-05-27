<template>
  <!-- 专栏详情 -->
  <div v-if="column" class="w-[100%] bg-white mt-[1px] mx-auto ">
    <div class="bg-white box-border py-4 px-4 flex md:w-[768px] mx-auto">
      <!-- img -->
      <img
        :src="column.avatar && column.avatar.fitUrl"
        alt="img"
        class="w-18 h-18 rounded-1 border border-green-600 py-[2px] px-[2px] shadow-lg self-center flex-shrink-0"
      />
      <!-- info -->
      <div class="m-y-4 flex-1">
        <!-- title -->
        <h5
          class="card-title font-semibold text-lg line-clamp-1 overflow-ellipsis"
        >
          {{ column.title }}
        </h5>
        <p class="text-gray-500 text-sm line-clamp-2 overflow-ellipsis">
          {{ column.description }}
        </p>
      </div>
    </div>
  </div>
  <!-- 文章列表 -->
  <div class="md:w-[768px] mt-4 mx-auto">
    <post-list :posts="posts"></post-list>
  </div>

  <a
    @click="loadMorePage"
    v-if="!isLastPage"
    href="#"
    class="btn btn-gray transform hover:translate-y-[-5px] hover:shadow-x-sm active:shadow-none transition-all mx-auto mt-4"
    >加载更多</a
  >
  <div class="invisible h-4"></div>
</template>

<script lang="ts">
import PostList from "@/components/PostList.vue";
import useLoadMore from "@/hooks/useLoadMore";
import { ColumnProps, PostProps } from "@/types/types";
import { addColumnAvatar } from "@/utils/helper";
import createMessage from "../components/createMessage";
import { computed, ComputedRef, defineComponent, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: { PostList },
  name: "ColumnDetail",
  setup() {
    const route = useRoute();
    const store = useStore();
    const currentCount = computed(() => Object.keys(store.state.posts).length);
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

    const column: ComputedRef<ColumnProps> = computed(() => {
      const selectedColumn = store.getters.getColumnById(route.params.id);
      if (selectedColumn) {
        addColumnAvatar(selectedColumn, 50, 50);
      }
      return selectedColumn;
    });

    const currentColumnPosts = computed(() => {
      const posts = Object.values(store.state.posts) as PostProps[];
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
