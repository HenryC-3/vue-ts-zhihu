import { ref, onMounted, onUnmounted, Ref } from "vue";

export default function useClickOutside(elementRef: Ref<null | HTMLElement>) {
  const isClickOutside = ref(false);
  const handler = (e: MouseEvent) => {
    debugger;
    if (elementRef.value?.contains(e.target as Node)) {
      isClickOutside.value = false;
    } else {
      isClickOutside.value = true;
    }
  };

  return {
    onClickOutside: isClickOutside,
    addHandler: () => {
      document.addEventListener("click", handler);
    },
    removeHandler: () => {
      document.removeEventListener("click", handler);
    }
  };
}
