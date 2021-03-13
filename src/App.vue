<template>
  <div class="container">
    <global-header :user="userData"></global-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import GlobalHeader from "./components/GlobalHeader.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: { GlobalHeader },
  setup() {
    const store = useStore();
    return { userData: computed(() => store.state.user) };
  }
});
</script>

<style></style>
