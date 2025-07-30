<script lang="ts" setup>
import { useTemplateRef } from "vue";

defineOptions({ inheritAttrs: false });

defineProps<{
  id: string;
  label?: string;
  error?: string;
  prefix?: string;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  supportingText?: string;
}>();

const model = defineModel();

const inputRef = useTemplateRef("inputRef");

function focusInput() {
  inputRef.value?.focus();
}
</script>

<template>
  <div
    class="input-field-simple"
    :class="{ 'input-field-simple--state-error': !disabled && error }"
  >
    <label :for="id" class="input-field-simple__label" v-show="label">
      {{ label }}
    </label>
    <div class="input-field-simple__container" @click="focusInput">
      <div
        class="input-field-simple__leading-icon"
        v-if="$slots['leading-icon']"
      >
        <slot name="leading-icon" />
      </div>
      <span class="input-field-simple__prefix" v-if="prefix">
        {{ prefix }}
      </span>
      <input
        type="text"
        class="input-field-simple__input"
        ref="inputRef"
        v-model="model"
        :="$attrs"
        :id
        :disabled
        :placeholder
      />
      <div
        class="input-field-simple__trailing-icon"
        v-if="$slots['trailing-icon']"
      >
        <slot name="trailing-icon" />
      </div>
    </div>
    <p
      class="input-field-simple__supporting-text"
      v-if="!disabled && error"
      role="alert"
    >
      {{ error }}
    </p>
    <p class="input-field-simple__supporting-text" v-else-if="supportingText">
      {{ supportingText }}
    </p>
  </div>
</template>
