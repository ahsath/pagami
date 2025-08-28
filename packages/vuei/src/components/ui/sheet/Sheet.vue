<script lang="ts" setup>
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
</script>

<template>
  <UseSheet #="{ tabindex, role, ariaModal, isOpen, isModal, close }" :id :to>
    <div
      class="sheet"
      :class="{
        'sheet--type-modal': isModal,
        'sheet--type-standard': !isModal,
        'sheet--side-left': side === 'left',
        'sheet--side-right': side === 'right',
        'sheet--open': isOpen,
      }"
      @keydown.esc="close"
      :ariaModal
      :tabindex
      :role
      :id
    >
      <slot />
    </div>
  </UseSheet>
</template>
