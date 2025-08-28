<script lang="ts" setup>
import UseSheet from "@/components/ui/sheet/UseSheet.vue";

const { id, to = "body" } = defineProps<{
  id: string;
  to?: string;
}>();
</script>

<template>
  <UseSheet #="{ tabindex, role, ariaModal, isOpen, isModal, close }" :id :to>
    <div
      class="nav-rail"
      :class="{
        'nav-rail--type-modal': isModal,
        'nav-rail--type-standard': !isModal,
        'nav-rail--expanded': isOpen,
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
