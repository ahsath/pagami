import {
  computed,
  type ComputedRef,
  type Ref,
  reactive,
  ref,
  watch,
} from "vue";
import useMediaQuery from "./useMediaQuery.ts";

interface BaseSheet {
  isOpen?: Ref<boolean>;
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
}

const sheets = reactive<SheetsState>({});
const openSheetIds = ref<Set<string>>(new Set());
export const inert = computed(() => openSheetIds.value.size > 0);
export const useSheet = (id: string) => computed(() => sheets[id]);

export function createSheet(id: string, options: UseSheetOptions) {
  const isLargeScreen = useMediaQuery("(max-width: 600px)");
  const isOpen = options.open ?? ref(false);

  if (!sheets[id]) {
    sheets[id] = {
      isOpen,
      type: options.type,
      toggle() {
        isOpen.value = !isOpen.value;
      },
      isModal: computed(() => {
        if (options.type === "modal") return true;
        if (options.type === "standard") return false;
        return isLargeScreen.value;
      }),
    };
  }

  watch(
    [() => sheets[id].isOpen, () => sheets[id].isModal],
    ([newIsOpen, newIsModal]) => {
      if (newIsOpen && newIsModal) {
        // Close other modal sheets
        for (const sheetId in sheets) {
          if (
            sheetId !== id &&
            sheets[sheetId].isOpen &&
            sheets[sheetId].isModal
          ) {
            sheets[sheetId].toggle();
            openSheetIds.value.delete(sheetId);
          }
        }
        openSheetIds.value.add(id);
      } else {
        openSheetIds.value.delete(id);
      }
    },
    { immediate: true },
  );

  return sheets[id];
}

if (typeof window !== "undefined") {
  watch(
    inert,
    (isBlocking) => {
      const scrollbarWidth = getScrollbarWidth();

      if (isBlocking) {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        setTimeout(() => {
          if (!inert.value) {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
          }
        }, 300);
      }
    },
    { immediate: true },
  );
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
