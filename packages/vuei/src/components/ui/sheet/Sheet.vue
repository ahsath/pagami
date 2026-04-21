<script lang="ts" setup>
import { computed } from "vue";
import { useSheet } from "@/composables/useSheet";
import BaseSheet from "@/components/base/BaseSheet.vue";

const {
  id,
  to = "body",
  side = "left",
  type = undefined,
  modalBreakpoint = undefined,
} = defineProps<{
  id: string;
  to?: string;
  side?: "left" | "right";
  type?: "modal" | "standard" | undefined;
  modalBreakpoint?: number;
}>();

const open = defineModel<boolean>("open", { default: false });

const sheet = useSheet(id);

const isOpen = computed(() => sheet.value?.isOpen ?? open.value);
const inert = computed(() =>
  (!isOpen.value && sheet.value?.isModal) ||
  (!sheet.value?.isModal && !isOpen.value)
    ? true
    : undefined,
);
</script>

<template>
  <BaseSheet
    :id
    v-model:open="open"
    :type
    :modal-breakpoint="modalBreakpoint"
    class="sheet"
    :class="{
      'sheet--type-modal': sheet?.isModal,
      'sheet--type-standard': !sheet?.isModal,
      'sheet--side-left': side === 'left',
      'sheet--side-right': side === 'right',
      'sheet--open': isOpen,
    }"
    :role="sheet?.isModal ? 'dialog' : undefined"
    :aria-modal="sheet?.isModal ? 'true' : undefined"
    :tabindex="sheet?.isModal ? -1 : undefined"
    :inert
    :to
  >
    <slot />
  </BaseSheet>
</template>
