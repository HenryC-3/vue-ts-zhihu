<template>
  <div class="container">
    <column-list :list="data"></column-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import ColumnList from "../components/ColumnList.vue";
export default defineComponent({
  name: "Home",
  components: { ColumnList },
  setup() {
    const store = useStore();
    return { data: computed(() => store.state.columns) };
  }
});
</script>
<style></style>
