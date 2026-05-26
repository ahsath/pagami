<script lang="ts" setup>
import { ref } from "vue";
import { TextField } from "@pagami/vuei";
import SearchRounded from "~icons/material-symbols/search-rounded?width=24&height=24";
import PersonRounded from "~icons/material-symbols/person-rounded?width=24&height=24";

const { lang = "es" } = defineProps<{ lang?: "es" | "en" }>();
const value = ref("");
const labels = {
  es: { label: "Buscar usuario", placeholder: "Buscar..." },
  en: { label: "Search user", placeholder: "Search..." },
};
</script>

<template>
  <TextField
    v-model="value"
    :label="labels[lang].label"
    :placeholder="labels[lang].placeholder"
    text-field-class="max-w-xs"
  >
    <template #leading-icon>
      <SearchRounded />
    </template>
    <template #trailing-icon>
      <PersonRounded />
    </template>
  </TextField>
</template>
