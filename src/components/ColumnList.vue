<template>
  <div class="flex flex-wrap lg:w-[944px] md:w-[708px] sm:w-[708px]">
    <div
      class="card-container sm:w-[220px] sm:h-[250px] sm:mt-4 sm:mx-2 bg-white box-border py-4 px-4 sm:max-w-[250px] sm:rounded sm:shadow-lg flex sm:flex-col <sm:w-[640px]"
      v-for="column in columnList"
      :key="column.title"
    >
      <!-- img -->
      <img
        :src="column.avatar && column.avatar.fitUrl"
        alt="img"
        class="w-14 h-14 rounded-1 border border-green-600 py-[2px] px-[2px] shadow-lg self-center flex-shrink-0"
      />
      <!-- description -->
      <div class="card-description m-y-4 flex-1 sm:flex sm:flex-col">
        <!-- title -->
        <h5
          class="card-title font-semibold text-base sm:text-center line-clamp-1 overflow-ellipsis"
        >
          {{ column.title }}
        </h5>
        <p
          class="card-description text-gray-500 text-sm sm:text-center sm:pt-2 sm:line-clamp-3 <sm:line-clamp-2 overflow-ellipsis"
        >
          {{ column.description }}
        </p>
      </div>
      <!-- button -->
      <div class="self-center flex-shrink-0">
        <router-link
          href="#"
          class="text-green-600 text-sm sm:btn sm:btn-green sm:shadow-lg"
          :to="`/column/${column._id}`"
          >进入专栏</router-link
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ListProps, ColumnProps } from "../types/types";
import { addColumnAvatar } from "../utils/helper";

export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      // NOTE:为什么要在此处使用类型断言？
      // 为了获取属性提示
      // 添加类型断言后，相当于说明 list 不仅是一个数组，而且这个数组为实现了 ColumnProps interface 的数组，具有 id、title 等属性。见 14 行
      // 在其他地方使用 list 时，比如 setup 函数以及 <template> 组件中，会有完整的属性提示，方便开发
      // <template> 中显示属性提示需要在 vetur 插件中进行设置 vetur.experimental.templateInterpolationService: true, https://vuejs.github.io/vetur/guide/interpolation.html#generic-language-features

      // VIEW:为什么不能直接使用类型断言，而需要 PropType？ [TypeScript 支持 — Vue.js](https://cn.vuejs.org/v2/guide/typescript.html#%E6%A0%87%E6%B3%A8-Prop)
      type: Object as PropType<ListProps<ColumnProps>>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return Object.values(props.list).map(column => {
        addColumnAvatar(column, 50, 50);
        return column;
      });
    });
    return {
      columnList
    };
  }
});
</script>
