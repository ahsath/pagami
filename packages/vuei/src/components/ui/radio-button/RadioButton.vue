<script setup lang="ts">
import { inject, type ModelRef, useId } from "vue";
import { BaseRadio } from "@/components/base/forms/index.ts";
import RadioButtonChecked from "~icons/material-symbols/radio-button-checked?width=24&height=24";
import RadioButtonUnchecked from "~icons/material-symbols/radio-button-unchecked?width=24&height=24";

defineOptions({ inheritAttrs: false });

const { choiceControlClass = undefined, label = undefined } = defineProps<{
  choiceControlClass?: string;
  label?: string;
}>();

type Model = ModelRef<string> | undefined;
let model: Model;

try {
  model = inject("model", undefined) as Model;
} catch {
  // eslint-disable-next-line
  model = defineModel() as Model;
}

const id = useId();
</script>

<template>
  <div class="choice-control" :class="choiceControlClass">
    <div class="choice-control__selection">
      <div class="choice-control__check">
        <BaseRadio
          :id
          v-model="model"
          class="choice-control__input"
          :="$attrs"
        />
        <span class="choice-control__icons" aria-hidden="true">
          <slot name="checked-icon">
            <RadioButtonChecked />
          </slot>
          <slot name="unchecked-icon">
            <RadioButtonUnchecked />
          </slot>
        </span>
      </div>
      <slot name="label" :="{ id, labelClass: 'choice-control__label' }">
        <label v-if="!!label" class="choice-control__label" :for="id">
          {{ label }}
        </label>
      </slot>
    </div>
  </div>
</template>
