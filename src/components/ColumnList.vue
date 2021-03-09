<template>
  <div class="row">
    <!-- BUG: No overload matches this call.The last overload gave the following error-->
    <div v-for="column in list" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <a href="#" class="btn btn-outline-success">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}
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
      type: Array as PropType<ColumnProps[]>,
      require: true
    }
  }
});
</script>
