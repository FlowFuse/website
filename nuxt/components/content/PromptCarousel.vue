<script setup lang="ts">
// The starter prompts: one card per prompt, stepped through sideways. Lives in
// components/content/ so markdown can use it as ::prompt-carousel as well as pages
// using it directly, for the same reason AgentSetupTabs does: the blog post, /ai and
// the third-party-agents docs page all want to hand a reader the same nine openers,
// and hand-copying nine paragraphs into three surfaces is how they drift apart.
//
// A carousel rather than a list because these are long. Nine of them stacked is a
// wall of near-identical paragraphs that a reader scrolls past; one at a time, with
// the next one's edge visible, is something they read and copy.
//
// Styling comes from the .ff-prompts-* rules in src/css/style.css, not from utility
// classes on the elements. That is forced, same as AgentSetupTabs: this renders
// inside .prose on the blog post, and the site's prose rules are unlayered, which
// outranks Tailwind's @layer utilities whatever the specificity. As utilities,
// .prose p would have set the card body to 12px.
const props = withDefaults(defineProps<{
    // Distinguishes this instance in PostHog, so the blog post's copies stay
    // separable from /ai's once the same component is on both.
    surface?: string
}>(), { surface: 'blog' })

const capture = useCapture()

// Each prompt carries a short label so the carousel is scannable at a glance and the
// dots have something to announce. Every one ends by asking the agent to simulate its
// own inputs, which is the point: a reader can run these on a fresh trial team with
// nothing connected to the platform yet and still watch a flow get built.
const PROMPTS = [
    {
        id: 'oee',
        label: 'Live OEE for one line',
        text: 'I run one line and I want live availability, performance and quality for it, with every stop carrying a reason. Simulate the machine signals so it runs before I connect anything.',
    },
    {
        id: 'andon',
        label: 'Andon calls with the evidence attached',
        text: 'When an operator raises a problem on the line I want the machine and its recent signals captured with it, an owner and a state on the record, and the same signals compared again after the fix. Simulate the line and a handful of open actions.',
    },
    {
        id: 'shift-board',
        label: 'A shift board with skills and cover',
        text: 'I want a board my supervisors can use mid-shift: what has to run, who is qualified to run it, and where a station is about to be left uncovered, with every reassignment recorded. Simulate the orders, the roster and the skills.',
    },
    {
        id: 'escalation',
        label: 'Call for help, routed and escalated',
        text: 'When a machine calls for help I want it routed to the person who can fix it, escalated if nobody acknowledges it, and the time from call to acknowledgement recorded. Simulate the line events.',
    },
    {
        id: 'quality-check',
        label: 'A quality check at the machine',
        text: 'I want a check at the machine that measures each part against the tolerance for whatever is running, tells the operator the moment one fails, and records every result rather than only the failures. Simulate the measurements.',
    },
    {
        id: 'traceability',
        label: 'One record per unit, both directions',
        text: 'I want one record per unit that follows it through every step with the conditions it was produced under, so a recall question can be answered in both directions. Simulate the production steps.',
    },
    {
        id: 'machine-health',
        label: 'Early warning on machine health',
        text: 'I want the few signals that tell me a machine is going bad, cycle time drift, current, temperature and fault counts, judged against what is normal for that machine, and maintenance told before it stops. Simulate the machine signals.',
    },
    {
        id: 'namespace',
        label: 'Every protocol, one topic structure',
        text: 'I want every machine, whatever protocol it speaks, to arrive in the same shape on a topic structure of site, area, line and asset, so my historian and my MES can each take what they need. Simulate a few machines on different protocols.',
    },
    {
        id: 'error-reporting',
        label: 'One view of what is broken, fleet-wide',
        text: 'I want every application I have deployed to report its errors the same way, grouped so one fault across nine sites is one problem, with a single view of what is broken and since when. Simulate failures from a few instances.',
    },
]

const track = ref<HTMLElement | null>(null)
// Which cards are currently showing, not a single "active" index. The track is two
// cards wide in a desktop prose column and one on a phone, and nine cards do not
// divide by two: at the far end the track shows cards 8 and 9 together and can scroll
// no further, so card 9's own snap position is never reached. Tracked as a single
// index, the last dot could never light and the next arrow could never disable, which
// is what the first Playwright pass on this component caught.
const inView = ref<number[]>([0])
// From the scroll extent rather than from the index, for the same reason: "there is
// nowhere left to go" is a fact about the scroll position, not about which card is
// leftmost.
const atStart = ref(true)
const atEnd = ref(false)
const copiedId = ref<string | null>(null)
let resetTimer: ReturnType<typeof setTimeout> | undefined

// Read back from the scroll position rather than held as the source of truth, so a
// swipe, a trackpad flick and the arrow buttons all agree on where we are.
function syncActive () {
    const el = track.value
    if (!el) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.ff-prompts__card'))
    if (!cards.length) return
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0
    const trackRect = el.getBoundingClientRect()
    const from = trackRect.left + pad
    const to = trackRect.right - pad
    // Showing means more than half the card is inside the padding box. Any overlap at
    // all would count the sliver of the next card that the layout deliberately leaves
    // visible, so every view would report one card too many.
    const showing = cards
        .map((card, index) => ({ index, rect: card.getBoundingClientRect() }))
        .filter(({ rect }) => Math.min(rect.right, to) - Math.max(rect.left, from) > rect.width / 2)
        .map(({ index }) => index)
    inView.value = showing.length ? showing : [0]
    const maxScroll = el.scrollWidth - el.clientWidth
    // A pixel of slack: scrollLeft is fractional on a zoomed or scaled display, so an
    // exact comparison leaves the arrow enabled with nowhere to scroll.
    atStart.value = el.scrollLeft <= 1
    atEnd.value = el.scrollLeft >= maxScroll - 1
}

