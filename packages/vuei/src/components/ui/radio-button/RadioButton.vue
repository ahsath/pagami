<script setup lang="ts">
import { BaseRadio } from "@/components/base/forms/index.ts";
import RadioButtonChecked from "~icons/material-symbols/radio-button-checked?width=24&height=24";
import RadioButtonUnchecked from "~icons/material-symbols/radio-button-unchecked?width=24&height=24";

defineOptions({ inheritAttrs: false });
const modelValue = defineModel<string>();
</script>

<template>
  <span class="radio-button">
    <BaseRadio v-model="modelValue" class="radio-button__input" :="$attrs" />
    <span class="radio-button__icons" aria-hidden="true">
      <slot name="checked-icon">
        <RadioButtonChecked />
      </slot>
      <slot name="unchecked-icon">
        <RadioButtonUnchecked />
      </slot>
    </span>
  </span>
</template>
