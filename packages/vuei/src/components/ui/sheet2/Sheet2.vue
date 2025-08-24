<script lang="ts" setup>
import { useSheet } from "@/composables/useSheet";

const { id, to = "body" } = defineProps<{
  id: string;
  to?: string;
}>();

const sheet = useSheet(id);
</script>

<template>
  <Teleport :to>
    <div
      class="sheet2"
      :class="{ 'sheet2--type-modal': sheet.isModal }"
      :id="id"
      :role="sheet.isModal ? 'dialog' : undefined"
      :aria-modal="sheet.isModal ? 'true' : undefined"
    >
      <div class="p-4">sheet2</div>
    </div>
  </Teleport>
</template>
