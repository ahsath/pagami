<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useSheet } from "@/composables/useSheet";
import { createFocusTrap } from "focus-trap";

const { id, to = "body" } = defineProps<{
  id: string;
  to?: string;
}>();

const sheet = useSheet(id);

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
  const el = document.getElementById(id);
  if (el) {
    const trap = createFocusTrap(el, {
      clickOutsideDeactivates: true,
    });

    watch(
      () => sheet.isOpen,
      (isOpen) => {
        if (isOpen && sheet.isModal) {
          trap.activate();
        } else {
          trap.deactivate();
        }
      },
      { flush: "post" }
    );
  }
});
</script>

<template>
  <Teleport :disabled="!sheet.isModal" :to>
    <div @click="handleContentClick" @keydown.esc="close" :="$attrs" :id>
        <slot />
    </div>
    <Transition name="fade">
      <div
        v-show="sheet.isModal && sheet.isOpen"
        class="sheet__scrim"
        @click="close"
      />
    </Transition>
  </Teleport>
</template>
