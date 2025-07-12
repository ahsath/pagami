<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core";
import {
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui";
import SheetOverlay from "./SheetOverlay.vue";

interface SheetContentProps extends DialogContentProps {
  side?: "top" | "right" | "bottom" | "left";
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: "left",
});

const emits = defineEmits<DialogContentEmits>();

const delegatedProps = reactiveOmit(props, "side");

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <SheetOverlay />
    <DialogContent
      class="sheet"
      :class="{
        'sheet--side-top': props.side === 'top',
        'sheet--side-right': props.side === 'right',
        'sheet--side-bottom': props.side === 'bottom',
        'sheet--side-left': props.side === 'left',
      }"
      :aria-describedby="undefined"
      v-bind="{ ...forwarded, ...$attrs }"
    >
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
