<script setup lang="ts">
import { ref } from "vue";
import { Checkbox } from "@pagami/vuei";
import StarsOutlineRounded from "~icons/material-symbols/stars-outline-rounded?width=24&height=24";
import ArrowDropdownRounded from "~icons/material-symbols/arrow-drop-down-rounded?width=24&height=24";
import WidgetsOutlineRounded from "~icons/material-symbols/widgets-outline-rounded?width=24&height=24&stroke-width=0.4&stroke=currentColor";

const radioModel = ref(true);
</script>

<template>
  <section class="pane max-w-90">
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

    <a href="#" class="list__item mb-4" aria-disabled="true" tabindex="-1">
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
  </section>
</template>
