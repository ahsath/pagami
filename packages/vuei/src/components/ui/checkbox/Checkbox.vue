<script setup lang="ts">
import { inject, type ModelRef, useId } from "vue";
import { BaseCheckbox } from "@/components/base/forms/index.ts";
import CheckboxRoundedChecked from "~icons/material-symbols/check-box-rounded?width=24&height=24";
import CheckboxRoundedUnchecked from "~icons/material-symbols/check-box-outline-blank?width=24&height=24";

defineOptions({ inheritAttrs: false });

const {
  choiceControlClass = undefined,
  error = undefined,
  label = undefined,
} = defineProps<{
  error?: string;
  choiceControlClass?: string;
  label?: string;
}>();

type Model = ModelRef<string[] | string | boolean | undefined> | undefined;
let model: Model;

try {
  model = inject("model", undefined) as Model;
} catch {
  // eslint-disable-next-line
  model = defineModel() as Model;
}

const errorId = useId();
const id = useId();
</script>

<template>
  <div
    :class="[
      'choice-control',
      { 'choice-control--state-error': !!error },
      choiceControlClass,
    ]"
  >
    <div class="choice-control__selection">
      <div class="choice-control__check">
        <BaseCheckbox
          :id
          v-model="model"
          class="choice-control__input"
          :aria-describedby="!!error ? errorId : undefined"
          :aria-invalid="!!error ? 'true' : undefined"
          :="$attrs"
        />
        <span class="choice-control__icons" aria-hidden="true">
          <slot name="checked-icon">
            <CheckboxRoundedChecked />
          </slot>
          <slot name="unchecked-icon">
            <CheckboxRoundedUnchecked />
          </slot>
        </span>
      </div>
      <label v-if="!!label" class="choice-control__label" :for="id">
        {{ label }}
      </label>
    </div>
    <span
      v-if="!!error"
      :id="errorId"
      role="alert"
      class="choice-control__error"
    >
      {{ error }}
    </span>
  </div>
</template>
