<script lang="ts" setup>
import { useSheet } from "@/composables/useSheet";

const { id, to = "body" } = defineProps<{
  id: string;
  to?: string;
}>();

const sheet = useSheet(id);
</script>

<template>
  <Teleport :disabled="!sheet.isModal" :to>
    <div
      class="sheet2"
      :class="{
        'sheet2--type-modal': sheet.isModal,
        'sheet2--type-standard': !sheet.isModal,
        'sheet2--open': sheet.isOpen,
      }"
      :id="id"
      :role="sheet.isModal ? 'dialog' : undefined"
      :aria-modal="sheet.isModal ? 'true' : undefined"
    >
      <div class="p-4">
        <button @click="sheet.toggle">close</button>
      </div>
    </div>
  </Teleport>
</template>
