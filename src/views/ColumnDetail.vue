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
    <post-list :posts="posts"></post-list>
  </div>
</template>

<script lang="ts">
import PostList from "@/components/PostList.vue";
import { PostProps } from "@/types/types";
import { addColumnAvatar } from "@/utils/helper";
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: { PostList },
  name: "ColumnDetail",
  setup() {
    const route = useRoute();
    const store = useStore();
    onMounted(() => {
      store.dispatch("fetchPosts", {
        columnId: route.params.id
      });
      store.dispatch("fetchColumn", {
        columnId: route.params.id
      });
    });
    const column = computed(() => {
      const selectedColumn = store.getters.getColumnById(route.params.id);
      addColumnAvatar(selectedColumn, 50, 50);
      return selectedColumn;
    });

    const currentColumnPosts = computed(() => {
      const posts = Object.values(store.state.posts.data) as PostProps[];
      return posts.filter(post => {
        return post.column === route.params.id;
      });
    });
    return {
      posts: currentColumnPosts,
      column
    };
  }
});
</script>
