/**
 * Base.js, included on all pages
 * Blocks some third party scripts and sets all dynamically added scripts to use defer
 */

// Third party injected scripts that are not wanted
const blockedScripts = [
    // /hs-banner.com/ HubSpot cookie banner that's loaded even if not used
]

function needsToBeBlocked(src) {
    return blockedScripts.some((blockedScript) => blockedScript.test(src)) 
}

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

    // Always set the defer flag
    originalSetAttribute('defer', 'defer')

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

function hsFallback (element) {
    if (element && element.parentNode) {
        const errorSection = document.createElement('section');
        errorSection.classList.add('text-center', 'border', 'border-indigo-300', 'rounded-lg', 'bg-white', 'px-4');
        errorSection.innerHTML = `
                <p style="color: #6366f1;"><strong>Hmm… there was supposed to be a form here.</strong></p>
                <p>
                    It might be blocked by your browser or privacy settings. Try
                    <button onclick="if(window.CookieConsent){CookieConsent.showPreferences()}" style="background:none;border:none;color:#6366f1;cursor:pointer;padding:0;font-size:inherit;text-decoration:underline;">updating your cookie preferences</button>,
                    adjusting your privacy settings, or switching browsers to continue.
                </p>
            `;
        element.parentNode.insertBefore(errorSection, element.nextSibling);
    }
}
