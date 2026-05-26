<script lang="ts" setup>
import { TextField } from "@pagami/vuei";

const { lang = "es" } = defineProps<{ lang?: "es" | "en" }>();
const labels = {
  es: { label: "Nombre", placeholder: "Ingresa tu nombre" },
  en: { label: "Name", placeholder: "Enter your name" },
};
</script>

<template>
  <TextField
    :label="labels[lang].label"
    :placeholder="labels[lang].placeholder"
    text-field-class="max-w-xs"
  />
</template>
