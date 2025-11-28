<script setup lang="ts">
import { inject, type ModelRef } from "vue";
import { BaseCheckbox } from "@/components/base/forms/index.ts";
import CheckboxRoundedChecked from "~icons/material-symbols/check-box-rounded?width=24&height=24";
import CheckboxRoundedUnchecked from "~icons/material-symbols/check-box-outline-blank?width=24&height=24";

defineOptions({ inheritAttrs: false });

const { choiceControlClass = undefined, error = undefined } = defineProps<{
  error?: boolean;
  choiceControlClass?: string;
}>();

type Model = ModelRef<string[] | string | boolean | undefined> | undefined;
let model: Model;

try {
  model = inject("model", undefined) as Model;
} catch {
  // eslint-disable-next-line
  model = defineModel() as Model;
}
</script>

<template>
  <span
    :class="[
      'choice-control',
      { 'choice-control--state-error': error },
      choiceControlClass,
    ]"
  >
    <BaseCheckbox v-model="model" class="choice-control__input" :="$attrs" />
    <span class="choice-control__icons" aria-hidden="true">
      <slot name="checked-icon">
        <CheckboxRoundedChecked />
      </slot>
      <slot name="unchecked-icon">
        <CheckboxRoundedUnchecked />
      </slot>
    </span>
  </span>
</template>
