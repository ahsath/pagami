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
} = defineProps<{
  id: string;
  side?: "left" | "right";
  type?: "modal" | "standard";
  modalBreakpoint?: WindowSizeClass;
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
    :id
    class="sheet"
    :data-breakpoint="modalBreakpoint"
    :class="{
      'sheet--type-modal': sheet.isModal,
      'sheet--type-standard': !sheet.isModal,
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
