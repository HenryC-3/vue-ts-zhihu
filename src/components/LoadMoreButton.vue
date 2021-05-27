<template>
  <a
    @click="loadMorePage"
    v-if="!isLastPage"
    href="#"
    class="btn btn-gray transform hover:translate-y-[-5px] hover:shadow-x-sm active:shadow-none transition-all mx-auto mt-4"
    ><slot></slot
  ></a>
  <div class="invisible h-4"></div>
</template>

<script lang="ts">
import useLoadMore from "@/hooks/useLoadMore";
import { Params } from "@/types/types";
import { ComputedRef, defineComponent, PropType, watch } from "vue";

export default defineComponent({
  name: "LoadMoreButton",
  props: {
    params: {
      type: Object as PropType<Params>,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    currentCount: {
      type: Object as PropType<{ count: ComputedRef }>,
      required: true
    }
  },
  emits: ["isLastPage"],
  setup(props, context) {
    const { isLastPage, loadMorePage } = useLoadMore(
      props.action,
      props.params,
      props.currentCount
    );

    // isLastPage 更新存在延迟，因此通过监测 isLastPage 的变化判断是否全部加载完毕
    watch(isLastPage, () => {
      context.emit("isLastPage");
    });

    return {
      isLastPage,
      loadMorePage
    };
  }
});
</script>
