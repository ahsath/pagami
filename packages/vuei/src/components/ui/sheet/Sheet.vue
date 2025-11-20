<script lang="ts" setup>
import { useSheet } from "@/composables/useSheet";
import { UseSheet } from ".";

const {
  id,
  to = "body",
  side = "left",
} = defineProps<{
  id: string;
  to?: string;
  side?: "left" | "right";
}>();

const sheet = useSheet(id);
</script>

<template>
  <UseSheet
    :id
    class="sheet"
    :class="{
      'sheet--type-modal': sheet.isModal,
      'sheet--type-standard': !sheet.isModal,
      'sheet--side-left': side === 'left',
      'sheet--side-right': side === 'right',
      'sheet--open': sheet.isOpen,
    }"
    :role="sheet.isModal ? 'dialog' : undefined"
    :aria-modal="sheet.isModal ? 'true' : undefined"
    :tabindex="sheet.isModal ? -1 : undefined"
    :inert="!sheet.isOpen && sheet.isModal ? 'true' : undefined"
    :to
  >
    <slot />
  </UseSheet>
</template>
