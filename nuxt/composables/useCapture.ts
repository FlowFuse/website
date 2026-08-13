// Thin wrapper around the global `capture()` injected by the site's analytics
// script (see src/_includes/analytics/body.html), which itself no-ops when
// PostHog isn't loaded (no analytics consent). Guarded here too so components
// can call this during SSR/tests without a `window`.
export function useCapture () {
    return function capture (event: string, props?: Record<string, unknown>) {
        if (typeof window === 'undefined') return
        const win = window as unknown as { capture?: (event: string, props?: Record<string, unknown>) => void }
        if (typeof win.capture === 'function') win.capture(event, props)
    }
}
