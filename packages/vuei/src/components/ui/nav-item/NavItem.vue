<script setup lang="ts">
import { computed, inject } from "vue";
import { useSheet } from "@/composables/useSheet";

const {
  tag = "div",
  selected = false,
  horizontal = false,
  compact = false,
} = defineProps<{
  label: string;
  tag?: string;
  selected?: boolean;
  horizontal?: boolean;
  compact?: boolean;
}>();

const navRailId = inject<string>("navRailId", "");
const sheet = useSheet(navRailId);
const isExpanded = computed(
  () => horizontal || sheet.value?.isModal || sheet.value?.isExpanded,
);
</script>

<template>
  <component
    :is="tag"
    class="nav-item"
    :class="{
      'nav-item--horizontal': isExpanded,
      'nav-item--compact': isExpanded && compact,
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
