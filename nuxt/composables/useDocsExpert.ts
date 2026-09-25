// FlowFuse Expert on the docs pages.
//
// The conversation is src/js/ai-expert-modal.js, shared with the Eleventy site. It binds to
// the modal that DocsExpertHost renders once in the layout, and exposes window.ffExpertOpen
// so any button on the page can open it. The embedded question box (FfExpertAsk) needs no
// call from here: the script listens for its button and prompt pills itself.

const DOMPURIFY = 'https://cdn.jsdelivr.net/npm/dompurify@3.3.0/dist/purify.min.js'
const SCRIPT = '/js/ai-expert-modal.js'

let ready: Promise<void> | null = null

function loadScript (src: string) {
    return new Promise<void>((resolve, reject) => {
        const el = document.createElement('script')
        el.src = src
        el.onload = () => resolve()
        el.onerror = () => reject(new Error(`failed to load ${src}`))
        document.body.appendChild(el)
    })
}

/** Called by DocsExpertHost once its modal is in the DOM. */
export function mountDocsExpert (): Promise<void> {
    ready = (async () => {
        const w = window as any
        // The script sanitises every answer with DOMPurify before rendering it.
        if (!w.DOMPurify) await loadScript(DOMPURIFY)
        // Loading the script runs it. If it is already loaded (the host mounted again after
        // leaving the docs and coming back), ask it to bind to the new modal instead.
        if (w.ffExpertInit) w.ffExpertInit()
        else await loadScript(SCRIPT)
    })()
    return ready
}

/** Open the Expert conversation, optionally starting it with a question. */
export function openDocsExpert (text = '') {
    const open = () => (window as any).ffExpertOpen?.(text)
    if (ready) ready.then(open).catch(() => {})
    else open()
}

/** Whether the embedded question box is on screen, so other entry points can step aside. */
export function useExpertInlineVisible () {
    return useState<boolean>('ff-expert-inline-visible', () => false)
}
