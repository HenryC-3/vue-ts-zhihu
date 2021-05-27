<template>
  <!-- container -->
  <div
    v-for="post in list"
    :key="post._id"
    class="box-border flex items-center md:py-4 md:px-my-4 <sm:py-2 <sm:px-2 rounded bg-white md:mt-4 <sm:mt-[1px] shadow-sm"
  >
    <!-- img -->
    <div v-if="post.image && post.image !== `string`">
      <img
        :src="post.image.fitUrl"
        :alt="post.title"
        class="h-[100px] w-[100px] object-cover mr-4 rounded border border-green-600 py-[2px] px-[2px] md:shadow-lg self-center flex-shrink-0"
      />
    </div>
    <!-- info -->
    <div class="flex-1 flex flex-col">
      <h4 class="text-gray-800 font-semibold line-clamp-1 overflow-ellipsis">
        <router-link :to="`/post/${post._id}`">{{ post.title }}</router-link>
      </h4>
      <p class="text-sm pt-2 text-gray-500 line-clamp-2 overflow-ellipsis">
        {{ post.excerpt }}
      </p>
      <span class="text-sm pt-2 text-gray-500"
        >发布于：{{ post.createdAt }}</span
      >
    </div>
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
