<template>
  <h1 class="text-red-500">n8n chat</h1>
  <p>{{ msg }}</p>
</template>

<script lang="ts" setup>
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
  msg?: string;
}

defineProps<Props>();
</script>

<style>
h1 {
  font-size: 24px;
}
</style>
