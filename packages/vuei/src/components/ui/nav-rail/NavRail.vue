<script setup lang="ts">
import { provide } from "vue";
import { createSheet } from "@/composables/useSheet";
import { type WindowSizeClass } from "@/lib/constants.ts";
import BaseSheet from "@/components/base/BaseSheet.vue";
import MenuRounded from "~icons/material-symbols/menu-rounded?width=24&height=24";
import MenuOpenRounded from "~icons/material-symbols/menu-open-rounded?width=24&height=24";

const {
  id,
  type = undefined,
  modalBreakpoint = "ex",
} = defineProps<{
  id: string;
  type?: "modal" | "standard";
  modalBreakpoint?: WindowSizeClass;
}>();

const open = defineModel<boolean>("open", { default: false });
const expanded = defineModel<boolean>("expanded", { default: false });

provide("navRailId", id);

const sheet = createSheet(id, {
  open,
  expanded,
  type,
  modalBreakpoint,
});
</script>

<template>
  <BaseSheet
    :id
    class="nav-rail"
    :class="{
      'nav-rail--type-modal': sheet.isModal,
      'nav-rail--type-standard': !sheet.isModal,
      'nav-rail--open': sheet.isModal && open,
      'nav-rail--expanded': !sheet.isModal && expanded,
    }"
    :role="sheet.isModal ? 'dialog' : undefined"
    :aria-modal="sheet.isModal ? 'true' : undefined"
    :inert="!open && sheet.isModal ? true : undefined"
  >
    <div class="nav-rail__header">
      <button
        class="button icon-button icon-button--size-m"
        aria-label="Cerrar navegación"
        :aria-expanded="(sheet.isModal ? open : expanded) ? 'true' : 'false'"
        :aria-controls="id"
        @click="sheet.isModal ? sheet.toggle() : (expanded = !expanded)"
      >
        <MenuRounded
          v-show="!(sheet.isModal ? open : expanded)"
          aria-hidden="true"
        />
        <MenuOpenRounded
          v-show="sheet.isModal ? open : expanded"
          aria-hidden="true"
        />
      </button>
    </div>
    <slot />
  </BaseSheet>
</template>
