<script lang="ts" setup>
import { ref, useId } from "vue";
import { BaseCheckbox, BaseRadio } from "@/components/base/forms/index.ts";

const {
  type = "radio",
  value = undefined,
  size = "one-line",
  name = undefined,
} = defineProps<{
  type?: "radio" | "checkbox";
  value?: string | undefined;
  size?: "one-line" | "two-line" | "three-line";
  name?: string | undefined;
}>();

const modelValue = defineModel<string[] | string | boolean>();
const id = useId();
const checked = ref<boolean>();
</script>

<template>
  <component
    :is="'div'"
    :for="id"
    class="list"
    :class="[
      {
        'list--alignment-top': size === 'three-line',
        'list--size-one-line': size === 'one-line',
        'list--size-two-line': size === 'two-line',
        'list--size-three-line': size === 'three-line',
        'list--checked': checked,
      },
    ]"
  >
    <slot :checked />
    <BaseRadio
      v-if="type === 'radio'"
      :id
      v-model="modelValue"
      class="list__input"
      :value
      :name
      @change:checked="checked = $event"
    />
    <BaseCheckbox
      v-if="type === 'checkbox'"
      :id
      v-model="modelValue"
      class="list__input"
      :value
      :name
      @change:checked="checked = $event"
    />
  </component>
</template>
