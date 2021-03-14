<template>
  <h3>新建文章</h3>
  <p>文章标题：</p>
  <validate-input placeholder="请输入文章标题"></validate-input>
  <p>文章内容：</p>
  <validate-input
    placeholder="请输入文章详情"
    :tag="textarea"
    rows="10"
  ></validate-input>
  <button type="submit" class="btn btn-primary btn-outline-light">提交</button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ValidateInput from "../components/ValidateInput.vue";
export default defineComponent({
  name: "CreatePost",
  components: { ValidateInput },
  setup() {
    const textarea = "textarea";
    return {
      textarea
    };
  }
});
</script>
