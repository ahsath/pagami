<script setup lang="ts">
import { useSheet, Sheet } from "@pagami/vuei";
import CloseRounded from "~icons/material-symbols/close-rounded?width=24&height=24";
import StarsOutlineRounded from "~icons/material-symbols/stars-outline-rounded?width=24&height=24";
import ArrowDropdownRounded from "~icons/material-symbols/arrow-drop-down-rounded?width=24&height=24";

const nav = useSheet("nav");
</script>

<template>
  <Sheet id="nav" to="#teleported" side="left" open>
    <div class="sheet__container">
      <div class="sheet__header">
        <button
          class="button icon-button ml-auto"
          aria-label="Cerrar menu"
          @click="nav?.toggle"
        >
          <CloseRounded aria-hidden="true" />
        </button>
      </div>
      <div class="sheet__content px-2">
        <a href="." class="list__item" aria-current="page">
          <div class="list__content list__content--indent">
            <div class="list__label-text">Details 1</div>
          </div>
        </a>
        <nav>
          <details class="list" open>
            <summary class="list__item">
              <div class="list__leading">
                <StarsOutlineRounded class="list__leading-icon" />
              </div>
              <div class="list__content">
                <div class="list__label-text">Componentes</div>
              </div>
              <div class="list__trailing">
                <ArrowDropdownRounded aria-hidden="true" />
              </div>
            </summary>
            <a href="." class="list__item">
              <div class="list__content list__content--indent">
                <div class="list__label-text">Details 1</div>
              </div>
            </a>
            <label class="list__item" for="checkbox2">
              <div class="list__leading">
                <StarsOutlineRounded class="list__leading-icon" />
              </div>
              <div class="list__content">
                <div class="list__overline">Overline</div>
                <div class="list__label-text">Label text</div>
                <div class="list__supporting-text">
                  Supporting line text, lorem ipsum dolor
                </div>
              </div>
              <div class="list__trailing">
                <input id="checkbox2" type="checkbox" class="list__input" />
              </div>
            </label>
            <a href="#" class="list__item">
              <div class="list__content list__content--indent">
                <div class="list__label-text">Details 2</div>
              </div>
            </a>
          </details>
        </nav>
      </div>
    </div>
  </Sheet>
</template>
