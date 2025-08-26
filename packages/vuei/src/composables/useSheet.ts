import { reactive, computed, watch, ref, type ComputedRef } from "vue";
import useMediaQuery from "./useMediaQuery";

// Define the base properties for a sheet.
interface BaseSheet {
  isOpen: boolean;
  type: "modal" | "standard" | "auto";
}

// Define the complete state for a single sheet instance.
interface SheetState extends BaseSheet {
  isModal: ComputedRef<boolean>;
  toggle: () => void;
}

// The global state object will be a record of SheetState.
interface SheetsState {
  [key: string]: SheetState;
}

const sheets = reactive<SheetsState>({});

// A global reactive Set to track which sheets are currently open.
const openSheetIds = ref<Set<string>>(new Set());

// The options for the composable now reference the BaseSheet type.
interface UseSheetOptions extends Pick<BaseSheet, "type"> {
  initialValue?: boolean;
}

export function useSheet(
  id: string,
  options: UseSheetOptions = { initialValue: false, type: "auto" }
) {
  const isLargeScreen = useMediaQuery("(min-width: 600px)");

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
        return !isLargeScreen.value;
      }),
    };
  }

  // Use a watcher to handle the side effect of updating the global state.
  watch(
    [() => sheets[id]!.isOpen, () => sheets[id]!.isModal],
    ([newIsOpen, newIsModal]) => {
      if (newIsOpen && newIsModal) {
        openSheetIds.value.add(id);
      } else {
        openSheetIds.value.delete(id);
      }
    },
    { immediate: true }
  );

  return sheets[id];
}

export const inert = computed(() => openSheetIds.value.size > 0);

const getScrollbarWidth = () => {
  if (typeof window === "undefined") return 0; // SSR guard
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  const scrollbarWidth = outer.offsetWidth - outer.clientWidth;
  document.body.removeChild(outer);
  return scrollbarWidth;
};

if (typeof document !== "undefined") {
  watch(
    inert,
    (isBlocking) => {
      let scrollbarWidth = getScrollbarWidth();

      if (isBlocking) {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    },
    { immediate: true }
  );
}
