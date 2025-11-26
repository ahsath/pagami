<script setup lang="ts">
import { inject, type ModelRef } from "vue";
import { BaseRadio } from "@/components/base/forms/index.ts";
import RadioButtonChecked from "~icons/material-symbols/radio-button-checked?width=24&height=24";
import RadioButtonUnchecked from "~icons/material-symbols/radio-button-unchecked?width=24&height=24";

defineOptions({ inheritAttrs: false });

const { radioButtonClass = undefined } = defineProps<{
  radioButtonClass?: string;
}>();

type Model = ModelRef<string> | undefined;
let model: Model;

try {
  model = inject("model", undefined) as Model;
} catch {
  // eslint-disable-next-line
  model = defineModel() as Model;
}
</script>

<template>
  <span class="radio-button" :class="radioButtonClass">
    <BaseRadio v-model="model" class="radio-button__input" :="$attrs" />
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
