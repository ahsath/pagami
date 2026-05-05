<script setup lang="ts">
import { ref, watch } from "vue";
import { SelectSimple } from "@pagami/vuei";
import LanguageRounded from "~icons/material-symbols/language?width=20&height=20";

const props = defineProps<{
  locale?: string;
  translations?: Record<string, string>;
}>();

const currentLocale = ref(props.locale || "es");

// Sync currentLocale if prop changes (though it shouldn't often in SSR)
watch(() => props.locale, (newLoc) => {
  if (newLoc) currentLocale.value = newLoc;
});

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
    id="language-select"
    v-model="currentLocale"
    :options="[
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' },
    ]"
    @update:model-value="changeLanguage"
  >
    <template #leading-icon>
      <LanguageRounded />
    </template>
  </SelectSimple>
</template>
