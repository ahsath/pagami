<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useSheet, Sheet } from "@pagami/vuei";
import CloseRounded from "~icons/material-symbols/close-rounded?width=24&height=24";

defineOptions({ inheritAttrs: false });

const toc = useSheet("toc");
const open = ref(true);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.getAttribute("id");
        if (!id) continue;

        const tocLink = document.querySelector(
          `[data-astro-toc] a[href="#${id}"]`,
        );

        if (entry.isIntersecting) {
          document
            .querySelectorAll("[data-astro-toc] a.active")
            .forEach((a) => {
              a.classList.remove("active");
            });

          if (tocLink) {
            tocLink.classList.add("active");
          }
        }
      }
    },
    { rootMargin: "-100px 0% -66% 0%" },
  );

  document
    .querySelectorAll(
      "#main-content h2[id], #main-content h3[id], #main-content h4[id], #main-content h5[id], #main-content h6[id]",
    )
    .forEach((heading) => observer!.observe(heading));
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <Sheet is="aside" id="toc" v-model:open="open" side="right" inset>
    <nav class="sheet__container" aria-labelledby="toc-heading">
      <div class="sheet__header">
        <div id="toc-heading" class="text-title-large">En esta página</div>
        <button
          class="button icon-button ex:hidden"
          type="button"
          aria-label="Cerrar menu"
          @click="toc?.toggle"
        >
          <CloseRounded aria-hidden="true" />
        </button>
      </div>
      <div class="sheet__content">
        <slot />
      </div>
    </nav>
  </Sheet>
</template>
