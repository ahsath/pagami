<script lang="ts" setup>
import { ref } from "vue";
import { TextField } from "@pagami/vuei";

const { lang = "es" } = defineProps<{ lang?: "es" | "en" }>();
const value = ref("");
const labels = {
  es: {
    label: "Contraseña",
    supportingText: "Debe incluir al menos 8 caracteres y un número.",
  },
  en: {
    label: "Password",
    supportingText: "Must include at least 8 characters and a number.",
  },
};
</script>

<template>
  <TextField
    v-model="value"
    type="password"
    :label="labels[lang].label"
    placeholder="••••••••"
    :supporting-text="labels[lang].supportingText"
    text-field-class="max-w-xs"
  />
</template>
