import { computed, type ComputedRef, reactive, ref, watch } from "vue";
import useMediaQuery from "./useMediaQuery.ts";

interface BaseSheet {
  isOpen?: boolean;
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
  initialValue?: boolean;
}

const sheets = reactive<SheetsState>({});
const openSheetIds = ref<Set<string>>(new Set());

export const inert = computed(() => openSheetIds.value.size > 0);

export function useCreateSheet(id: string, options?: UseSheetOptions) {
  const opts = { initialValue: false, type: undefined, ...options };
  const isLargeScreen = useMediaQuery("(max-width: 600px)");

  if (!sheets[id]) {
    sheets[id] = {
      isOpen: opts?.initialValue,
      type: opts?.type,
      toggle() {
        sheets[id].isOpen = !sheets[id].isOpen;
      },
      isModal: computed(() => {
        if (sheets[id].type === "modal") return true;
        if (sheets[id].type === "standard") return false;
        return isLargeScreen.value;
      }),
    };
  }

  watch(
    [() => sheets[id]?.isOpen, () => sheets[id]?.isModal],
    ([newIsOpen, newIsModal]) => {
      if (newIsOpen && newIsModal) {
        // Close other modal sheets
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
    { immediate: true },
  );

  return sheets[id];
}

export function useSheet(id: string) {
  return computed(() => sheets[id]);
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
