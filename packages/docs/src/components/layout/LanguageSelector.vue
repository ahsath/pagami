<script setup lang="ts">
import { ref } from "vue";
import { SelectSimple } from "@pagami/vuei";
import LanguageRounded from "~icons/material-symbols/language?width=24&height=24";

const props = defineProps<{
  locale?: string;
  translations?: Record<string, string>;
  selectorLabel?: string;
}>();

const currentLocale = ref(props.locale || "es");

const changeLanguage = (newLocale: string) => {
  if (props.translations && props.translations[newLocale]) {
    window.location.pathname = props.translations[newLocale];
  } else {
    // Fallback if no specific translation mapping exists
    const pathParts = window.location.pathname.split("/");
    if (pathParts[1] !== newLocale) {
      pathParts[1] = newLocale;
      window.location.pathname = pathParts.join("/");
    }
  }
};
</script>

<template>
  <SelectSimple
    v-model="currentLocale"
    :aria-label="selectorLabel"
    :options="[
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' },
    ]"
    @update:model-value="changeLanguage"
  >
    <template #leading-icon>
      <LanguageRounded aria-hidden="true" />
    </template>
  </SelectSimple>
</template>
