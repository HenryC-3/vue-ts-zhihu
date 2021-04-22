<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>
          <router-link :to="`/post/${post._id}`" class="post-title">{{
            post.title
          }}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div
            v-if="post.image && typeof post.image !== 'string'"
            class="col-4"
          >
            <img
              :src="post.image.fitUrl"
              :alt="post.title"
              class="rounded-lg w-100"
            />
          </div>
          <p :class="{ 'col-8': post.image }" class="text-muted">
            {{ post.excerpt }}
          </p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { PostProps, AvatarProps } from "../types/types";
import { generateFitUrl } from "../utils/helper";

export default defineComponent({
  name: "PostList",
  props: {
    posts: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  },
  setup(props) {
    // 为 posts 添加 fitUrl 属性
    const list = computed(() => {
      props.posts.map(post => {
        return generateFitUrl(post.image as AvatarProps, 200, 110, ["m_fill"]);
      });
      return props.posts;
    });

    return {
      list
    };
  }
});
</script>

<style scoped>
.post-title {
  text-decoration: none;
  color: black;
}

.post-title:hover {
  color: #0d6efd;
}
</style>
