<script lang="ts" setup>
import { computed, useAttrs, watch } from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

// `value` is null to prevent a radio from being checked on mount (if not intentional)
// due to how `v-model` works, after selecting a radio `v-model` will take the value of the `value` prop
// making it as if were checked but shouldn't
const { value = null } = defineProps<{ value?: string }>();

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
  <input v-model="modelValue" type="radio" :="attrs" :value />
</template>
