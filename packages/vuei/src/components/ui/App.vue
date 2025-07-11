<script lang="ts" setup>
import AppBar from "./app-bar/AppBar.vue";
import IconButton from "./button/IconButton.vue";
import { Menu } from "lucide-vue-next";
</script>

<template>
  <AppBar>
    <template #leading>
      <IconButton aria-label="Abrir menu">
        <Menu />
      </IconButton>
    </template>
    <template #content>
      <div class="text-lg sm:text-title-large">Label</div>
    </template>
  </AppBar>
</template>
