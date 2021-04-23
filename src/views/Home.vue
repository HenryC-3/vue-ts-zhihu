<template>
  <div class="container">
    <column-list :list="data"></column-list>
  </div>

  <div class="d-flex justify-content-center">
    <button class="btn btn-primary" @click="handleLoadMore" v-if="isShow">
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import ColumnList from "../components/ColumnList.vue";
import createMessage from "../components/createMessage";
export default defineComponent({
  name: "Home",
  components: { ColumnList },
  setup() {
    const store = useStore();
    const isShow = ref(true);
    let initialPage = 1;
    onMounted(() => {
      store.dispatch("fetchColumns").then(() => {
        createMessage("专栏列表已更新", "success");
      });
    });
    const currentCount = computed(
      () => Object.keys(store.state.columns).length
    );
    const handleLoadMore = () => {
      store
        .dispatch("fetchColumns", { page: ++initialPage, size: 5 })
        .then(res => {
          // 比较当前已经加载的专栏数与响应中返回的专栏总数，决定“加载更多”按钮的显隐
          isShow.value = currentCount.value < res.data.count ? true : false;
          if (!isShow.value) {
            createMessage("已全部加载完毕", "success");
          }
        });
    };
    return {
      data: computed(() => store.state.columns),
      handleLoadMore,
      isShow
    };
  }
});
</script>
<style></style>
