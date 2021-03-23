<template>
  <upload :action="'upload'"></upload>
  <div class="container">
    <column-list :list="data"></column-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import ColumnList from "../components/ColumnList.vue";
import createMessage from "../components/createMessage";
import Upload from "../components/Upload.vue";
export default defineComponent({
  name: "Home",
  components: { ColumnList, Upload },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("fetchColumns").then(() => {
        createMessage("专栏列表已更新", "success");
      });
    });
    return { data: computed(() => store.state.columns) };
  }
});
</script>
<style></style>
