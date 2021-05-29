<template>
  <!-- 专栏详情 -->
  <div v-if="column" class="w-[100%] bg-white mt-[1px] mx-auto ">
    <!-- container -->
    <card
      :title="column.title"
      :description="column.description"
      class="box-border p-4 md:w-768px mx-auto"
    >
      <template #img>
        <img
          :src="column.avatar && column.avatar.fitUrl"
          class="w-18 h-18 rounded-1 border border-green-600 py-[2px] px-[2px] shadow-lg self-center flex-shrink-0 mr-4"
        />
      </template>

      <template #title>
        <h5
          class=" font-semibold text-lg break-all line-clamp-1 overflow-ellipsis pt-2"
        >
          {{ column.title }}
        </h5>
      </template>
      ></card
    >
  </div>
  <!-- 文章列表 -->
  <div class="md:w-[768px] mt-4 mx-auto">
    <post-list :posts="posts"></post-list>
  </div>
  <!-- 加载更多 -->
  <load-more-button
    :currentCount="count"
    :params="{ page: 2, size: 2, columnId }"
    :action="`fetchPosts`"
    @isLastPage="handleLastPage"
    >加载更多</load-more-button
  >
</template>

<script lang="ts">
import PostList from "@/components/PostList.vue";
import LoadMoreButton from "@/components/LoadMoreButton.vue";
import { ColumnProps, PostProps } from "@/types/types";
import { addColumnAvatar } from "@/utils/helper";
import createMessage from "../components/createMessage";
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Card from "@/components/Card.vue";

export default defineComponent({
  components: { PostList, LoadMoreButton, Card },
  name: "ColumnDetail",
  setup() {
    const route = useRoute();
    const store = useStore();
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

    const handleLastPage = () => {
      createMessage("全部加载完毕", "success");
    };

    return {
      posts: currentColumnPosts,
      column,
      count: {
        count: computed(() => Object.keys(store.state.posts).length) //NOTE: 查看 useLoadMore 中关于此处参数的说明
      },
      handleLastPage,
      columnId: route.params.id
    };
  }
});
</script>
