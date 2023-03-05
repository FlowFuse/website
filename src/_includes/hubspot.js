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
            console.log(event)
            if (loaded) return
            loaded = true
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
        window.HubSpotConversations.on("conversationStarted", () => {
            window.sessionStorage?.setItem("chatInProgress", "true")
        })
    },
]
