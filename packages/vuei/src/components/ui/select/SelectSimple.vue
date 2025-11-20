<script lang="ts" setup>
import ArrowDropDownRounded from "~icons/material-symbols/arrow-drop-down-rounded?width=24&height=24";

defineOptions({ inheritAttrs: false });

defineProps<{
  id: string;
  options?: Array<{ value: string; label: string }>;
}>();

const model = defineModel<string>({ required: true });
</script>

<template>
  <div class="select-simple">
    <div v-if="$slots['leading-icon']" class="select-simple__leading-icon">
      <slot name="leading-icon" />
    </div>
    <select :id v-model="model" class="select-simple__select" :="$attrs">
      <slot name="options" :options="options">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </slot>
    </select>
    <div class="select-simple__trailing-icon" aria-hidden="true">
      <ArrowDropDownRounded />
    </div>
  </div>
</template>
