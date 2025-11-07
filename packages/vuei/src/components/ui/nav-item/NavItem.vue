<script setup lang="ts" >
import { computed, inject } from "vue";
import { useSheet } from "@/composables/useSheet";

const { tag = "div", selected = false, compactHorizontal = false } = defineProps<{
  label: string;
  tag?: string;
  selected?: boolean;
  compactHorizontal?: boolean;
}>();

const navRailId = inject("navRailId") as string;
const sheet = useSheet(navRailId);
const isExpanded = computed(() => sheet.isOpen || sheet.isModal);
</script>

<template>
  <component
    :is="tag"
    class="nav-item"
    :class="{
      'nav-item--horizontal': isExpanded,
      'nav-item--horizontal-compact': isExpanded && compactHorizontal,
      'nav-item--selected': selected,
    }"
    :tabindex="tag === 'a' ? -1 : 0"
  >
    <div class="nav-item__content">
      <slot name="icon" />
      <slot name="icon-selected" />
      <slot name="icon-unselected" />
      <span
        class="nav-item__label nav-item__label--horizontal"
        :aria-hidden="!isExpanded ? 'true' : undefined"
      >
        {{ label }}
      </span>
    </div>
    <span
      class="nav-item__label nav-item__label--vertical"
      :aria-hidden="isExpanded ? 'true' : undefined"
    >
      {{ label }}
    </span>
  </component>
</template>
