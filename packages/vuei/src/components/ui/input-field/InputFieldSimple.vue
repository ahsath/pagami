<script lang="ts" setup>
import { useTemplateRef } from "vue";
import ErrorRounded from "~icons/material-symbols/error-rounded?width=24&height=24";
import CancelOutlineRounded from "~icons/material-symbols/cancel-outline-rounded?width=24&height=24";

defineOptions({ inheritAttrs: false });

defineProps<{
  id: string;
  label?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  supportingText?: string;
}>();

const model = defineModel<unknown>();

const inputRef = useTemplateRef("inputRef");

function clearInput() {
  model.value = "";
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
      'input-field-simple--state-disabled': disabled,
    }"
  >
    <label v-show="label" :for="id" class="input-field-simple__label">
      {{ label }}
    </label>
    <div class="input-field-simple__container" @click="focusInput">
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
        type="text"
        class="input-field-simple__input"
        :="$attrs"
        :disabled
        :placeholder
      />
      <span v-if="suffix" class="input-field-simple__suffix">
        {{ suffix }}
      </span>
      <div v-if="error" class="input-field-simple__trailing-icon">
        <ErrorRounded aria-hidden="true" />
      </div>
      <div
        v-else-if="clearable && model"
        class="input-field-simple__trailing-icon px-0"
      >
        <button
          class="button icon-button text-inherit"
          aria-label="Limpiar campo"
          type="button"
          @click.stop="clearInput"
        >
          <CancelOutlineRounded />
        </button>
      </div>
      <div
        v-else-if="$slots['trailing-icon']"
        class="input-field-simple__trailing-icon"
      >
        <slot name="trailing-icon" />
      </div>
    </div>
    <p
      v-if="!disabled && error"
      class="input-field-simple__supporting-text"
      role="alert"
    >
      {{ error }}
    </p>
    <p v-else-if="supportingText" class="input-field-simple__supporting-text">
      {{ supportingText }}
    </p>
  </div>
</template>
