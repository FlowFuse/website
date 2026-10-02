type PosthogWindow = Window & {
    posthog?: {
        identify: (distinctId: string, properties?: Record<string, unknown>) => void
        get_property: (key: string) => unknown
    }
}

// Skips re-identifying an already-identified session, so a second booking in the same
// browser doesn't silently re-point its whole history at a different identity.
export function useIdentify () {
    return function identify (email: string, properties?: Record<string, unknown>) {
        if (typeof window === 'undefined') return
        const posthog = (window as PosthogWindow).posthog
        if (!posthog || posthog.get_property('$user_state') === 'identified') return

        const normalizedEmail = email.trim().toLowerCase()
        posthog.identify(normalizedEmail, { email: normalizedEmail, ...properties })
    }
}
