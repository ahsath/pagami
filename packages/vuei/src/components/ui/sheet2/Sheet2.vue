<script lang="ts" setup>
import { useTemplateRef, watch } from "vue";
import { useSheet } from "@/composables/useSheet";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";

const { id, to = "body" } = defineProps<{
  id: string;
  to?: string;
}>();

const sheetRef = useTemplateRef("sheetRef");
const sheet = useSheet(id);
const { activate, deactivate } = useFocusTrap(sheetRef, {
  clickOutsideDeactivates: true,
});

watch(
  () => sheet.isOpen,
  (isOpen) => {
    if (isOpen && sheet.isModal) {
      activate();
    } else {
      deactivate();
    }
  }
);
</script>

<template>
  <Teleport :disabled="!sheet.isModal" :to>
    <div
      ref="sheetRef"
      class="sheet2"
      :class="{
        'sheet2--type-modal': sheet.isModal,
        'sheet2--type-standard': !sheet.isModal,
        'sheet2--open': sheet.isOpen,
      }"
      :id="id"
      :role="sheet.isModal ? 'dialog' : undefined"
      :aria-modal="sheet.isModal ? 'true' : undefined"
      tabindex="-1"
      @keydown.esc="sheet.toggle"
    >
      <div class="p-4">
        <button @click="sheet.toggle">close</button>
      </div>
    </div>
    <Transition name="fade">
      <div
        v-show="sheet.isModal && sheet.isOpen"
        class="sheet2__scrim"
        @click="sheet.toggle"
      />
    </Transition>
  </Teleport>
</template>
