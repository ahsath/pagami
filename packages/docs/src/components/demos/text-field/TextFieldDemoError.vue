<script lang="ts" setup>
import { ref, computed } from "vue";
import { TextField } from "@pagami/vuei";

const { lang = "es" } = defineProps<{ lang?: "es" | "en" }>();
const value = ref("correo-invalido");
const labels = {
  es: {
    label: "Correo electrónico*",
    placeholder: "nombre@ejemplo.com",
    error: "Introduce un correo electrónico válido.",
    supportingText: "*Requerido.",
  },
  en: {
    label: "Email address*",
    placeholder: "name@example.com",
    error: "Enter a valid email address.",
    supportingText: "*Required.",
  },
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const error = computed(() =>
  value.value && !isValidEmail(value.value) ? labels[lang].error : undefined,
);
</script>

<template>
  <TextField
    v-model="value"
    type="email"
    :label="labels[lang].label"
    :placeholder="labels[lang].placeholder"
    :error="error"
    :supporting-text="labels[lang].supportingText"
    text-field-class="max-w-xs"
  />
</template>
