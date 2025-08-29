<script lang="ts" setup>
import UseSheet from "@/components/ui/sheet/UseSheet.vue";

const { id, to = "body" } = defineProps<{
  id: string;
  to?: string;
}>();
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
      <slot />
    </div>
  </UseSheet>
</template>
