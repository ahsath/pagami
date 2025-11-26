<script lang="ts" setup>
import { computed, ref, useId } from "vue";
import AppBar from "@/components/ui/app-bar/AppBar.vue";
import IconButton from "@/components/ui/button/IconButton.vue";
import Sheet from "@/components/ui/sheet/Sheet.vue";
import NavRail from "@/components/ui/nav-rail/NavRail.vue";
import NavItem from "@/components/ui/nav-item/NavItem.vue";
import SelectSimple from "@/components/ui/select/SelectSimple.vue";
import {
  List,
  ListContent,
  ListLeading,
  ListTrailing,
  ListSupportingText,
  ListOverline,
} from "@/components/ui/list";
import { useSheet, inert } from "@/composables/useSheet";
import InputFieldSimple from "@/components/ui/input-field/InputFieldSimple.vue";
import SearchRounded from "~icons/material-symbols/search-rounded?width=24&height=24";
import StarsRounded from "~icons/material-symbols/stars-rounded?width=24&height=24";
import MenuRounded from "~icons/material-symbols/menu-rounded?width=24&height=24";
import MenuOpenRounded from "~icons/material-symbols/menu-open-rounded?width=24&height=24";
import MoneyBagRounded from "~icons/material-symbols/money-bag-rounded?width=24&height=24";
import PersonOutlineRounded from "~icons/material-symbols/person-outline-rounded?width=24&height=24";
import CircleOutline from "~icons/material-symbols/circle-outline?width=24&height=24";
import RadioButtonCheckedOutline from "~icons/material-symbols/radio-button-checked-outline?width=24&height=24";
import CheckBoxOutlineBlank from "~icons/material-symbols/check-box-outline-blank?width=24&height=24";
import Checkbox from "~icons/material-symbols/check-box?width=24&height=24";
import ContentCopyOutlineRounded from "~icons/material-symbols/content-copy-outline-rounded?width=24&height=24";
import CloseRounded from "~icons/material-symbols/close-rounded?width=24&height=24";
import SettingsOutlineRounded from "~icons/material-symbols/settings-outline-rounded?width=24&height=24";
import InboxRounded from "~icons/material-symbols/inbox-rounded?width=24&height=24";
import SendOutlineRounded from "~icons/material-symbols/send-outline-rounded?width=24&height=24";
import FavoriteOutlineRounded from "~icons/material-symbols/favorite-outline-rounded?width=24&height=24";
import DeleteOutlineRounded from "~icons/material-symbols/delete-outline-rounded?width=24&height=24";
import VisibilityOutlineRounded from "~icons/material-symbols/visibility-outline-rounded?width=24&height=24";
import VisibilityOffOutlineRounded from "~icons/material-symbols/visibility-off-outline-rounded?width=24&height=24";
import BaseCheckbox from "../base/forms/BaseCheckbox.vue";
import BaseRadio from "../base/forms/BaseRadio.vue";
import RadioButton from "@/components/ui/radio-button/RadioButton.vue";
import RadioButtonGroup from "@/components/ui/radio-button/RadioButtonGroup.vue";

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
const rightSheet = useSheet(rightSheetId, { type: "modal" });
const checkbox = ref(["123"]);
const checkbox2 = ref("");
const radio = ref("");
const radioButtonModel = ref("");

const isPasswordVisible = ref(false);
const passwordInputType = computed(() => {
  return isPasswordVisible.value ? "text" : "password";
});
const passwordAriaLabel = computed(() => {
  return isPasswordVisible.value ? "Hide password" : "Show password";
});
</script>

