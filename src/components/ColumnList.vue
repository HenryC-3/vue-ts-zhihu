<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar && column.avatar.fitUrl"
            :alt="column.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <!-- <router-link
            class="btn btn-outline-success"
            :to="{ name: 'column', params: { id: column.id } }"
            >进入专栏</router-link
          > -->
          <router-link
            class="btn btn-outline-success"
            :to="`/column/${column._id}`"
            >进入专栏</router-link
          >
        </div>
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
