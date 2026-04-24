/**
 * Material Design window size class breakpoints.
 * @see https://m3.material.io/layout/responsive-layout-page/overview
 */
export const BREAKPOINTS = {
  md: 600,
  ex: 840,
  lg: 1200,
  xl: 1600,
} as const;

export type WindowSizeClass = keyof typeof BREAKPOINTS;
