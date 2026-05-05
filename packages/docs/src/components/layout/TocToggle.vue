<script setup lang="ts">
import { useSheet } from "@pagami/vuei";
import TocRounded from "~icons/material-symbols/toc-rounded?width=24&height=24";

defineOptions({ inheritAttrs: false });

defineProps<{
  label?: string;
}>();

const toc = useSheet("toc");
</script>

<template>
  <button
    class="button icon-button"
    :aria-label="label"
    :aria-expanded="toc?.isOpen ? 'true' : 'false'"
    aria-controls="toc"
    type="button"
    @click="toc?.toggle"
  >
    <TocRounded aria-hidden="true" />
  </button>
</template>
