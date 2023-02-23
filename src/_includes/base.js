// Intercept all injected script tags, set them to defer, remove blocked scripts
const observer = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
            if(node.nodeType === 1 && node.tagName === 'SCRIPT' && node.src !== "") {
                node.setAttribute('defer', 'defer');
            }
        })
    })
})

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
})

window.addEventListener('load', (event) => {
    observer.disconnect()
})