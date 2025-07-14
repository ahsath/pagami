<script lang="ts" setup>
import AppBar from "./app-bar/AppBar.vue";
import IconButton from "./button/IconButton.vue";
import { Menu, Star } from "lucide-vue-next";
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
      <button class="button button--style-filled"><span>Filled</span></button>
      <button class="button button--style-tonal"><span>Tonal</span></button>
      <button class="button"><span>Text</span></button>
    </template>
  </AppBar>
  <section
    class="pane grid grid-cols-4 md:grid-cols-8 ex:grid-cols-12 gap-4 md:gap-6"
  >
    <div class="col-span-full md:col-[2/8] ex:col-[3/11] lg:col-[4/10]">
      <button class="button button--style-filled">
        <Star />
        <span>Filled with icon</span>
      </button>
      <button class="button button--style-filled button--size-m">
        <Star />
        <span>Filled with icon - Size: M</span>
      </button>
      <button class="button button--style-elevated">
        <span>Elevated</span>
      </button>
      <button class="button button--style-elevated button--size-m">
        <span>Elevated - Size: M</span>
      </button>
      <button class="button"><Star /><span>Text with icon</span></button>
    </div>
  </section>
</template>
