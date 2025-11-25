<script setup lang="ts">
import { provide, useId } from "vue";

const { error = undefined } = defineProps<{ error?: string }>();

const model = defineModel<string>();

provide("model", model);

const id = useId();
</script>

<template>
  <fieldset
    role="radiogroup"
    class="radio-button-group"
    :aria-describedby="error ? id : undefined"
    :aria-invalid="error ? 'true' : undefined"
  >
    <slot />
    <span v-if="error" :id role="alert" class="radio-button-group__error">
      {{ error }}
    </span>
  </fieldset>
</template>
