<template>
  <div>
    <column-list :list="data" class="mx-auto"></column-list>
    <load-more-button
      :currentCount="count"
      :params="{ page: 2, size: 5 }"
      :action="`fetchColumns`"
      @isLastPage="handleLastPage"
      >加载更多</load-more-button
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import ColumnList from "../components/ColumnList.vue";
import createMessage from "../components/createMessage";
import LoadMoreButton from "@/components/LoadMoreButton.vue";
export default defineComponent({
  name: "Home",
  components: { ColumnList, LoadMoreButton },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("fetchColumns").then(() => {
        createMessage("专栏列表已更新", "success");
      });
    });

    const handleLastPage = () => {
      createMessage("全部加载完毕", "success");
    };

    return {
      data: computed(() => store.state.columns),
      count: {
        count: computed(() => Object.keys(store.state.columns).length) //NOTE: 查看 useLoadMore 中关于此处参数的说明
      },
      handleLastPage
    };
  }
});
</script>
