<script lang="ts" setup>
import { ref } from "vue";
import { TextField } from "@pagami/vuei";
import VisibilityOutlineRounded from "~icons/material-symbols/visibility-outline-rounded?width=24&height=24";
import VisibilityOffOutlineRounded from "~icons/material-symbols/visibility-off-outline-rounded?width=24&height=24";

const { lang = "es" } = defineProps<{ lang?: "es" | "en" }>();
const value = ref("mi-contraseña-segura");
const isPasswordVisible = ref(false);
const labels = {
  es: {
    label: "Contraseña",
    placeholder: "••••••••",
    ariaShow: "Mostrar contraseña",
    ariaHide: "Ocultar contraseña",
  },
  en: {
    label: "Password",
    placeholder: "••••••••",
    ariaShow: "Show password",
    ariaHide: "Hide password",
  },
};
</script>

<template>
  <TextField
    v-model="value"
    :type="isPasswordVisible ? 'text' : 'password'"
    :label="labels[lang].label"
    :placeholder="labels[lang].placeholder"
    text-field-class="max-w-xs"
  >
    <template #trailing-icon="{ disabled }">
      <button
        class="button icon-button"
        :aria-label="
          isPasswordVisible ? labels[lang].ariaHide : labels[lang].ariaShow
        "
        :disabled
        type="button"
        @click="isPasswordVisible = !isPasswordVisible"
      >
        <VisibilityOutlineRounded v-show="isPasswordVisible" aria-hidden="true" />
        <VisibilityOffOutlineRounded v-show="!isPasswordVisible" aria-hidden="true" />
      </button>
    </template>
  </TextField>
</template>
