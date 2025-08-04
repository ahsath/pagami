<script lang="ts" setup>
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();

const props = defineProps<{
  id?: string;
  type?: string;
  value?: string;
}>(); // TODO: make value required if type is radio or checkbox

const radioValue = defineModel("radio");
const checkboxValue = defineModel<string[] | string | boolean>("checkbox");

const checked = computed(() => {
  if (props.type === "radio") {
    return radioValue.value === props.value;
  } else if (props.type === "checkbox") {
    if (Array.isArray(checkboxValue.value) && props.value) {
      return checkboxValue.value.includes(props.value);
    } else if (typeof checkboxValue.value === "string") {
      return checkboxValue.value === attrs["true-value"];
    } else if (typeof checkboxValue.value === "boolean") {
      return checkboxValue.value;
    }
  }
  return false;
});
</script>

<template>
  <component
    class="list"
    :class="{ 'list--checked': checked }"
    :is="type === 'radio' || type === 'checkbox' ? 'label' : 'div'"
    :for="id"
  >
    <slot :checked />
    <input
      v-if="type === 'radio'"
      v-model="radioValue"
      class="list__input"
      type="radio"
      :="$attrs"
      :value
      :id
    />
    <input
      v-if="type === 'checkbox'"
      v-model="checkboxValue"
      class="list__input"
      type="checkbox"
      :="$attrs"
      :value
      :id
    />
  </component>
</template>
