<template>
  <!-- ColumnDetail Header -->
  <div class="card col-8 border-0 flex-row" style="margin:50px auto 100px auto">
    <div class="card-body">
      <h5 class="card-title">干货考研经验</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
    </div>
    <img
      src="../assets/defaultImg.jpg"
      class="rounded-circle border border-light me-5"
    />
  </div>
  <post-list :posts="posts"></post-list>
</template>

<script lang="ts">
import PostList from "@/components/PostList.vue";
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
    });
    return {
      // 现在直接返回对应专栏文章列表，无需过滤
      posts: computed(() => store.state.posts)
    };
  }
});
</script>
