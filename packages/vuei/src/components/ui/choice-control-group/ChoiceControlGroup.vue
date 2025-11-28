<script setup lang="ts">
import { provide, useId } from "vue";

const { error = undefined } = defineProps<{
  error?: string;
  type: "radio" | "checkbox";
}>();

const model = defineModel<string[] | string | boolean | undefined>();

provide("model", model);

const id = useId();
</script>

<template>
  <fieldset
    :role="type === 'radio' ? 'radiogroup' : undefined"
    class="choice-control-group"
    :aria-describedby="!!error ? id : undefined"
    :aria-invalid="!!error ? 'true' : undefined"
  >
    <slot />
    <span v-if="!!error" :id role="alert" class="choice-control-group__error">
      {{ error }}
    </span>
  </fieldset>
</template>
