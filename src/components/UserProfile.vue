<template>
  <card
    :description="userFit.description"
    :img="userFit.avatar?.fitUrl"
    :title="userFit.nickName"
    class="shadown-lg"
  ></card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserProps } from "../types/types";
import { addColumnAvatar } from "../utils/helper";
import Card from "./Card.vue";

export default defineComponent({
  components: { Card },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup(props) {
    addColumnAvatar(props.user, 50, 50);
    return {
      userFit: props.user
    };
  }
});
</script>
