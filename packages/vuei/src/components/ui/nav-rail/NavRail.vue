<script setup lang="ts">
import { provide } from "vue";
import { useSheet } from "@/composables/useSheet";
import UseSheet from "@/components/ui/sheet/UseSheet.vue";
import MenuRounded from "~icons/material-symbols/menu-rounded?width=24&height=24";
import MenuOpenRounded from "~icons/material-symbols/menu-open-rounded?width=24&height=24";

const { id, to = "body" } = defineProps<{
  id: string;
  to?: string;
}>();

provide("navRailId", id);

const sheet = useSheet(id);
</script>

<template>
  <UseSheet
    :id
    class="nav-rail"
    :class="{
      'nav-rail--type-modal': sheet.isModal,
      'nav-rail--type-standard': !sheet.isModal,
      'nav-rail--expanded': sheet.isOpen,
    }"
    :role="sheet.isModal ? 'dialog' : undefined"
    :aria-modal="sheet.isModal ? 'true' : undefined"
    :tabindex="sheet.isModal ? -1 : undefined"
    :inert="!sheet.isOpen && sheet.isModal ? 'true' : undefined"
    :to
  >
    <div class="nav-rail__header">
      <button
        class="button icon-button icon-button--size-m"
        aria-label="Cerrar navegación"
        :aria-expanded="sheet.isOpen"
        :aria-controls="id"
        @click="sheet.toggle"
      >
        <MenuRounded v-show="!sheet.isOpen" aria-hidden="true" />
        <MenuOpenRounded v-show="sheet.isOpen" aria-hidden="true" />
      </button>
    </div>
    <slot />
  </UseSheet>
</template>
