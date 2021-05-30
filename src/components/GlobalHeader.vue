<template>
  <nav class="h-14 bg-white shadow-sm flex items-center justify-between">
    <div @click="homePage" class="flex items-center">
      <img
        src="https://windicss.org/assets/logo.svg"
        alt="logo"
        class="h-12 ml-[16px]"
      />
      <h3
        class="text-light-blue-600 text-lg font-serif tracking-widest cursor-pointer"
      >
        写你所想
      </h3>
    </div>
    <div v-if="!user.isLogin" class="flex mr-[16px]">
      <router-link
        :to="`/login`"
        href="#"
        class="btn btn-light-blue w-18 mr-2 transform transition-all hover:shadow-x-sm hover:translate-y-[-2px]"
        >登录</router-link
      >
      <router-link
        :to="`/signUp`"
        href="#"
        class="btn btn-light-blue w-18 transform transition-all hover:shadow-x-sm hover:translate-y-[-2px]"
        >注册</router-link
      >
    </div>
    <dropdown v-else :title="`你好，${user.nickName}`" class="mr-16px">
      <dropdown-item class="text-center">
        <router-link
          :to="`/create`"
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm tracking-wider hover:bg-gray-200"
          >新建文章</router-link
        >
      </dropdown-item>
      <dropdown-item class="text-center">
        <router-link
          :to="`/column/${user.column}`"
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm tracking-wider hover:bg-gray-200"
          >我的专栏</router-link
        >
      </dropdown-item>
      <dropdown-item :disabled="true" class="text-center">
        <router-link
          :to="`/`"
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm tracking-wider hover:bg-gray-200"
          >编辑资料</router-link
        >
      </dropdown-item>
      <dropdown-item class="text-center">
        <router-link
          :to="`/login`"
          @click="handleLogout"
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm tracking-wider hover:bg-gray-200"
          >退出登录</router-link
        >
      </dropdown-item>
    </dropdown>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
import { UserProps } from "../types/types";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "GlobalHeader",
  components: { Dropdown, DropdownItem },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const handleLogout = () => {
      localStorage.removeItem("token");
      store.commit("logout");
      router.push({ path: "/login" });
    };

    const homePage = () => {
      router.push("/");
    };
    return {
      handleLogout,
      homePage
    };
  }
});
</script>
