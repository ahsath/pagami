<script setup lang="ts">
import { ref } from "vue";
import { useSheet, Sheet } from "@pagami/vuei";
import CloseRounded from "~icons/material-symbols/close-rounded?width=24&height=24";
import ArrowDropdownRounded from "~icons/material-symbols/arrow-drop-down-rounded?width=24&height=24";
import WidgetsOutlineRounded from "~icons/material-symbols/widgets-outline-rounded?width=24&height=24&stroke-width=0.5&stroke=currentColor";

const sidebar = useSheet("sidebar");
const open = ref(true);
</script>

<template>
  <Sheet is="aside" id="sidebar" v-model:open="open" inset>
    <div class="sheet__container">
      <div class="sheet__header ex:hidden">
        <button
          class="button icon-button ml-auto"
          aria-label="Cerrar menu"
          @click="sidebar?.toggle"
        >
          <CloseRounded aria-hidden="true" />
        </button>
      </div>
      <div class="sheet__content ex:py-6">
        <nav>
          <details class="list" open>
            <summary class="list__item">
              <div class="list__leading">
                <WidgetsOutlineRounded class="list__leading-icon" />
              </div>
              <div class="list__content">
                <div class="list__label-text">Componentes</div>
              </div>
              <div class="list__trailing">
                <ArrowDropdownRounded aria-hidden="true" />
              </div>
            </summary>
            <a href="/components/buttons" class="list__item">
              <div class="list__content list__content--indent">
                <div class="list__label-text">Botones</div>
              </div>
            </a>
            <a href="/components/text-fields" class="list__item">
              <div class="list__content list__content--indent">
                <div class="list__label-text">Campos de texto</div>
              </div>
            </a>
          </details>
        </nav>
      </div>
    </div>
  </Sheet>
</template>
