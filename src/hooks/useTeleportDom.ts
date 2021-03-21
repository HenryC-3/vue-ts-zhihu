import { onUnmounted } from "vue";

export default function useTeleportDom(tag: string, id: string) {
  const teleportTag = document.createElement(tag);
  teleportTag.id = id;
  document.body.appendChild(teleportTag);
  onUnmounted(() => {
    document.body.removeChild(teleportTag);
  });
}
