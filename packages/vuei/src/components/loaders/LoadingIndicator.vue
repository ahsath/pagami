<script lang="ts" setup>
import { ref, watch } from "vue";
import { interpolate, type Shape } from "flubber";
import {
  animate,
  m,
  useMotionValue,
  useTransform,
  LazyMotion,
  domAnimation,
  type MotionValue,
} from "motion-v";

defineProps<{ iconClass?: string }>();

const softBurst =
  "M17.47 2.84a1.82 1.82 0 0 1 3.06 0l1.7 2.68a1.8 1.8 0 0 0 2.2.71l2.97-1.2a1.8 1.8 0 0 1 2.48 1.78l-.23 3.15c-.07.87.51 1.65 1.36 1.86l3.12.75c1.3.32 1.8 1.86.94 2.87L33 17.85a1.76 1.76 0 0 0 0 2.3l2.07 2.4a1.77 1.77 0 0 1-.94 2.88l-3.12.75c-.85.21-1.43 1-1.36 1.86l.23 3.15a1.8 1.8 0 0 1-2.48 1.77l-2.97-1.2a1.8 1.8 0 0 0-2.2.72l-1.7 2.68a1.82 1.82 0 0 1-3.06 0l-1.7-2.68a1.8 1.8 0 0 0-2.2-.71l-2.97 1.2a1.8 1.8 0 0 1-2.48-1.78l.23-3.15A1.8 1.8 0 0 0 7 26.18l-3.12-.75a1.77 1.77 0 0 1-.94-2.87L5 20.15c.56-.67.56-1.63 0-2.3l-2.07-2.4a1.77 1.77 0 0 1 .94-2.88L7 11.82c.85-.21 1.43-1 1.36-1.86l-.23-3.15a1.8 1.8 0 0 1 2.48-1.77l2.97 1.2a1.8 1.8 0 0 0 2.2-.72z";
const sided9Cookie =
  "m15.3 3.6.37-.28a5.5 5.5 0 0 1 6.66 0l.36.28.16.14A5.5 5.5 0 0 0 26.1 4.9h.2l.47.02A5.5 5.5 0 0 1 32 9.86a5.5 5.5 0 0 0 1.73 2.98l.16.14.35.3a5.5 5.5 0 0 1 .83 7.14 5.5 5.5 0 0 0-.57 3.6l.07.45a5.5 5.5 0 0 1-3.33 5.76l-.43.16-.2.08a5.5 5.5 0 0 0-2.64 2.21l-.1.18-.25.4a5.5 5.5 0 0 1-6.26 2.27l-.43-.15-.2-.07a5.5 5.5 0 0 0-3.66.07l-.43.15a5.5 5.5 0 0 1-6.26-2.27l-.24-.4-.11-.18a5.5 5.5 0 0 0-2.65-2.21l-.2-.08-.42-.16a5.5 5.5 0 0 1-3.23-6.42 5.5 5.5 0 0 0-.6-3.4l-.1-.18c-.12-.2-.18-.3-.22-.4a5.5 5.5 0 0 1 1.5-6.85l.16-.14a5.5 5.5 0 0 0 1.77-3.19l.09-.45a5.5 5.5 0 0 1 5.56-4.28h.21a5.5 5.5 0 0 0 3.25-1.18z";
const pentagon =
  "M13.65 4.94c1.66-1.21 2.49-1.82 3.37-2.11a6.2 6.2 0 0 1 3.96 0c.88.3 1.71.9 3.37 2.1l3.63 2.65 3.62 2.48c1.72 1.17 2.58 1.76 3.16 2.5A6 6 0 0 1 36 16.28c-.02.93-.36 1.9-1.05 3.84l-1.42 4.05-1.31 4.14c-.62 1.94-.93 2.91-1.47 3.67a6 6 0 0 1-3.22 2.28c-.9.27-1.94.25-4.01.22L19 34.42l-4.52.06c-2.07.03-3.11.05-4.01-.22a6 6 0 0 1-3.22-2.28c-.54-.76-.85-1.73-1.46-3.67l-1.32-4.14-1.42-4.05c-.69-1.94-1.03-2.9-1.05-3.84a6 6 0 0 1 1.24-3.72c.58-.74 1.44-1.33 3.16-2.5l3.62-2.48z";
const pill =
  "M11.99 7.78A12.9 12.9 0 1 1 30.22 26l-4.2 4.21A12.9 12.9 0 1 1 7.77 12z";
