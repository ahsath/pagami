<script setup lang="ts">
import { provide, computed } from "vue";
import { useSheet } from "@/composables/useSheet";
import BaseSheet from "@/components/base/BaseSheet.vue";
import MenuRounded from "~icons/material-symbols/menu-rounded?width=24&height=24";
import MenuOpenRounded from "~icons/material-symbols/menu-open-rounded?width=24&height=24";

const {
  id,
  to = "body",
  type = undefined,
} = defineProps<{
  id: string;
  to?: string;
  type?: "modal" | "standard" | undefined;
}>();

const open = defineModel<boolean>("open", { default: false });

provide("navRailId", id);

const sheet = useSheet(id);
const isOpen = computed(() => sheet?.value?.isOpen ?? open);
</script>

<template>
  <BaseSheet
    :id
    v-model:open="open"
    :type
    class="nav-rail"
    :class="{
      'nav-rail--type-modal': sheet?.isModal,
      'nav-rail--type-standard': !sheet?.isModal,
      'nav-rail--expanded': isOpen,
    }"
    :role="sheet?.isModal ? 'dialog' : undefined"
    :aria-modal="sheet?.isModal ? 'true' : undefined"
    :tabindex="sheet?.isModal ? -1 : undefined"
    :inert="!isOpen && sheet?.isModal ? true : undefined"
    :to
  >
    <div class="nav-rail__header">
      <button
        class="button icon-button icon-button--size-m"
        aria-label="Cerrar navegación"
        :aria-expanded="isOpen ? 'true' : 'false'"
        :aria-controls="id"
        @click="sheet?.toggle"
      >
        <MenuRounded v-show="!isOpen" aria-hidden="true" />
        <MenuOpenRounded v-show="isOpen" aria-hidden="true" />
      </button>
    </div>
    <slot />
  </BaseSheet>
</template>
