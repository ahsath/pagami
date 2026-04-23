import {
  type ComputedRef,
  type Ref,
  computed,
  reactive,
  ref,
  unref,
  watch,
  watchEffect,
} from "vue";
import useMediaQuery from "./useMediaQuery.ts";

interface BaseSheet {
  isOpen?: Ref<boolean>;
  isExpanded?: Ref<boolean>;
  type?: "modal" | "standard";
  initiallyOpen?: boolean;
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
const hasOpenModals = computed(() => openSheetIds.value.size > 0);

export const useSheet = (id: string) => computed(() => sheets[id]);

export function createSheet(id: string, options: UseSheetOptions) {
  const breakpoint = options.modalBreakpoint ?? 600;
  const isOpen = options.open ?? ref(false);
  const isExpanded = options.expanded ?? ref(false);
  const isNarrow = useMediaQuery(`(width < ${breakpoint}px)`);

  sheets[id] = {
    isOpen,
    isExpanded,
    initiallyOpen: unref(options.open),
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

  watch(isNarrow, (newNarrow) => {
    if (newNarrow) {
      for (const sheetId in sheets) {
        // Close all sheets when the screen size changes from wide to narrow
        if (sheets[sheetId].isOpen) {
          sheets[sheetId].toggle();
          openSheetIds.value.delete(sheetId);
        }
      }
    } else {
      for (const sheetId in sheets) {
        // Open sheets that were initially open when the screen size changes from wide to narrow
        if (sheets[sheetId].initiallyOpen && !sheets[sheetId].isOpen) {
          sheets[sheetId].toggle();
        }
      }
    }
  });

  return sheets[id];
}

if (typeof window !== "undefined") {
  // Timeout to prevent layout shift during resize
  let resizeTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener("resize", () => {
    document.body.classList.add("is-resizing");
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      document.body.classList.remove("is-resizing");
    }, 200);
  });

  watchEffect(() => {
    const scrollbarWidth = getScrollbarWidth();

    if (hasOpenModals.value) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // setTimeout(() => {
      if (!hasOpenModals.value) {
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
