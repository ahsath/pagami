<script lang="ts" setup>
import { ref, useId, watch } from "vue";
import AppBar from "@/components/ui/app-bar/AppBar.vue";
import IconButton from "@/components/ui/button/IconButton.vue";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sheet2 from "@/components/ui/sheet2/Sheet2.vue";
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
import MoneyBagRounded from "~icons/material-symbols/money-bag-rounded?width=24&height=24";
import PersonOutlineRounded from "~icons/material-symbols/person-outline-rounded?width=24&height=24";
import CircleOutline from "~icons/material-symbols/circle-outline?width=24&height=24";
import RadioButtonCheckedOutline from "~icons/material-symbols/radio-button-checked-outline?width=24&height=24";
import CheckBoxOutlineBlank from "~icons/material-symbols/check-box-outline-blank?width=24&height=24";
import Checkbox from "~icons/material-symbols/check-box?width=24&height=24";
import ContentCopyOutlineRounded from "~icons/material-symbols/content-copy-outline-rounded?width=24&height=24";

const inputFieldModel = ref();
const selectModel = ref("VE");
const radioModel = ref();
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

const modalId = useId();
const leftSheet = useSheet(modalId, { type: "modal" });
</script>

<template>
  <div class="layout" :inert>
    <Sheet2 :id="modalId" />
    <div class="grow">
      <AppBar class="sticky top-0">
        <template #leading>
          <Sheet>
            <!-- <SheetTrigger as-child>
              <IconButton aria-label="Abrir menu">
                <MenuRounded />
              </IconButton>
            </SheetTrigger> -->
            <IconButton
              @click="leftSheet.toggle"
              aria-label="Abrir menu"
              :aria-expanded="leftSheet.isOpen"
              :aria-controls="modalId"
            >
              <MenuRounded aria-hidden="true" />
            </IconButton>
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
          <SelectSimple
            v-model="selectModel"
            id="country-selector"
            :options="[
              { value: 'EC', label: 'Ecuador' },
              { value: 'VE', label: 'Venezuela' },
            ]"
            #leading-icon
          >
            <img v-show="selectModel === 'EC'" src="/ecuador.svg" alt="" />
            <img v-show="selectModel === 'VE'" src="/venezuela.svg" alt="" />
          </SelectSimple>
          <button class="button"><span>Text</span></button>
        </template>
      </AppBar>
      <main>
        <section
          class="pane grid grid-cols-4 md:grid-cols-8 ex:grid-cols-12 gap-4 md:gap-6"
        >
          <div class="col-span-full md:col-[2/8] ex:col-[3/11] lg:col-[4/10]">
            <button class="button button--style-filled">
              <span>Filled</span>
            </button>
            <button class="button button--style-tonal">
              <span>Tonal</span>
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
              id="input-field"
              label="Label*"
              prefix="$"
              placeholder="Placeholder"
              supporting-text="Supporting text"
              required
              clearable
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
              id="input-field"
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
              id="input-field-2"
              label="Label*"
              error="Error message"
              required
              clearable
            >
              <template #trailing-icon>
                <MoneyBagRounded aria-hidden="true" />
              </template>
            </InputFieldSimple>
            <br />
            <List
              v-for="radioItem in listRadioGroup1"
              v-model:radio="radioModel"
              :value="radioItem.value"
              :id="radioItem.value"
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
              v-model:checkbox="checkboxModel1"
              type="checkbox"
              id="list-checkbox"
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
              v-model:checkbox="checkboxModel2"
              :id="checkboxItem.value"
              :value="checkboxItem.value"
              type="checkbox"
              #="{ checked }"
            >
              <ListLeading>
                <PersonOutlineRounded />
              </ListLeading>
              <ListContent> <div>Headline</div> </ListContent>
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
            <br />
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
  </div>
</template>
