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

// Watch the global 'inert' state and apply a class to the body.
if (typeof document !== "undefined") {
  watch(
    inert,
    (isBlocking) => {
      if (isBlocking) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
    { immediate: true }
  );
}
