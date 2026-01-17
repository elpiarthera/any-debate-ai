export function debugResponsive(hook: string, message: string) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[v0] Responsive: ${hook} - ${message}`)
  }
}

export function debugDevice(context: string, data: any) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[v0] Device: ${context}`, data)
  }
}
