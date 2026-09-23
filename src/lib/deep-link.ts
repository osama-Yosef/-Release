/**
 * Deep linking is not implemented yet: the app repo has no custom URL
 * scheme and no Android App Links / iOS Universal Links configured (default
 * MAIN/LAUNCHER intent-filter only — see the app's AndroidManifest.xml).
 * Wiring a scheme like `mokoji://product/{id}` here without the app side
 * would silently fail for every visitor, so every "order" CTA falls back to
 * the download page until that's added. Once the app declares a scheme or
 * an autoVerify App Links host, point `productDeepLink` at it here — no
 * other file needs to change.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for the future real implementation's signature
export function productDeepLink(productId: string): string | null {
  return null;
}
