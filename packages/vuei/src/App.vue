<script lang="ts" setup>
import { ref, useId, watch } from "vue";
import AppBar from "@/components/ui/app-bar/AppBar.vue";
import IconButton from "@/components/ui/button/IconButton.vue";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import NavRail from "@/components/ui/nav-rail/NavRail.vue";
import NavItem from "@/components/ui/nav-item/NavItem.vue";
import SelectSimple from "@/components/ui/select/SelectSimple.vue";
import { useSheet } from "@/composables/useSheet";
import InputFieldSimple from "@/components/ui/input-field/InputFieldSimple.vue";
import LoadingIndicator from "@/components/loaders/LoadingIndicator.vue";
import SearchRounded from "~icons/material-symbols/search-rounded?width=24&height=24";
import StarsRounded from "~icons/material-symbols/stars-rounded?width=24&height=24";
import MenuRounded from "~icons/material-symbols/menu-rounded?width=24&height=24";
import MenuOpenRounded from "~icons/material-symbols/menu-open-rounded?width=24&height=24";
import MoneyBagRounded from "~icons/material-symbols/money-bag-rounded?width=24&height=24";
import PersonOutlineRounded from "~icons/material-symbols/person-outline-rounded?width=24&height=24";
import CircleOutline from "~icons/material-symbols/circle-outline?width=24&height=24";
import RadioButtonCheckedOutline from "~icons/material-symbols/radio-button-checked-outline?width=24&height=24";
import CheckBoxOutlineBlank from "~icons/material-symbols/check-box-outline-blank?width=24&height=24";
import CheckboxChecked from "~icons/material-symbols/check-box?width=24&height=24";
import ContentCopyOutlineRounded from "~icons/material-symbols/content-copy-outline-rounded?width=24&height=24";
import CloseRounded from "~icons/material-symbols/close-rounded?width=24&height=24";
import SettingsOutlineRounded from "~icons/material-symbols/settings-outline-rounded?width=24&height=24";
import InboxRounded from "~icons/material-symbols/inbox-rounded?width=24&height=24";
import SendOutlineRounded from "~icons/material-symbols/send-outline-rounded?width=24&height=24";
import FavoriteOutlineRounded from "~icons/material-symbols/favorite-outline-rounded?width=24&height=24";
import DeleteOutlineRounded from "~icons/material-symbols/delete-outline-rounded?width=24&height=24";
import VisibilityOutlineRounded from "~icons/material-symbols/visibility-outline-rounded?width=24&height=24";
import VisibilityOffOutlineRounded from "~icons/material-symbols/visibility-off-outline-rounded?width=24&height=24";
import ChoiceControlGroup from "@/components/ui/choice-control-group/ChoiceControlGroup.vue";
import RadioButton from "@/components/ui/radio-button/RadioButton.vue";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import BaseRadio from "@/components/base/forms/BaseRadio.vue";

const inputFieldModel = ref();
const selectModel = ref("VE");
const radioModel = ref("");
const checkboxModel1 = ref("");
const checkboxModel2 = ref([]);

const listRadioGroup1 = [
  { value: "list-radio-group-1" },
  { value: "list-radio-group-2" },
];

const listCheckboxGroup1 = [
  { value: "list-checkbox-group-1" },
  { value: "list-checkbox-group-2" },
];

const navRailId = useId();
const rightSheetId = useId();
const navRail = useSheet(navRailId);
const rightSheet = useSheet(rightSheetId);
const navRailOpen = ref(false);
const rightSheetOpen = ref(true);
const checkbox = ref(false);
const radioButtonModel = ref("");

const isPasswordVisible = ref(false);
</script>