<template>
  <div class="layout" :inert>
    <NavRail :id="navRailId">
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
            v-if="navRail.isModal"
            class="button icon-button icon-button--size-m"
            aria-label="Cerrar navegación"
            :aria-expanded="navRail.isOpen"
            :aria-controls="navRailId"
            @click="navRail.toggle"
          >
            <MenuRounded v-show="!navRail.isOpen" aria-hidden="true" />
            <MenuOpenRounded v-show="navRail.isOpen" aria-hidden="true" />
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
          <button class="button"><span>Text</span></button>
          <button
            aria-label="Configurar"
            :aria-expanded="rightSheet.isOpen"
            :aria-controls="rightSheetId"
            class="button icon-button"
            type="button"
            @click="rightSheet.toggle"
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
            <form novalidate>
              <RadioButtonGroup
                v-model="radioButtonModel"
                error="Error message"
              >
                <legend>Radio button group</legend>
                <RadioButton
                  name="radio-button"
                  value="radio-button-val1"
                  required
                />
                <RadioButton
                  name="radio-button"
                  value="radio-button-val2"
                  required
                />
                <RadioButton
                  name="radio-button"
                  value="radio-button-val3"
                  required
                  disabled
                />
              </RadioButtonGroup>
              <button type="submit">submit</button>
            </form>
            <BaseCheckbox id="testid" v-model="checkbox">
              Base checkbox
            </BaseCheckbox>
            <BaseCheckbox
              id="testid"
              v-model="checkbox2"
              true-value="si"
              false-value="no"
            >
              Base checkbox2
            </BaseCheckbox>
            <fieldset>
              <label for="radio1">
                Label for radio 1
                <BaseRadio
                  id="radio1"
                  v-model="radio"
                  name="radio"
                  value="radio1"
                  checked
                  disabled
                />
              </label>
              <label for="radio2">
                Label for radio 2
                <BaseRadio
                  id="radio2"
                  v-model="radio"
                  name="radio"
                  value="radio2"
                />
              </label>
            </fieldset>
            <h1 class="text-display-large">Display large</h1>
            <p class="text-body-medium">Body medium</p>
            <p class="text-body-extra-large">Body extra large</p>
            <button class="button button--style-filled">
              <span>Filled</span>
            </button>
            <button class="button button--style-tonal">
              <span>Tonal</span>
            </button>
            <button class="button button--style-outline">
              <span>Outline</span>
            </button>
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
            <button class="button button--style-filled" disabled>
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
              :type="passwordInputType"
              required
              disabled
            >
              <template #trailing-icon="{ disabled }">
                <button
                  class="button icon-button"
                  :aria-label="passwordAriaLabel"
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
            <List
              v-for="radioItem in listRadioGroup1"
              :key="radioItem.value"
              v-model="radioModel"
              :value="radioItem.value"
              type="radio"
              size="three-line"
              name="list-radio-group"
              #="{ checked }"
            >
              <ListLeading>
                <PersonOutlineRounded />
              </ListLeading>
              <ListContent>
                <ListOverline>Overline</ListOverline>
                <div>Headline</div>
                <ListSupportingText>Supporting text</ListSupportingText>
              </ListContent>
              <ListTrailing>
                <RadioButtonCheckedOutline v-show="checked" />
                <CircleOutline v-show="!checked" />
              </ListTrailing>
            </List>
            <br />
            <List
              id="list-checkbox"
              v-model="checkboxModel1"
              type="checkbox"
              value="list-checkbox-group-1"
              true-value="si"
              false-value="no"
              #="{ checked }"
            >
              <ListLeading>
                <PersonOutlineRounded />
              </ListLeading>
              <ListContent>
                <div>Headline</div>
              </ListContent>
              <ListTrailing>
                <Checkbox v-show="checked" />
                <CheckBoxOutlineBlank v-show="!checked" />
              </ListTrailing>
            </List>
            <br />
            <List
              v-for="checkboxItem in listCheckboxGroup1"
              :id="checkboxItem.value"
              :key="checkboxItem.value"
              v-model="checkboxModel2"
              :value="checkboxItem.value"
              type="checkbox"
              #="{ checked }"
            >
              <ListLeading>
                <PersonOutlineRounded />
              </ListLeading>
              <ListContent>
                <div>Headline</div>
              </ListContent>
              <ListTrailing>
                <Checkbox v-show="checked" />
                <CheckBoxOutlineBlank v-show="!checked" />
              </ListTrailing>
            </List>
            <br />
            <List size="two-line">
              <ListLeading>
                <PersonOutlineRounded />
              </ListLeading>
              <ListContent>
                <div>Headline</div>
                <ListSupportingText>Supporting text</ListSupportingText>
              </ListContent>
              <ListTrailing>
                <IconButton aria-label="Copiar">
                  <ContentCopyOutlineRounded />
                </IconButton>
              </ListTrailing>
            </List>
            <br id="list-test" />
            <List size="three-line">
              <ListLeading>
                <PersonOutlineRounded />
              </ListLeading>
              <ListContent>
                <ListOverline>Overline</ListOverline>
                <div>Headline</div>
                <ListSupportingText>Supporting text</ListSupportingText>
              </ListContent>
              <ListTrailing>
                <IconButton aria-label="Copiar">
                  <ContentCopyOutlineRounded />
                </IconButton>
              </ListTrailing>
            </List>
            <br />
          </div>
        </section>
      </main>
    </div>
    <Sheet :id="rightSheetId" side="right">
      <div class="sheet__container">
        <div class="sheet__header">
          <h2 class="text-title-large">Title</h2>
          <button
            class="button icon-button"
            aria-label="Cerrar menu"
            @click="rightSheet.toggle"
          >
            <CloseRounded aria-hidden="true" />
          </button>
        </div>
        <div class="sheet__content">
          <p>Content</p>
          <a href="#list-test">test a tag</a>
        </div>
        <div class="sheet__footer">
          <button class="button button--style-filled">
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </Sheet>
  </div>
</template>
