<script lang="ts" setup>
import { useTemplateRef } from "vue";
defineProps<{
  id: string;
  label?: string;
  prefix?: string;
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
  <div class="input-field-simple">
    <label :for="id" class="input-field-simple__label" v-show="label">
      {{ label }}
    </label>
    <div class="input-field-simple__container" @click="focusInput">
      <div
        class="input-field-simple__leading-icon"
        v-if="$slots['leading-icon']"
        @click.stop="focusInput"
      >
        <slot name="leading-icon" />
      </div>
      <div
        class="input-field-simple__prefix"
        v-if="prefix"
        @click.stop="focusInput"
      >
        {{ prefix }}
      </div>
      <input
        type="text"
        class="input-field-simple__input"
        ref="inputRef"
        v-model="model"
        :id
        :placeholder
      />
    </div>
    <div class="input-field-simple__supporting-text" v-show="supportingText">
      {{ supportingText }}
    </div>
  </div>
</template>
