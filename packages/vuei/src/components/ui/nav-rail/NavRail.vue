<script lang="ts" setup>
import { provide } from "vue";
import UseSheet from "@/components/ui/sheet/UseSheet.vue";
import { useSheet } from "@/composables/useSheet";
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
  <UseSheet #="{ isOpen, isModal, close }" :id :to>
    <div
      class="nav-rail"
      :class="{
        'nav-rail--type-modal': isModal,
        'nav-rail--type-standard': !isModal,
        'nav-rail--expanded': isOpen,
      }"
      @keydown.esc="close"
      :role="isModal ? 'dialog' : undefined"
      :aria-modal="isModal ? 'true' : undefined"
      :tabindex="isModal ? -1 : undefined"
      :inert="!isOpen && isModal ? 'true' : undefined"
      :id
    >
      <div class="nav-rail__header">
        <button
          class="button icon-button icon-button--size-m"
          aria-label="Cerrar navegación"
          :aria-expanded="sheet.isOpen"
          :aria-controls="id"
          @click="sheet.toggle"
        >
          <MenuRounded v-show="!isOpen" aria-hidden="true" />
          <MenuOpenRounded v-show="isOpen" aria-hidden="true" />
        </button>
      </div>
      <slot />
    </div>
  </UseSheet>
</template>
