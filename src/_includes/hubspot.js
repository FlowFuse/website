// Flag to load HubSpot chat widget when hs-scripts.com is ready.
// Set to true when user interacts with the page (before hs-scripts.com has loaded),
// or set by base.njk for non-privacy-region users who get chat auto-loaded.
window._ffLoadChat = false

// Set HubSpot Chat to wait a bit so it does not block page load if user has never started a conversation
if (
    window.sessionStorage?.getItem("chatInProgress") === null &&
    window.location.hash !== "#hs-chat-open"
) {
    window.hsConversationsSettings = {
        loadImmediately: false,
    }

    window.addEventListener("load", (event) => {
        let loaded = false
        function loadHubSpotChat(event) {
            if (loaded) return
            loaded = true
            // Mark that user has interacted — if hs-scripts.com isn't loaded yet,
            // hsConversationsOnReady will pick this up and load the widget when ready.
            window._ffLoadChat = true
            setTimeout(() => {
                window.HubSpotConversations?.widget?.load()
            }, 1)
        }

        window.addEventListener("mousemove", loadHubSpotChat, { once: true })
        window.addEventListener("scroll", loadHubSpotChat, { once: true })
    })
}

window.hsConversationsOnReady = [
    () => {
        // Load widget if user already interacted before hs-scripts.com finished loading,
        // or if this is a non-privacy-region user with chat set to auto-load.
        if (window._ffLoadChat) {
            window.HubSpotConversations.widget.load()
        }
        window.HubSpotConversations.on("conversationStarted", () => {
            window.sessionStorage?.setItem("chatInProgress", "true")
        })
    },
]
