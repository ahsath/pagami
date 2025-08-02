<script lang="ts" setup>
import ArrowDropDownRounded from "~icons/material-symbols/arrow-drop-down-rounded?width=24&height=24";

defineOptions({ inheritAttrs: false });

defineProps<{
  id: string;
  options?: Array<{ value: string; label: string }>;
}>();

const model = defineModel({ required: true });
</script>

<template>
  <div class="select-simple">
    <div class="select-simple__leading-icon" v-if="$slots['leading-icon']">
      <slot name="leading-icon" />
    </div>
    <select class="select-simple__select" v-model="model" :id :="$attrs">
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
