// Pure state machine for one HubSpotMeetings embed's lifecycle - no DOM/window access, so
// it's testable without a browser. HubSpotMeetings.vue wires DOM/postMessage events to
// these methods and only calls capture() when a method returns true.

export function createMeetingTracker () {
    let booked = false
    let reported = false
    let stepCount = 0
    let lastHeight = null

    return {
        /** A resize message's height. Returns true for a new value, false for a repeat. */
        recordResize (height) {
            if (height === lastHeight) return false
            lastHeight = height
            stepCount += 1
            return true
        },
        /** Returns true the first time a booking succeeds, false for a resent message. */
        recordBooked () {
            if (booked) return false
            booked = true
            return true
        },
        /**
         * Returns true if an abandonment should be reported: not already reported, not
         * booked, and past the embed's own first render (step 1 is automatic on load, not
         * something the visitor did).
         */
        recordAbandonment () {
            if (reported || booked || stepCount <= 1) return false
            reported = true
            return true
        },
        /**
         * A bfcache restore resumes this exact state rather than remounting, so a
         * departure that already reported stays reportable if the visitor leaves again
         * without booking. This does not un-send the first abandoned event - a session can
         * still end up with both abandoned and booked; treat that as "abandoned without a
         * later booked", not as a bug to suppress here.
         */
        resumeFromBfcache () {
            reported = false
        },
        get stepCount () { return stepCount },
    }
}
