<script lang="ts" setup>
import { computed, useAttrs, watch } from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const { value = undefined } = defineProps<{ value?: string }>();

const emit = defineEmits<{
  "change:checked": [checked: boolean];
}>();

const modelValue = defineModel<unknown>();

const checked = computed(() => modelValue.value === value);

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
  <input v-model="modelValue" class="sr-only" type="radio" :="attrs" :value />
</template>
