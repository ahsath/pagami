import {
  type ComputedRef,
  type Ref,
  computed,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import useMediaQuery from "./useMediaQuery.ts";

interface BaseSheet {
  isOpen?: Ref<boolean>;
  isExpanded?: Ref<boolean>;
  type?: "modal" | "standard";
}

interface SheetState extends BaseSheet {
  isModal: ComputedRef<boolean>;
  toggle: () => void;
}

interface SheetsState {
  [key: string]: SheetState;
}

interface UseSheetOptions extends Pick<BaseSheet, "type"> {
  open?: Ref<boolean>;
  expanded?: Ref<boolean>;
  modalBreakpoint?: number;
}

const sheets = reactive<SheetsState>({});
const openSheetIds = ref<Set<string>>(new Set());
export const inert = computed(() => openSheetIds.value.size > 0);
export const useSheet = (id: string) => computed(() => sheets[id]);

export function createSheet(id: string, options: UseSheetOptions) {
  const breakpoint = options.modalBreakpoint ?? 600;
  const isNarrow = useMediaQuery(`(width < ${breakpoint}px)`);
  const isOpen = options.open ?? ref(false);
  const isExpanded = options.expanded ?? ref(false);

  sheets[id] = {
    isOpen,
    isExpanded,
    type: options.type,
    toggle() {
      isOpen.value = !isOpen.value;
    },
    isModal: computed(() => {
      if (options.type === "modal") return true;
      if (options.type === "standard") return false;
      return isNarrow.value;
    }),
  };

  // Add the sheet to the open sheets list if it is open and is a modal sheet
  watchEffect(() => {
    if (isOpen.value && sheets[id].isModal) {
      openSheetIds.value.add(id);

      // Prevent competing modal sheets
      for (const sheetId in sheets) {
        if (
          sheetId !== id &&
          sheets[sheetId].isOpen &&
          sheets[sheetId].isModal
        ) {
          // Force close the competing modal so it updates its model strictly
          sheets[sheetId].toggle();
        }
      }
    } else {
      openSheetIds.value.delete(id);
    }
  });

  // Close all modal sheets when the screen size changes from wide to narrow
  watch(isNarrow, (nowNarrow) => {
    if (nowNarrow) {
      for (const sheetId in sheets) {
        if (sheets[sheetId].isModal && sheets[sheetId].isOpen) {
          sheets[sheetId].toggle();
          openSheetIds.value.delete(sheetId);
        }
      }
    }
  });

  return sheets[id];
}

if (typeof window !== "undefined") {
  watchEffect(() => {
    const isBlocking = inert.value;
    const scrollbarWidth = getScrollbarWidth();

    if (isBlocking) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // setTimeout(() => {
      if (!inert.value) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
      // }, 300);
    }
  });
}

function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  const scrollbarWidth = outer.offsetWidth - outer.clientWidth;
  document.body.removeChild(outer);
  return scrollbarWidth;
}
