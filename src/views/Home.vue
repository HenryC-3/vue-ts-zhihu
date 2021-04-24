<template>
  <div class="container">
    <column-list :list="data"></column-list>
  </div>

  <div class="d-flex justify-content-center">
    <button class="btn btn-primary" @click="loadMorePage" v-if="!isLastPage">
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import useLoadMore from "@/hooks/useLoadMore";
import { computed, defineComponent, onMounted, watch } from "vue";
import { useStore } from "vuex";
import ColumnList from "../components/ColumnList.vue";
import createMessage from "../components/createMessage";
export default defineComponent({
  name: "Home",
  components: { ColumnList },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("fetchColumns").then(() => {
        createMessage("专栏列表已更新", "success");
      });
    });
    const currentCount = computed(
      () => Object.keys(store.state.columns).length
    );
    const { isLastPage, loadMorePage } = useLoadMore(
      "fetchColumns",
      { page: 2, size: 5 },
      currentCount
    );
    // isLastPage 更新存在延迟，因此通过监测 isLastPage 的变化判断是否全部加载完毕
    watch(isLastPage, () => {
      createMessage("全部加载完毕", "success");
    });
    return {
      data: computed(() => store.state.columns),
      isLastPage,
      loadMorePage
    };
  }
});
</script>
