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
        const existingFallback = element.parentNode.querySelector('.ff-hubspot-consent-fallback')
        if (existingFallback) {
            existingFallback.classList.remove('hidden')
            return
        }

        const errorSection = document.createElement('section');
        errorSection.classList.add('ff-hubspot-consent-fallback');
        errorSection.innerHTML = `
                <p><strong>Unable to load HubSpot content.</strong></p>
            `;
        element.parentNode.insertBefore(errorSection, element.nextSibling);
    }
}

function loadHubSpotFormsScript () {
    if (window.hbspt?.forms?.create) {
        return Promise.resolve(window.hbspt)
    }

    if (window._ffHubSpotFormsPromise) {
        return window._ffHubSpotFormsPromise
    }

    window._ffHubSpotFormsPromise = new Promise((resolve, reject) => {
        const existing = document.getElementById('ff-hs-forms-script')

        if (existing) {
            existing.addEventListener('load', () => resolve(window.hbspt), { once: true })
            existing.addEventListener('error', () => reject(new Error('HubSpot forms script failed to load')), { once: true })
            return
        }

        const script = document.createElement('script')
        script.id = 'ff-hs-forms-script'
        script.async = true
        script.charset = 'utf-8'
        script.src = 'https://js-eu1.hsforms.net/forms/embed/v2.js'
        script.onload = () => resolve(window.hbspt)
        script.onerror = () => reject(new Error('HubSpot forms script failed to load'))
        document.head.appendChild(script)
    }).catch((err) => {
        window._ffHubSpotFormsPromise = null
        throw err
    })

    return window._ffHubSpotFormsPromise
}

function ffCreateHubSpotForm (config) {
    if (!config || !config.formId) {
        return
    }

    const targetElement = config.target ? document.querySelector(config.target) : null
    const fallbackElement = config.fallbackSelector ? document.querySelector(config.fallbackSelector) : null
    if (config.target && !targetElement) {
        return
    }

    if (targetElement?.dataset.ffHsFormLoaded === 'true') {
        return
    }

    if (targetElement && targetElement.querySelector('iframe, form, .hbspt-form')) {
        targetElement.dataset.ffHsFormLoaded = 'true'
        return
    }

    loadHubSpotFormsScript().then(() => {
        if (!window.hbspt?.forms?.create) {
            if (fallbackElement) {
                fallbackElement.classList.remove('hidden')
            } else if (targetElement) {
                hsFallback(targetElement)
            }
            return
        }
        // Keep local helper-only keys out of HubSpot's context object.
        const { fallbackSelector, ...hubspotConfig } = config
        window.hbspt.forms.create(hubspotConfig)
        if (targetElement) {
            targetElement.dataset.ffHsFormLoaded = 'true'
        }
        if (fallbackElement) {
            fallbackElement.classList.add('hidden')
        }
    }).catch(() => {
        if (fallbackElement) {
            fallbackElement.classList.remove('hidden')
        } else if (targetElement) {
            hsFallback(targetElement)
        }
    })
}

window.ffCreateHubSpotForm = ffCreateHubSpotForm