<template>
  <div class="layout">
    <NavRail :id="navRailId" v-model:open="navRailOpen">
      <nav class="nav-rail__nav">
        <NavItem label="Recibidos" aria-current="page" selected>
          <template #icon-selected>
            <InboxRounded aria-hidden="true" />
          </template>
        </NavItem>
        <NavItem label="Enviados">
          <template #icon>
            <SendOutlineRounded aria-hidden="true" />
          </template>
        </NavItem>
        <NavItem label="Favoritos">
          <template #icon>
            <FavoriteOutlineRounded aria-hidden="true" />
          </template>
        </NavItem>
        <NavItem label="Papelera">
          <template #icon>
            <DeleteOutlineRounded aria-hidden="true" />
          </template>
        </NavItem>
      </nav>
    </NavRail>
    <div class="grow">
      <AppBar class="sticky top-0 z-3">
        <template #leading>
          <button
            v-if="navRail?.isModal"
            class="button icon-button icon-button--size-m"
            aria-label="Cerrar navegación"
            :aria-expanded="navRail?.isOpen ? 'true' : 'false'"
            :aria-controls="navRailId"
            @click="navRail?.toggle"
          >
            <MenuRounded v-show="!navRail?.isOpen" aria-hidden="true" />
            <MenuOpenRounded v-show="navRail?.isOpen" aria-hidden="true" />
          </button>
        </template>
        <template #content>
          <div class="text-title-large">Vuei</div>
        </template>
        <template #trailing>
          <SelectSimple
            id="country-selector"
            v-model="selectModel"
            :options="[
              { value: 'EC', label: 'Ecuador' },
              { value: 'VE', label: 'Venezuela' },
            ]"
          >
            <template #leading-icon>
              <img v-show="selectModel === 'EC'" src="/ecuador.svg" alt="" />
              <img v-show="selectModel === 'VE'" src="/venezuela.svg" alt="" />
            </template>
          </SelectSimple>
          <button class="button">Text</button>
          <button
            aria-label="Configurar"
            :aria-expanded="rightSheet?.isOpen ? 'true' : 'false'"
            :aria-controls="rightSheetId"
            class="button icon-button"
            type="button"
            @click="rightSheet?.toggle"
          >
            <SettingsOutlineRounded aria-hidden="true" />
          </button>
        </template>
      </AppBar>
      <main>
        <section
          class="pane grid grid-cols-4 md:grid-cols-8 ex:grid-cols-12 gap-4 md:gap-6"
        >
          <div class="col-span-full md:col-[2/8] ex:col-[3/11] lg:col-[4/10]">
            <NavItem
              label="Recibidos"
              aria-current="page"
              selected
              horizontal
              compact
            >
              <template #icon-selected>
                <InboxRounded aria-hidden="true" />
              </template>
            </NavItem>
            <NavItem label="Recibidos" horizontal>
              <template #icon-selected>
                <InboxRounded aria-hidden="true" />
              </template>
            </NavItem>
            <LoadingIndicator class="text-primary" aria-label="Cargando" />
            <ChoiceControlGroup v-model="radioButtonModel" type="radio">
              <legend>Radio button group</legend>
              <RadioButton
                name="radio-button"
                value="radio-button-val1"
                label="Option 1"
                required
              />
              <RadioButton
                name="radio-button"
                value="radio-button-val2"
                label="Option 2"
                required
              >
                <template #label="{ id, labelClass }">
                  <label :for="id" :class="labelClass">my custom label</label>
                </template>
              </RadioButton>
              <RadioButton
                name="radio-button"
                value="radio-button-val3"
                label="Option 3"
                required
                disabled
              />
            </ChoiceControlGroup>
            <Checkbox v-model="checkbox" error="Error message" label="Label" />
            <h1 class="text-display-large">Display large</h1>
            <p class="text-body-medium">Body medium</p>
            <p class="text-body-extra-large">Body extra large</p>
            <button
              class="button button--filled button--size-m"
              aria-busy="true"
            >
              <LoadingIndicator aria-label="Cargando" />
              <StarsRounded />
              Filled with loading indicator
            </button>
            <button class="button button--filled">
              <span>Filled</span>
            </button>
            <button class="button button--tonal">Tonal</button>
            <button class="button button--outline">
              <span>Outline</span>
            </button>
            <button class="button button--outline">
              <StarsRounded />
              <span>Outline with icon</span>
            </button>
            <button class="button button--filled">
              <StarsRounded />
              <span>Filled with icon</span>
            </button>
            <button class="button button--filled button--size-m">
              <StarsRounded />
              <span>Filled with icon - Size: M</span>
            </button>
            <button class="button button--elevated">
              <span>Elevated</span>
            </button>
            <button class="button button--elevated button--size-m">
              <span>Elevated - Size: M</span>
            </button>
            <button class="button">
              <StarsRounded /><span>Text with icon</span>
            </button>
            <button class="button button--filled" disabled>
              <span>Filled - disabled</span>
            </button>
            <InputFieldSimple
              v-model="inputFieldModel"
              label="Label*"
              prefix="$"
              placeholder="Placeholder"
              supporting-text="Supporting text"
              required
              disabled
            >
              <template #leading-icon>
                <SearchRounded aria-hidden="true" />
              </template>
              <template #trailing-icon>
                <MoneyBagRounded aria-hidden="true" />
              </template>
            </InputFieldSimple>
            <InputFieldSimple
              v-model="inputFieldModel"
              label="Label*"
              prefix="$"
              placeholder="Placeholder"
              supporting-text="Supporting text"
              required
              clearable
            >
              <template #leading-icon>
                <SearchRounded aria-hidden="true" />
              </template>
              <template #trailing-icon>
                <MoneyBagRounded aria-hidden="true" />
              </template>
            </InputFieldSimple>
            <InputFieldSimple
              label="Label*"
              error="Error message"
              required
              clearable
            >
              <template #trailing-icon>
                <MoneyBagRounded aria-hidden="true" />
              </template>
            </InputFieldSimple>
            <InputFieldSimple
              label="Password*"
              :type="isPasswordVisible ? 'text' : 'password'"
              required
            >
              <template #trailing-icon="{ disabled }">
                <button
                  class="button icon-button"
                  :aria-label="
                    isPasswordVisible ? 'Hide password' : 'Show password'
                  "
                  :disabled
                  type="button"
                  @click="isPasswordVisible = !isPasswordVisible"
                >
                  <VisibilityOutlineRounded
                    v-show="isPasswordVisible"
                    aria-hidden="true"
                  />
                  <VisibilityOffOutlineRounded
                    v-show="!isPasswordVisible"
                    aria-hidden="true"
                  />
                </button>
              </template>
            </InputFieldSimple>
            <br />
            <label
              v-for="val in ['single-select-list1', 'single-select-list2']"
              :key="val"
              class="list__item"
              :for="val"
            >
              <div class="list__leading">
                <PersonOutlineRounded />
              </div>
              <div class="list__content">
                <div class="list__overline">Overline</div>
                <div class="list__label-text">Headline</div>
                <div class="list__supporting-text">Supporting text</div>
              </div>
              <!-- <div class="list__trailing">
                <RadioButton
                  v-model="radioModel"
                  :id="val"
                  :value="val"
                  :name="val"
                />
              </div> -->
            </label>
          </div>
        </section>
      </main>
    </div>
    <Sheet
      :id="rightSheetId"
      v-model:open="rightSheetOpen"
      side="right"
      is="aside"
    >
      <div class="sheet__container">
        <div class="sheet__header">
          <h2 class="text-title-large">Title</h2>
          <button
            class="button icon-button"
            aria-label="Cerrar menu"
            @click="rightSheet?.toggle"
          >
            <CloseRounded aria-hidden="true" />
          </button>
        </div>
        <div class="sheet__content">
          <p>Content</p>
          <a href="#list-test">test a tag</a>
          <ul>
            <li class="list__item">
              <div class="list__content">
                <div class="list__label-text">Headline</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="sheet__footer">
          <button class="button button--filled">
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </Sheet>
  </div>
</template>
