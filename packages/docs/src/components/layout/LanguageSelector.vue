<script setup lang="ts">
import { ref, onMounted } from "vue";
import { SelectSimple } from "@pagami/vuei";
import LanguageRounded from "~icons/material-symbols/language?width=20&height=20";

const currentLocale = ref("es");

onMounted(() => {
  const pathParts = window.location.pathname.split("/");
  if (pathParts[1]) {
    currentLocale.value = pathParts[1];
  }
});

const changeLanguage = (newLocale: string) => {
  const pathParts = window.location.pathname.split("/");
  if (pathParts[1] !== newLocale) {
    pathParts[1] = newLocale;
    window.location.pathname = pathParts.join("/");
  }
};
</script>

<template>
  <div class="language-selector">
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
  </div>
</template>

<style scoped>
.language-selector {
  display: flex;
  align-items: center;
}
</style>
