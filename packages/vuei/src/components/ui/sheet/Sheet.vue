<script lang="ts" setup>
import { computed } from "vue";
import { useSheet } from "@/composables/useSheet";
import BaseSheet from "@/components/base/BaseSheet.vue";

const {
  id,
  to = "body",
  side = "left",
  open = false,
  type = undefined,
} = defineProps<{
  id: string;
  to?: string;
  side?: "left" | "right";
  open?: boolean;
  type?: "modal" | "standard" | undefined;
}>();

const sheet = useSheet(id);

const isOpen = computed(() => sheet?.value?.isOpen ?? open);
const inert = computed(() => {
  return !isOpen.value && sheet?.value?.isModal ? true : undefined;
});
</script>

<template>
  <BaseSheet
    :id
    :open
    :type
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
