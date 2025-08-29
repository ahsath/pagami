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
    <slot :isModal="sheet.isModal" :isOpen="sheet.isOpen" :close />
    <Transition name="fade">
      <div
        v-show="sheet.isModal && sheet.isOpen"
        class="sheet__scrim"
        @click="close"
      />
    </Transition>
  </Teleport>
</template>
