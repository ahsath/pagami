<script lang="ts" setup>
import { computed, useAttrs, watch } from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const { value = undefined } = defineProps<{
  value?: string | string[] | boolean | undefined;
}>();

const emit = defineEmits<{ "change:checked": [checked: boolean] }>();

const modelValue = defineModel<string[] | string | boolean | undefined>();

const checked = computed(() => {
  if (Array.isArray(modelValue.value) && typeof value === "string") {
    return modelValue.value.includes(value);
  } else if (typeof modelValue.value === "string") {
    return modelValue.value === attrs["true-value"];
  } else if (typeof modelValue.value === "boolean") {
    return modelValue.value;
  }
  return false;
});

watch(
  checked,
  () => {
    emit("change:checked", checked.value);
  },
  { immediate: true },
);
</script>

<template>
  <slot :checked />
  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
  <input
    v-model="modelValue"
    class="sr-only"
    type="checkbox"
    :="attrs"
    :value
  />
</template>
