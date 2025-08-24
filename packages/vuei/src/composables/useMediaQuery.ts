import { ref, onMounted } from "vue";

const matches = ref(false);
let listener: ((e: MediaQueryListEvent) => void) | null = null;
let mediaQueryList: MediaQueryList | null = null;

export default function useMediaQuery(query: string) {
  // Use a singleton pattern to ensure the listener is only registered once.
  if (!listener) {
    onMounted(() => {
      mediaQueryList = window.matchMedia(query);
      matches.value = mediaQueryList.matches; // Initial check
      listener = (e: MediaQueryListEvent) => {
        matches.value = e.matches;
      };
      mediaQueryList.addEventListener("change", listener);
    });
  }

  return matches;
}
