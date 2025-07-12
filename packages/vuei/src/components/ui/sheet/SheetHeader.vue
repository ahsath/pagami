<script setup lang="ts">
import { DialogTitle, DialogClose } from "reka-ui";
import { X } from "lucide-vue-next";
</script>

<template>
  <div class="flex items-center justify-between pt-3 pr-3 pb-4 pl-6">
    <DialogTitle class="text-title-large">
      <slot name="headline" />
    </DialogTitle>

    <DialogClose class="icon-button" aria-label="Cerrar sheet">
      <X />
    </DialogClose>
  </div>
</template>