// One card-and-gap per press, letting scroll-snap settle the landing, rather than
// scrolling to a computed index. At the far end an index-based step asks for a
// position the track cannot reach, so the press does nothing.
function stride (el: HTMLElement) {
    const card = el.querySelector<HTMLElement>('.ff-prompts__card')
    if (!card) return 0
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    return card.getBoundingClientRect().width + gap
}

// behavior is read here, not left to CSS scroll-behavior, because an explicit
// 'smooth' in the options object wins over the stylesheet.
function behavior () {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' as const : 'smooth' as const
}

function step (delta: number) {
    const el = track.value
    if (!el) return
    el.scrollBy({ left: delta * stride(el), behavior: behavior() })
    capture('cta-prompt-carousel-step', { position: `${props.surface}-${delta > 0 ? 'next' : 'prev'}` })
}

function goTo (index: number) {
    const el = track.value
    if (!el) return
    const card = el.querySelectorAll<HTMLElement>('.ff-prompts__card')[index]
    if (!card) return
    // Measured off the live rects and the track's own padding rather than offsetLeft:
    // offsetLeft is relative to whichever ancestor happens to be positioned, which is
    // not the track, and it would drop the track's 1rem left padding so every card
    // landed flush against the border instead of on its snap point. Asking for a
    // position past the end is clamped by the browser, which is what should happen:
    // the last dot scrolls as far as it goes and its card comes into view.
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0
    const delta = card.getBoundingClientRect().left - el.getBoundingClientRect().left - pad
    // scrollTo on the track rather than card.scrollIntoView: the latter scrolls the
    // page as well, so stepping through the carousel would drag the article past it.
    el.scrollTo({ left: el.scrollLeft + delta, behavior: behavior() })
    capture('cta-prompt-carousel-step', { position: `${props.surface}-dot`, prompt: PROMPTS[index].id })
}

async function copy (prompt: typeof PROMPTS[number]) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(prompt.text)
        } else {
            // Fallback for a non-secure context, where navigator.clipboard is
            // undefined. Same approach as FfCommand.
            const field = document.createElement('textarea')
            field.value = prompt.text
            field.setAttribute('readonly', '')
            field.style.position = 'absolute'
            field.style.left = '-9999px'
            document.body.appendChild(field)
            field.select()
            document.execCommand('copy')
            document.body.removeChild(field)
        }
    } catch {
        return
    }
    capture('cta-copy-prompt', { position: props.surface, prompt: prompt.id })
    copiedId.value = prompt.id
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => { copiedId.value = null }, 2000)
}

// How many cards fit changes with the column, so the readout has to be recomputed on
// resize and not only on scroll. A ResizeObserver on the track rather than a window
// listener: the prose column changes width when the sidebar appears, at a viewport
// width that never fires a resize of its own.
let observer: ResizeObserver | undefined
onMounted(() => {
    syncActive()
    if (track.value && typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(syncActive)
        observer.observe(track.value)
    }
})
onUnmounted(() => {
    clearTimeout(resetTimer)
    observer?.disconnect()
})
</script>

<template>
  <div
    class="ff-prompts"
    role="group"
    aria-roledescription="carousel"
    aria-label="Starter prompts"
  >
    <div class="ff-prompts__head">
      <p class="ff-prompts__kicker">Starter prompts</p>
      <div class="ff-prompts__nav">
        <button
          type="button"
          class="ff-prompts__arrow"
          :disabled="atStart"
          aria-label="Previous prompt"
          @click="step(-1)"
        >
          <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="ff-prompts__arrow"
          :disabled="atEnd"
          aria-label="Next prompt"
          @click="step(1)"
        >
          <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- tabindex so the track itself takes focus and the arrow keys scroll it, which
         is the keyboard path a scroll-snap carousel gets for free. -->
    <div
      ref="track"
      class="ff-prompts__track"
      tabindex="0"
      @scroll.passive="syncActive"
    >
      <article
        v-for="(prompt, index) in PROMPTS"
        :key="prompt.id"
        class="ff-prompts__card"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${index + 1} of ${PROMPTS.length}: ${prompt.label}`"
      >
        <p class="ff-prompts__num">{{ String(index + 1).padStart(2, '0') }}</p>
        <p class="ff-prompts__label">{{ prompt.label }}</p>
        <p class="ff-prompts__text">{{ prompt.text }}</p>
        <div class="ff-prompts__cta">
          <button
            type="button"
            class="ff-btn ff-btn--primary-outlined flex w-full uppercase"
            @click="copy(prompt)"
          >{{ copiedId === prompt.id ? 'Copied' : 'Copy prompt' }}</button>
        </div>
      </article>
    </div>

    <!-- One dot per prompt rather than per view: nine is few enough to show them all,
         and a dot can carry the prompt's own name for a screen reader in a way a
         "3 of 5" counter cannot. Every showing card lights its dot, so on a desktop
         column two are lit at once, which is what is on screen. -->
    <div class="ff-prompts__dots">
      <button
        v-for="(prompt, index) in PROMPTS"
        :key="`dot-${prompt.id}`"
        type="button"
        class="ff-prompts__dot"
        :class="{ 'ff-prompts__dot--active': inView.includes(index) }"
        :aria-label="`Go to prompt ${index + 1} of ${PROMPTS.length}: ${prompt.label}`"
        :aria-current="inView[0] === index ? 'true' : undefined"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>
