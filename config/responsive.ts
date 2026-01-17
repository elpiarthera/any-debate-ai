export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export const ORIENTATIONS = ["portrait", "landscape"] as const

export type Breakpoint = keyof typeof BREAKPOINTS
export type Orientation = (typeof ORIENTATIONS)[number]

export const DEVICE_BREAKPOINTS = {
  mobile: { min: 0, max: BREAKPOINTS.md - 1 },
  tablet: { min: BREAKPOINTS.md, max: BREAKPOINTS.lg - 1 },
  desktop: { min: BREAKPOINTS.lg, max: Number.POSITIVE_INFINITY },
} as const

export type DeviceType = keyof typeof DEVICE_BREAKPOINTS
