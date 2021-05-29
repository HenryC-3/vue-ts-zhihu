<template>
  <!-- container -->
  <div class="bg-white flex pt-2 pb-2">
    <!-- img -->
    <slot name="img">
      <img
        :src="img"
        class="w-14 h-14 rounded-1 border border-green-600 py-[2px] px-[2px] shadow-lg self-center flex-shrink-0 mr-4"
      />
    </slot>
    <!-- container -->
    <div class="flex-1 h-4 items-start">
      <!-- title -->
      <slot name="title">
        <h5
          class=" font-semibold text-base break-all line-clamp-1 overflow-ellipsis"
        >
          {{ title }}
        </h5>
      </slot>
      <!-- description -->
      <slot name="description">
        <p
          class="text-gray-500 text-sm break-all line-clamp-2 overflow-ellipsis"
        >
          {{ description }}
        </p>
      </slot>
    </div>
    <!-- button -->
    <div class="self-center flex-shrink-0">
      <slot name="button">
        <a href="#" class="text-green-600 text-sm">{{ buttonText }}</a></slot
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    img: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    buttonText: String
  }
});
</script>
