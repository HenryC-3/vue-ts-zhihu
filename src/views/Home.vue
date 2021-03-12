<template>
  <div class="container">
    <column-list :list="data"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColumnList from "../components/ColumnList.vue";
import { testData } from "../utils/mockData";

export default defineComponent({
  name: "Home",
  components: { ColumnList },
  setup() {
    const data = testData;
    return { data };
  }
});
</script>

<style></style>
