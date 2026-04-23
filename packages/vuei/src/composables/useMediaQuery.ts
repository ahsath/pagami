import { onMounted, onUnmounted, ref } from "vue";

export default function useMediaQuery(query: string) {
  const matches = ref(false);
  let mediaQueryList: MediaQueryList | undefined;

  function updateMatches(e: MediaQueryListEvent) {
    document.body.classList.add("is-resizing");
    matches.value = e.matches;
    setTimeout(() => {
      document.body.classList.remove("is-resizing");
    }, 200);
  }

  onMounted(() => {
    document.body.classList.add("is-resizing");
    mediaQueryList = window.matchMedia(query);
    if (matches.value !== mediaQueryList.matches) {
      matches.value = mediaQueryList.matches;
    }
    mediaQueryList.addEventListener("change", updateMatches);

    setTimeout(() => {
      document.body.classList.remove("is-resizing");
    }, 200);
  });

  onUnmounted(() => {
    if (mediaQueryList) {
      mediaQueryList.removeEventListener("change", updateMatches);
    }
  });

  return matches;
}
