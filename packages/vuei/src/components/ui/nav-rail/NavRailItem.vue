<script lang="ts" setup>
import { computed, inject } from "vue";
import { useSheet } from "@/composables/useSheet";

const { tag = "div", selected = false } = defineProps<{
  label: string;
  tag?: string;
  selected?: boolean;
}>();

const navRailId = inject("navRailId") as string;
const sheet = useSheet(navRailId);
const isExpanded = computed(() => sheet.isOpen || sheet.isModal);
</script>

<template>
  <component
    :is="tag"
    class="nav-rail__item"
    :class="{
      'nav-rail__item--horizontal': isExpanded,
      'nav-rail__item--selected': selected,
    }"
  >
    <div class="nav-rail__icon-container">
      <slot name="icon-selected" />
      <slot name="icon-unselected" />
      <span
        class="nav-rail__label--horizontal"
        :aria-hidden="!isExpanded ? 'true' : undefined"
      >
        {{ label }}
      </span>
    </div>
    <span
      class="nav-rail__label--vertical"
      :aria-hidden="isExpanded ? 'true' : undefined"
    >
      {{ label }}
    </span>
  </component>
</template>
