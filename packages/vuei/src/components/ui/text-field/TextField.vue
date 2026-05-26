<script lang="ts" setup>
import { useId, useTemplateRef } from "vue";
import ErrorRounded from "~icons/material-symbols/error-rounded?width=24&height=24";
import CancelOutlineRounded from "~icons/material-symbols/cancel-outline-rounded?width=24&height=24";

defineOptions({ inheritAttrs: false });

defineProps<{
  label?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  clearable?: boolean;
  clearLabel?: string;
  supportingText?: string;
  textFieldClass?: string;
}>();

const model = defineModel<unknown>();

const inputRef = useTemplateRef("inputRef");
const id = useId();

function clearInput() {
  model.value = "";
  focusInput();
}

function focusInput() {
  inputRef.value?.focus();
}
</script>

<template>
  <div
    class="text-field"
    :class="[{ 'text-field--state-error': !disabled && error }, textFieldClass]"
  >
    <label v-show="label" :for="id" class="text-field__label">
      {{ label }}
    </label>
    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/no-static-element-interactions -->
    <div class="text-field__container" @click="focusInput">
      <div v-if="$slots['leading-icon']" class="text-field__leading-icon">
        <slot name="leading-icon" />
      </div>
      <span v-if="prefix" class="text-field__prefix">
        {{ prefix }}
      </span>
      <input
        :id
        ref="inputRef"
        v-model="model"
        class="text-field__input"
        :="$attrs"
        :disabled
      />
      <span v-if="suffix" class="text-field__suffix">
        {{ suffix }}
      </span>
      <div v-if="$slots['trailing-icon']" class="text-field__trailing-icon">
        <slot name="trailing-icon" :disabled />
      </div>
      <div v-else-if="error" class="text-field__trailing-icon">
        <ErrorRounded aria-hidden="true" />
      </div>
      <div v-else-if="clearable && model" class="text-field__trailing-icon">
        <button
          class="button icon-button"
          :aria-label="clearLabel"
          type="button"
          :disabled
          @click="clearInput"
        >
          <CancelOutlineRounded />
        </button>
      </div>
    </div>
    <span
      v-if="!disabled && error"
      class="text-field__supporting-text"
      role="alert"
    >
      {{ error }}
    </span>
    <span v-else-if="supportingText" class="text-field__supporting-text">
      {{ supportingText }}
    </span>
  </div>
</template>
