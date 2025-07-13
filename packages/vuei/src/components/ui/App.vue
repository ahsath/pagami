<script lang="ts" setup>
import AppBar from "./app-bar/AppBar.vue";
import IconButton from "./button/IconButton.vue";
import { Menu } from "lucide-vue-next";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
</script>

<template>
  <AppBar>
    <template #leading>
      <Sheet>
        <SheetTrigger as-child>
          <IconButton aria-label="Abrir menu">
            <Menu />
          </IconButton>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader #headline> Title </SheetHeader>
          <div class="pt-3 pr-3 pb-4 pl-6">Sheet content</div>
        </SheetContent>
      </Sheet>
    </template>
    <template #content>
      <div class="text-title-large">Vuei</div>
    </template>
    <template #trailing>
      <button class="button">Label</button>
    </template>
  </AppBar>
</template>
