<script lang="ts" setup>
import { ref } from "vue";
import { TextField } from "@pagami/vuei";

const { lang = "es" } = defineProps<{ lang?: "es" | "en" }>();
const labels = {
  es: { label: "Buscador", value: "Texto a limpiar", clearLabel: "Limpiar campo" },
  en: { label: "Searcher", value: "Text to clear", clearLabel: "Clear field" },
};
const value = ref(labels[lang].value);
</script>

<template>
  <TextField
    v-model="value"
    :label="labels[lang].label"
    :clear-label="labels[lang].clearLabel"
    clearable
    text-field-class="max-w-xs"
  />
</template>
