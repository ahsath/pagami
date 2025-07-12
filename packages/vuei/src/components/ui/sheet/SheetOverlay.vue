<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core";
import { DialogOverlay, type DialogOverlayProps } from "reka-ui";

const props = defineProps<DialogOverlayProps & {}>();

const delegatedProps = reactiveOmit(props);
</script>

<template>
  <DialogOverlay class="sheet__overlay" v-bind="delegatedProps">
    <slot />
  </DialogOverlay>
</template>
