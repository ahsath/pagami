<script lang="ts" setup>
import { ref } from "vue";
import { TextField } from "@pagami/vuei";

const { lang = "es" } = defineProps<{ lang?: "es" | "en" }>();
const value = ref("");
const labels = {
  es: { label: "Precio", placeholder: "0.00" },
  en: { label: "Price", placeholder: "0.00" },
};
</script>

<template>
  <TextField
    v-model="value"
    :label="labels[lang].label"
    prefix="$"
    suffix="USD"
    :placeholder="labels[lang].placeholder"
    text-field-class="max-w-xs"
  />
</template>
