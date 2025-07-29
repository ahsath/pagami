<script setup lang="ts">
import { DialogTitle, DialogClose } from "reka-ui";
import CloseRounded from "~icons/material-symbols/close-rounded?width=24&height=24";
</script>

<template>
  <div class="flex items-center justify-between pt-3 pr-3 pb-4 pl-6">
    <DialogTitle class="text-title-large">
      <slot name="headline" />
    </DialogTitle>

    <DialogClose class="button icon-button" aria-label="Cerrar sheet">
      <CloseRounded />
    </DialogClose>
  </div>
</template>
