// Third party injected scripts that are not wanted
const blockedScripts = [
    /hs-banner.com/ // HubSpot cookie banner that's loaded even if not used
]

function needsToBeBlocked(src) {
    return blockedScripts.some((blockedScript) => blockedScript.test(src)) 
}

// Intercept all injected script tags, set them to defer, remove blocked scripts
const observer = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
            if(node.nodeType === 1 && node.tagName === 'SCRIPT' && node.src !== "") {
                if (needsToBeBlocked(node.src)) {
                    node.remove() // Doesn't catch dynamically added scripts (handled below)
                } else {
                    node.setAttribute('defer', 'defer');
                }
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

// Patch document.createElement to allow blocking of unwanted scripts injected externally
const createElementBackup = document.createElement
document.createElement = function(...args) {
    // If this is not a script tag, bypass
    if(args[0].toLowerCase() !== 'script') {
        // Binding to document is essential
        return createElementBackup.bind(document)(...args)
    }

    const scriptElt = createElementBackup.bind(document)(...args)

    const originalSetAttribute = scriptElt.setAttribute.bind(scriptElt)

    // Define getters / setters to ensure that the script type is properly set
    Object.defineProperties(scriptElt, {
        'src': {
            get() {
                return scriptElt.getAttribute('src')
            },
            set(value) {
                if(needsToBeBlocked(value, scriptElt.type)) {
                    originalSetAttribute('type', 'javascript/blocked')
                }
                originalSetAttribute('src', value)
                return true
            }
        },
        'type': {
            set(value) {
                const typeValue =
                  needsToBeBlocked(scriptElt.src, scriptElt.type) ?
                      'javascript/blocked' :
                      value
                originalSetAttribute('type', typeValue)
                return true
            }
        }
    })

    // Monkey patch the setAttribute function so that the setter is called instead.
    scriptElt.setAttribute = function(name, value) {
        if(name === 'type' || name === 'src')
            scriptElt[name] = value
        else
            HTMLScriptElement.prototype.setAttribute.call(scriptElt, name, value)
    }

    return scriptElt
}