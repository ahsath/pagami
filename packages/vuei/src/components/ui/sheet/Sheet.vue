<script lang="ts" setup>
import { computed } from "vue";
import { createSheet } from "@/composables/useSheet";
import { type WindowSizeClass } from "@/lib/constants.ts";
import BaseSheet from "@/components/base/BaseSheet.vue";

const {
  id,
  side = "left",
  type = undefined,
  modalBreakpoint = "ex",
  inset = false,
  is = "div",
} = defineProps<{
  id: string;
  is?: string;
  side?: "left" | "right";
  type?: "modal" | "standard";
  modalBreakpoint?: WindowSizeClass;
  inset?: boolean;
}>();

const open = defineModel<boolean>("open", { default: false });

const sheet = createSheet(id, {
  open,
  type,
  modalBreakpoint,
});

const inert = computed(() =>
  (!open.value && sheet.isModal) || (!sheet.isModal && !open.value)
    ? true
    : undefined,
);
</script>

<template>
  <BaseSheet
    :is
    :id
    class="sheet"
    :data-breakpoint="modalBreakpoint"
    :class="{
      'sheet--type-modal': sheet.isModal,
      'sheet--type-standard': !sheet.isModal,
      'sheet--inset': inset,
      'sheet--side-left': side === 'left',
      'sheet--side-right': side === 'right',
      'sheet--open': open,
    }"
    :role="sheet.isModal ? 'dialog' : undefined"
    :aria-modal="sheet.isModal ? 'true' : undefined"
    :inert
  >
    <slot />
  </BaseSheet>
</template>
