<template>
  <div class="container">
    <global-header :user="userData"></global-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GlobalHeader from "./components/GlobalHeader.vue";
import { UserProps } from "./types/types";
import "bootstrap/dist/css/bootstrap.min.css";

const testUserData: UserProps = {
  isLogin: true,
  name: "Henry",
  id: 9527
};

export default defineComponent({
  name: "App",
  components: { GlobalHeader },
  setup() {
    const userData = testUserData;
    return { userData };
  }
});
</script>

<style></style>
