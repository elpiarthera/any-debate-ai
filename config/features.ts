export const FEATURES = {
  enableAIChat: true,
  enableLazyLoading: true,
  useNewArchitecture: true, // Enabled new responsive architecture
  enableAdaptiveComponents: true,
  enableDebugLogging: process.env.NODE_ENV === "development",
} as const

export type FeatureFlag = keyof typeof FEATURES
