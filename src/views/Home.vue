<template>
  <div class="bg-gray-200 min-h-[730px]">
    <column-list :list="data" class="mx-auto"></column-list>
    <a
      @click="loadMorePage"
    v-if="!isLastPage"
      href="#"
      class="btn btn-gray transform hover:translate-y-[-5px] hover:shadow-x-sm active:shadow-none transition-all mx-auto mt-4"
      >加载更多</a
    >
    <div class="invisible h-4"></div>
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
