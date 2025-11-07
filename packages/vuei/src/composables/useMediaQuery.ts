import { onMounted, onUnmounted, ref } from "vue";

export default function useMediaQuery(query: string) {
  const matches = ref(false);
  let mediaQueryList: MediaQueryList | undefined;

  const updateMatches = (e: MediaQueryListEvent) => {
    matches.value = e.matches;
  };

  onMounted(() => {
    mediaQueryList = window.matchMedia(query);
    matches.value = mediaQueryList.matches; // Initial check
    mediaQueryList.addEventListener("change", updateMatches);
  });

  onUnmounted(() => {
    if (mediaQueryList) {
      mediaQueryList.removeEventListener("change", updateMatches);
    }
  });

  return matches;
}
