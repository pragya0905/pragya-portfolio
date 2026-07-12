// Thin wrapper around gtag so call sites don't need to guard against it
// being missing (ad blockers, gtag.js failing to load, local dev).
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
