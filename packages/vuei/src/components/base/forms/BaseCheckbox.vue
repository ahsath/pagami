<script lang="ts" setup>
import { computed, useAttrs, watch } from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const { value = undefined } = defineProps<{
  value?: string | string[] | boolean | undefined;
}>();

const emit = defineEmits<{ "change:checked": [checked: boolean] }>();

// For some reason `model` when not using `v-model` from the parent is always `false`
// causing the `checked` attr to do nothing if not using `v-model`, setting to `undefined`
// fixes this. (i think internally it checks the input `checked` attr against the `model` default value - who knows)
const model = defineModel<string[] | string | boolean | undefined>({
  default: undefined,
});

const checked = computed(() => {
  if (Array.isArray(model.value) && typeof value === "string") {
    return model.value.includes(value);
  } else if (typeof model.value === "string") {
    return model.value === attrs["true-value"];
  } else if (typeof model.value === "boolean") {
    return model.value;
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
  <input v-model="model" type="checkbox" :="attrs" :value />
</template>
