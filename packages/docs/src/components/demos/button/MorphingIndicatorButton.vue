<script lang="ts" setup>
import { ref } from "vue";
import { LoadingIndicator } from "@pagami/vuei";
import StarsRounded from "~icons/material-symbols/stars-rounded";

const { lang = "es" } = defineProps<{
  lang?: "es" | "en";
}>();

const labels = {
  es: { loading: "Cargando", label: "Haz click en mi!" },
  en: { loading: "Loading", label: "Click me!" },
};

const busy = ref(false);

function toggleBusy() {
  if (busy.value) {
    return;
  }

  busy.value = true;

  setTimeout(() => {
    busy.value = false;
  }, 3000);
}
</script>

<template>
  <button
    class="button button--filled button--size-m"
    :aria-busy="busy"
    @click="toggleBusy"
  >
    <LoadingIndicator aria-hidden="true" />
    <StarsRounded class="button__icon" aria-hidden="true" />
    {{ busy ? labels[lang].loading : labels[lang].label }}
  </button>
</template>
