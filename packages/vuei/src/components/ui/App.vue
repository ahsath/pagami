<script lang="ts" setup>
import { ref } from "vue";
import AppBar from "@/components/ui/app-bar/AppBar.vue";
import IconButton from "@/components/ui/button/IconButton.vue";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { InputFieldSimple } from "@/components/ui/input-field";
import SearchRounded from "~icons/material-symbols/search-rounded?width=24&height=24";
import StarsRounded from "~icons/material-symbols/stars-rounded?width=24&height=24";
import MenuRounded from "~icons/material-symbols/menu-rounded?width=24&height=24";
import MoneyBagRounded from "~icons/material-symbols/money-bag-rounded?width=24&height=24";

const inputFieldModel = ref("");
</script>

<template>
  <AppBar>
    <template #leading>
      <Sheet>
        <SheetTrigger as-child>
          <IconButton aria-label="Abrir menu">
            <MenuRounded />
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
        <StarsRounded />
        <span>Filled with icon</span>
      </button>
      <button class="button button--style-filled button--size-m">
        <StarsRounded />
        <span>Filled with icon - Size: M</span>
      </button>
      <button class="button button--style-elevated">
        <span>Elevated</span>
      </button>
      <button class="button button--style-elevated button--size-m">
        <span>Elevated - Size: M</span>
      </button>
      <button class="button">
        <StarsRounded /><span>Text with icon</span>
      </button>
      <form @submit.prevent novalidate>
        <InputFieldSimple
          v-model="inputFieldModel"
          id="input-field"
          label="Label*"
          prefix="$"
          suffix=".00"
          placeholder="Placeholder"
          error="Error message"
          supporting-text="Supporting text"
          required
        >
          <template #leading-icon>
            <SearchRounded aria-hidden="true" />
          </template>
          <template #trailing-icon>
            <MoneyBagRounded aria-hidden="true" />
          </template>
        </InputFieldSimple>
      </form>
    </div>
  </section>
</template>
