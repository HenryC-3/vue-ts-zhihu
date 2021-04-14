<template>
  <!-- ColumnDetail Header -->
  <div class="card col-8 border-0 flex-row" style="margin:50px auto 100px auto">
    <div class="card-body">
      <h5 class="card-title">{{ column.title }}</h5>
      <p class="card-text">
        {{ column.description }}
      </p>
    </div>
    <img
      :src="column.avatar && column.avatar.url"
      class="rounded-circle border border-light me-5"
    />
  </div>
  <post-list :posts="posts"></post-list>
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
