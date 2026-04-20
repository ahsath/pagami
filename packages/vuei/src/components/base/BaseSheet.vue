<script lang="ts" setup>
import {
  onMounted,
  onUnmounted,
  Teleport,
  useTemplateRef,
  watchPostEffect,
} from "vue";
import { createFocusTrap, type FocusTrap } from "focus-trap";
import { createSheet } from "@/composables/useSheet";

const {
  id,
  to = "body",
  type = undefined,
} = defineProps<{
  id: string;
  to?: string;
  type?: "modal" | "standard";
}>();

const open = defineModel<boolean>("open", { default: false });
const expanded = defineModel<boolean>("expanded", { default: false });

const sheetRef = useTemplateRef("sheetRef");

const sheet = createSheet(id, { open, expanded, type });

let trap: FocusTrap | undefined;

function close() {
  if (sheet.isOpen && sheet.isModal) {
    sheet.toggle();
  }
}

// Function to handle link clicks and close the sheet
function handleContentClick(event: MouseEvent) {
  // 1. Check if the sheet is in modal mode and open
  if (!sheet.isModal || !sheet.isOpen) {
    return;
  }

  // 2. Find the closest ancestor that is an anchor tag (`<a>`)
  const target = event.target as HTMLElement;
  const anchor = target.closest("a");

  // 3. If a link was clicked, close the sheet
  if (anchor) {
    close();
  }
}

onMounted(() => {
  trap = createFocusTrap(sheetRef.value as HTMLDivElement, {
    clickOutsideDeactivates: true,
  });

  watchPostEffect(() => {
    if (sheet.isOpen && sheet.isModal) {
      trap?.activate();
    } else {
      trap?.deactivate();
    }
  });
});

onUnmounted(() => {
  trap?.deactivate();
});
</script>

<template>
  <Teleport :disabled="!sheet?.isModal" :to>
    <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
    <div
      :id
      ref="sheetRef"
      :="$attrs"
      @click="handleContentClick"
      @keydown.esc="close"
    >
      <slot />
    </div>
    <Transition name="fade">
      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/no-static-element-interactions -->
      <div
        v-show="sheet.isModal && sheet.isOpen"
        class="sheet__scrim"
        @click="close"
      />
    </Transition>
  </Teleport>
</template>
