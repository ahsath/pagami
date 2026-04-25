<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef, watchPostEffect } from "vue";
import { createFocusTrap, type FocusTrap } from "focus-trap";
import { useSheet } from "@/composables/useSheet";

defineOptions({ inheritAttrs: false });

const { id, is } = defineProps<{ id: string; is: string }>();

const sheetRef = useTemplateRef("sheetRef");

const sheet = useSheet(id);

let trap: FocusTrap | undefined;

function close() {
  if (sheet.value?.isOpen && sheet.value?.isModal) {
    sheet.value.toggle();
  }
}

// Function to handle link clicks and close the sheet
function handleContentClick(event: MouseEvent) {
  // 1. Check if the sheet is in modal mode and open
  if (!sheet.value?.isModal || !sheet.value?.isOpen) {
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
    if (sheet.value?.isOpen && sheet.value?.isModal) {
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
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
  <component
    :is
    :id
    ref="sheetRef"
    :="$attrs"
    @click="handleContentClick"
    @keydown.esc="close"
  >
    <slot />
  </component>
  <Transition name="fade">
    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/no-static-element-interactions -->
    <div
      v-show="sheet?.isModal && sheet?.isOpen"
      class="sheet__scrim"
      @click="close"
    />
  </Transition>
</template>
