<script setup lang="ts">
import { ref, watch } from "vue";
import { Checkbox, useSheet } from "@pagami/vuei";
import StarsOutlineRounded from "~icons/material-symbols/stars-outline-rounded?width=24&height=24";
import MenuRounded from "~icons/material-symbols/menu-rounded?width=24&height=24";

const nav = useSheet("nav");
const radioModel = ref(true);

watch(radioModel, () => {
  console.log(radioModel.value);
});
</script>

<template>
  <div class="max-w-90 mx-auto pt-4 px-4 pb-24 bg-surface-container">
    <button
      aria-label="Abrir menu"
      :aria-expanded="nav?.isOpen"
      aria-controls="nav"
      class="button icon-button"
      type="button"
      @click="nav?.toggle"
    >
      <MenuRounded aria-hidden="true" />
    </button>
    <fieldset class="list mb-4">
      <label class="list__item" for="checkbox">
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
          <Checkbox
            id="checkbox"
            v-model="radioModel"
            class="list__input"
            name="radio-button"
            value="checkbox"
          />
        </div>
      </label>
    </fieldset>

    <nav class="list mb-4" aria-disabled="true">
      <a href="#" class="list__item" tabindex="-1">
        <div class="list__content">
          <div class="list__label-text">Label text</div>
        </div>
      </a>
    </nav>

    <a href="#" class="list__item mb-4" aria-disabled="true">
      <div class="list__leading">
        <button class="button icon-button" type="button">
          <StarsOutlineRounded />
        </button>
      </div>
      <div class="list__content">
        <div class="list__label-text">Standalone list item</div>
      </div>
      <div class="list__trailing">
        <div class="list__trailing-text">Enabled</div>
      </div>
    </a>

    <ul class="list">
      <li class="list__item mb-4">
        <div class="list__leading">
          <StarsOutlineRounded class="list__leading-icon" />
        </div>
        <div class="list__content">
          <div class="list__label-text">Label text</div>
        </div>
      </li>
      <li class="list__item mb-4">
        <div class="list__content list__content--indent">
          <div class="list__label-text">Label text</div>
        </div>
      </li>
      <li class="list__item mb-4">
        <div class="list__leading">
          <button class="button icon-button" type="button">
            <StarsOutlineRounded />
          </button>
        </div>
        <div class="list__content">
          <div class="list__label-text">Label text</div>
        </div>
      </li>
      <li class="list__item mb-4">
        <div class="list__leading">
          <button class="button icon-button" type="button">
            <StarsOutlineRounded />
          </button>
        </div>
        <div class="list__content">
          <div class="list__label-text">Label text</div>
        </div>
        <div class="list__trailing">
          <StarsOutlineRounded class="list__trailing-icon" />
        </div>
      </li>
      <li class="list__item mb-4">
        <div class="list__leading">
          <button class="button icon-button" type="button">
            <StarsOutlineRounded />
          </button>
        </div>
        <div class="list__content">
          <div class="list__label-text">Label text</div>
        </div>
        <div class="list__trailing">
          <button class="button icon-button" type="button">
            <StarsOutlineRounded />
          </button>
        </div>
      </li>
      <li class="list__item mb-4">
        <div class="list__content">
          <div class="list__label-text">Label text</div>
        </div>
        <div class="list__trailing">
          <div class="list__trailing-text">⌘C</div>
          <StarsOutlineRounded class="list__trailing-icon" />
        </div>
      </li>
      <li class="list__item">
        <div class="list__content">
          <div class="list__overline">Overline</div>
          <div class="list__label-text">Label text</div>
          <div class="list__supporting-text">
            Supporting line text, lorem ipsum dolor
          </div>
        </div>
        <div class="list__trailing">
          <div class="list__trailing-text">⌘C</div>
          <StarsOutlineRounded class="list__trailing-icon" />
        </div>
      </li>
    </ul>
  </div>
</template>
