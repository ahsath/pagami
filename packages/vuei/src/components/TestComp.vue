<template>
  <h1 class="text-red-400">TestComp: {{ msg }}</h1>
</template>

<script setup lang="ts">
interface Props {
  msg: string;
  test?: boolean;
}
defineProps<Props>();
</script>
