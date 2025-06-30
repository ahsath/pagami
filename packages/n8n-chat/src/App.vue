<script lang="ts" setup>
import { ButtonTest } from "@pagami/vuei";

export interface Props {
  webhookUrl: string;
  webhookConfig?: {
    method?: string;
    headers?: Record<string, string>;
  };
  target?: string;
  mode?: "window" | "fullscreen";
  chatInputKey?: string;
  chatSessionKey?: string;
  loadPreviousSession?: boolean;
  //   metadata: {};
  showWelcomeScreen?: boolean;
  defaultLanguage?: string;
  initialMessages?: string[];
  i18n?: {
    [key: string]: Record<string, string>;
  };
}

defineProps<Props>();
</script>

<template>
  <div class="text-red-50">
    <ButtonTest>N8nChat Button </ButtonTest>
  </div>
</template>
