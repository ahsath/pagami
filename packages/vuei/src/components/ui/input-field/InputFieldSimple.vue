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
  supportingText?: string;
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
    class="input-field-simple"
    :class="{
      'input-field-simple--state-error': !disabled && error,
    }"
  >
    <label v-show="label" :for="id" class="input-field-simple__label">
      {{ label }}
    </label>
    <div
      class="input-field-simple__container"
      role="button"
      tabindex="0"
      @focus="focusInput"
      @keydown.enter.self="focusInput"
      @keydown.space.self="focusInput"
      @click.self="focusInput"
    >
      <div
        v-if="$slots['leading-icon']"
        class="input-field-simple__leading-icon"
      >
        <slot name="leading-icon" />
      </div>
      <span v-if="prefix" class="input-field-simple__prefix">
        {{ prefix }}
      </span>
      <input
        :id
        ref="inputRef"
        v-model="model"
        class="input-field-simple__input"
        :="$attrs"
        :disabled
      />
      <span v-if="suffix" class="input-field-simple__suffix">
        {{ suffix }}
      </span>
      <div v-if="error" class="input-field-simple__trailing-icon">
        <ErrorRounded aria-hidden="true" />
      </div>
      <div
        v-else-if="$slots['trailing-icon']"
        class="input-field-simple__trailing-icon"
      >
        <slot name="trailing-icon" :disabled />
      </div>
      <div
        v-else-if="clearable && model"
        class="input-field-simple__trailing-icon"
      >
        <button
          class="button icon-button"
          aria-label="Limpiar campo"
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
      class="input-field-simple__supporting-text"
      role="alert"
    >
      {{ error }}
    </span>
    <span
      v-else-if="supportingText"
      class="input-field-simple__supporting-text"
    >
      {{ supportingText }}
    </span>
  </div>
</template>
