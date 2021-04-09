<template>
  <header>{{ post.content }}</header>
</template>

<script lang="ts">
import { ListProps, PostProps } from "../types/types";
import { useRoute } from "vue-router";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "PostDetail",
  setup() {
    const route = useRoute();
    const store = useStore();

    const post = computed(() => {
      const posts = store.state.posts.data as ListProps<PostProps>;
      return posts[route.params.id as string];
    });
    onMounted(() => {
      store.dispatch("fetchPost", { postId: route.params.id });
    });

    return {
      post: post
    };
  }
};
</script>
