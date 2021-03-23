<template>
  <div class="container">
    <global-header :user="userData"></global-header>
    <loading :loading="loading" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import GlobalHeader from "./components/GlobalHeader.vue";
import Loading from "./components/Loading.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: { GlobalHeader, Loading },
  setup() {
    const store = useStore();
    return {
      userData: computed(() => store.state.user),
      loading: computed(() => store.state.loading)
    };
  }
});
</script>

<style></style>