const sunny =
  "M28.19 6.12c1.05.08 1.58.11 2 .3a2.7 2.7 0 0 1 1.4 1.38c.18.43.21.96.29 2.01l.16 2.42c.03.43.04.64.09.84q.1.45.35.84c.1.17.25.34.53.66l1.59 1.82c.7.8 1.05 1.2 1.22 1.63.24.63.24 1.33 0 1.96-.17.43-.52.83-1.22 1.63l-1.59 1.82c-.28.32-.42.49-.53.66q-.25.39-.35.84c-.05.2-.06.41-.09.84l-.16 2.42a6 6 0 0 1-.3 2 2.7 2.7 0 0 1-1.38 1.4c-.43.18-.96.21-2.01.29l-2.42.16c-.43.03-.64.04-.84.09q-.45.1-.84.35c-.17.1-.34.25-.66.53l-1.82 1.59c-.8.7-1.2 1.05-1.63 1.22-.63.24-1.33.24-1.96 0-.43-.17-.83-.52-1.63-1.22l-1.82-1.59a6 6 0 0 0-.66-.53 3 3 0 0 0-.84-.35c-.2-.05-.41-.06-.84-.09l-2.42-.16a6 6 0 0 1-2-.3 2.7 2.7 0 0 1-1.4-1.38 6 6 0 0 1-.29-2.01l-.16-2.42a6 6 0 0 0-.09-.84q-.1-.45-.35-.84a6 6 0 0 0-.53-.66L3.4 21.61c-.7-.8-1.05-1.2-1.22-1.63a2.7 2.7 0 0 1 0-1.96c.17-.43.52-.83 1.22-1.63l1.59-1.82c.28-.32.42-.49.53-.66q.25-.39.35-.84c.05-.2.06-.41.09-.84l.16-2.42c.08-1.05.11-1.58.3-2a2.7 2.7 0 0 1 1.38-1.4c.43-.18.96-.21 2.01-.29l2.42-.16c.43-.03.64-.04.84-.09q.45-.1.84-.35c.17-.1.34-.25.66-.53l1.82-1.59c.8-.7 1.2-1.05 1.63-1.22a2.7 2.7 0 0 1 1.96 0c.43.17.83.52 1.63 1.22l1.82 1.59c.32.28.49.42.66.53q.39.25.84.35c.2.05.41.06.84.09z";
const sided4Cookie =
  "M22.87 5.62a7.23 7.23 0 0 1 9.5 9.5l-.42 1a7.2 7.2 0 0 0 0 5.76l.43 1a7.23 7.23 0 0 1-9.5 9.5l-1-.43a7.2 7.2 0 0 0-5.76 0l-1 .43a7.23 7.23 0 0 1-9.5-9.5l.43-1c.8-1.84.8-3.92 0-5.76l-.43-1a7.23 7.23 0 0 1 9.5-9.5l1 .43c1.84.8 3.92.8 5.76 0z";
const oval =
  "M27.13 27.13C20.17 34.1 10.9 36.1 6.4 31.6s-2.5-13.77 4.47-20.73S27.1 1.9 31.6 6.4s2.5 13.77-4.47 20.73";

const paths = [
  softBurst,
  sided9Cookie,
  pentagon,
  pill,
  sunny,
  sided4Cookie,
  oval,
  softBurst,
];

function useFlubber(progress: MotionValue<number>, paths: Shape[]) {
  return useTransform(
    progress,
    paths.map((_, i) => i),
    paths,
    {
      mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 }),
    },
  );
}

const pathIndex = ref(1);
const progress = useMotionValue(0);
const rotate = useMotionValue(0);
const scale = useMotionValue(1);
const path = useFlubber(progress, paths);

watch(
  pathIndex,
  (newIndex, _, onCleanup) => {
    const duration = 0.4;
    const delay = 0.2;
    const totalDuration = duration + delay;

    const morphAnimation = animate(progress, newIndex, {
      duration,
      delay,
      ease: "easeInOut",
      onComplete: () => {
        if (newIndex === paths.length - 1) {
          progress.set(0);
          pathIndex.value = 1;
        } else {
          pathIndex.value += 1;
        }
      },
    });

    const rotateAnimation = animate(
      rotate,
      [rotate.get(), rotate.get() + 10, rotate.get() + 130],
      {
        duration: totalDuration,
        times: [0, delay / totalDuration, 1],
        ease: ["linear", "easeInOut"],
      },
    );

    const scaleAnimation = animate(scale, [1, 1.1, 1], {
      duration: duration,
      delay: delay,
      ease: ["easeIn", "backOut"],
    });

    onCleanup(() => {
      morphAnimation.stop();
      rotateAnimation.stop();
      scaleAnimation.stop();
    });
  },
  { immediate: true },
);
</script>

<template>
  <span class="loading-indicator" role="progressbar">
    <LazyMotion :features="domAnimation">
      <svg
        viewBox="0 0 38 38"
        width="38"
        height="38"
        aria-hidden="true"
        fill="currentColor"
        :class="iconClass"
      >
        <m.path :d="path" :style="{ rotate, scale }" />
      </svg>
    </LazyMotion>
  </span>
</template>
