<script setup lang="ts">
import { useSheet } from "@pagami/vuei";
import MenuRounded from "~icons/material-symbols/menu-rounded?width=24&height=24";

const sidebar = useSheet("sidebar");
</script>

<template>
  <header class="app-bar">
    <div class="app-bar__leading">
      <button
        class="button icon-button ex:hidden"
        aria-label="Abrir menu"
        :aria-expanded="sidebar?.isOpen ? 'true' : 'false'"
        aria-controls="sidebar"
        type="button"
        @click="sidebar?.toggle"
      >
        <MenuRounded aria-hidden="true" />
      </button>
    </div>
    <div class="app-bar__content">
      <a href="/" class="text-title-large">Vuei</a>
    </div>
  </header>
</template>
