// Use-case content names its card icons after the files in
// src/_includes/components/icons/, which the .njk pulled in with an {% include %}.
// Those files are Heroicons outline glyphs, so the port resolves the same name against
// the heroicons set already installed for @nuxt/icon rather than copying SVGs across.
//
// Unmapped names fall back to a neutral dot instead of rendering nothing, so a typo in
// content shows up as a visibly wrong icon rather than a silently empty box.
const USE_CASE_ICONS: Record<string, string> = {
    'arrow-path': 'i-heroicons-arrow-path',
    'bell-alert': 'i-heroicons-bell-alert',
    'chart': 'i-heroicons-chart-bar-square',
    'chat-bubble-left-right-sm': 'i-heroicons-chat-bubble-left-right',
    'clip-list': 'i-heroicons-clipboard-document-list',
    'clock': 'i-heroicons-clock',
    'link-slash': 'i-heroicons-link-slash',
}

export function useCaseIcon(name?: string): string {
    return (name && USE_CASE_ICONS[name]) || 'i-heroicons-exclamation-circle'
}
