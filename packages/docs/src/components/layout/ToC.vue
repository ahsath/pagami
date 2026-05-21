<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useSheet, Sheet } from "@pagami/vuei";
import CloseRounded from "~icons/material-symbols/close-rounded?width=24&height=24";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  label?: string;
  closeLabel?: string;
}>();

const toc = useSheet("toc");
const open = ref(true);

let observer: IntersectionObserver | null = null;
let tocLinks: HTMLAnchorElement[] = [];

function setActiveLink(link: HTMLAnchorElement | null) {
  document.querySelectorAll("[data-astro-toc] a.active").forEach((a) => {
    a.classList.remove("active");
  });

  if (link) link.classList.add("active");
}

function onTocLinkClick(this: HTMLAnchorElement, e: Event) {
  setActiveLink(this);
}

function onHashChange() {
  const hash = location.hash;
  if (!hash) return;
  const tocLink = document.querySelector(
    `[data-astro-toc] a[href="${hash}"]`,
  ) as HTMLAnchorElement | null;
  setActiveLink(tocLink);
}

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
      "#main h2[id], #main h3[id], #main h4[id], #main h5[id], #main h6[id]",
    )
    .forEach((heading) => observer!.observe(heading));

  tocLinks = Array.from(
    document.querySelectorAll("[data-astro-toc] a"),
  ) as HTMLAnchorElement[];
  tocLinks.forEach((a) => a.addEventListener("click", onTocLinkClick));

  window.addEventListener("hashchange", onHashChange);
  onHashChange();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
  tocLinks.forEach((a) => a.removeEventListener("click", onTocLinkClick));
  window.removeEventListener("hashchange", onHashChange);
});
</script>

<template>
  <Sheet is="aside" id="toc" v-model:open="open" side="right" inset>
    <nav class="sheet__container" aria-labelledby="toc-heading">
      <div class="sheet__header">
        <div id="toc-heading" class="text-title-large">{{ label }}</div>
        <button
          class="button icon-button ex:hidden"
          type="button"
          :aria-label="closeLabel"
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
