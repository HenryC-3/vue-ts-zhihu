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
  <!-- ColumnDetail Content -->
  <div class="d-grid gap-3">
    <div
      class="card col-8"
      v-for="post in postData"
      :key="post.id"
      style="margin: 0 auto"
    >
      <div class="card-body ">
        <h5 class="card-title">{{ post.title }}</h5>
        <p>{{ post.createdAt }}</p>
        <img :src="post.img" class="d-block" alt="" />
        <p class="card-text d-block">
          {{ post.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "ColumnDetail",
  setup() {
    const route = useRoute();
    const store = useStore();
    return {
      // 封装后
      postData: computed(() =>
        store.getters.getPostByColumnId(Number(route.params.id))
      )
    };
  }
});
</script>
