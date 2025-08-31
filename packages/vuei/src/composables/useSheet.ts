import { reactive, computed, watch, ref, type ComputedRef } from "vue";
import useMediaQuery from "./useMediaQuery";

interface BaseSheet {
  isOpen: boolean;
  type?: "modal" | "standard" | "auto";
}

interface SheetState extends BaseSheet {
  isModal: ComputedRef<boolean>;
  toggle: () => void;
}

interface SheetsState {
  [key: string]: SheetState;
}

interface UseSheetOptions extends Pick<BaseSheet, "type"> {
  initialValue?: boolean;
}

const sheets = reactive<SheetsState>({});
const openSheetIds = ref<Set<string>>(new Set());

export const inert = computed(() => openSheetIds.value.size > 0);

export function useSheet(
  id: string,
  options: UseSheetOptions = { initialValue: false, type: "auto" }
) {
  const isLargeScreen = useMediaQuery("(max-width: 600px)");

  // Check if state for this ID already exists. If not, create it.
  if (!sheets[id]) {
    sheets[id] = {
      isOpen: options.initialValue ?? false,
      type: options.type ?? "auto",
      toggle() {
        sheets[id]!.isOpen = !sheets[id]!.isOpen;
      },
      isModal: computed(() => {
        if (sheets[id]!.type === "modal") return true;
        if (sheets[id]!.type === "standard") return false;
        return isLargeScreen.value;
      }),
    };
  }

  // Use a watcher to handle the side effect of updating the global state.
  watch(
    [() => sheets[id]!.isOpen, () => sheets[id]!.isModal],
    ([newIsOpen, newIsModal]) => {
      // If the current sheet is becoming both open and modal.
      if (newIsOpen && newIsModal) {
        // Close and remove any other open modal sheets.
        for (const sheetId in sheets) {
          if (
            sheetId !== id &&
            sheets[sheetId]!.isOpen &&
            sheets[sheetId]!.isModal
          ) {
            sheets[sheetId]!.toggle();
            openSheetIds.value.delete(sheetId);
          }
        }
        openSheetIds.value.add(id);
      } else {
        openSheetIds.value.delete(id);
      }
    },
    { immediate: true }
  );

  return sheets[id];
}

// A single watcher for the global inert state.
watch(
  inert,
  (isBlocking) => {
    let scrollbarWidth = getScrollbarWidth();

    if (isBlocking) {
      // One or more modal sheets are open.
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // All modal sheets are closed.
      // Use setTimeout to delay the removal of styles until after the transition.
      // Assume a 300ms transition duration, a common value for a smooth sheet animation.
      setTimeout(() => {
        // Double-check the inert state. This is crucial!
        // A new sheet might have opened during the transition.
        if (!inert.value) {
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }
      }, 300); // 300ms delay to match the transition duration
    }
  },
  { immediate: true }
);

function getScrollbarWidth() {
  if (typeof window === "undefined") return 0; // SSR guard
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  const scrollbarWidth = outer.offsetWidth - outer.clientWidth;
  document.body.removeChild(outer);
  return scrollbarWidth;
}
