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

function close() {
  if (sheet.isOpen && sheet.isModal) {
    sheet.toggle();
  }
}

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
      class="sheet"
      :class="{
        'sheet--type-modal': sheet.isModal,
        'sheet--type-standard': !sheet.isModal,
        'sheet--open': sheet.isOpen,
      }"
      :id="id"
      :role="sheet.isModal ? 'dialog' : undefined"
      :aria-modal="sheet.isModal ? 'true' : undefined"
      tabindex="-1"
      @keydown.esc="close"
    >
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
