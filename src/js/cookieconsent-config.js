// Detects if we're on any Node-RED Con 2025 landing
const isNodeRedLanding = window.location.pathname.includes('landing/node-red-con-2025');

if (isNodeRedLanding) {
    // Activates dark mode
    document.documentElement.classList.add('cc--darkmode');
}

function clearHubSpotCookiesFallback () {
    var hubspotCookiePattern = /^(__hstc|hubspotutk|__hssrc|__hssc|__hs_do_not_track|__hs_cookie_cat_pref)$/;
    var cookieNames = document.cookie.split(';').map(function (part) {
        return part.split('=')[0].trim();
    }).filter(function (name) {
        return hubspotCookiePattern.test(name);
    });

    var host = window.location.hostname;
    var hostParts = host.split('.');
    var rootDomain = hostParts.length > 2 ? hostParts.slice(1).join('.') : host;
    var domains = ['', host, '.' + host, rootDomain, '.' + rootDomain];

    cookieNames.forEach(function (name) {
        domains.forEach(function (domain) {
            var domainPart = domain ? '; domain=' + domain : '';
            document.cookie = name + '=; Max-Age=0; path=/' + domainPart + '; SameSite=Lax';
        });
    });
}

function syncHubSpotConsent (allowTracking) {
    window._hsq = window._hsq || [];
    window._hsp = window._hsp || [];

    if (allowTracking) {
        window._hsq.push(['doNotTrack', {track: true}]);
        return;
    }

    // Stop new tracking and revoke/remove HubSpot cookies already created.
    window._hsq.push(['doNotTrack']);
    window._hsp.push(['revokeCookieConsent']);
    clearHubSpotCookiesFallback();
}

function pushGtmJsEvent () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'gtm.js' });
}

function applyAnalyticsConsent (options) {
    var accepted = options.accepted;
    var shouldRepush = !!options.shouldRepush;
    var emitEvent = !!options.emitEvent;

    gtag('consent', 'update', {
        'analytics_storage': accepted ? 'granted' : 'denied'
    });

    if (accepted && shouldRepush) {
        pushGtmJsEvent();
    }

    if (emitEvent) {
        gtag('event', 'cookie_consent', {
            'event_category': 'analytics',
            'event_label': accepted ? 'accepted' : 'denied'
        });
    }

    syncHubSpotConsent(accepted);

    if (accepted) {
        if (typeof window._ffLoadMeetings === 'function') {
            window._ffLoadMeetings();
        }
        window._ffLoadChat = true;
        if (window.HubSpotConversations) {
            window.HubSpotConversations.widget.load();
        }
    } else {
        window._ffLoadChat = false;
    }
}

function applyAdsConsent (options) {
    var accepted = options.accepted;
    var shouldRepush = !!options.shouldRepush;
    var emitEvent = !!options.emitEvent;

    gtag('consent', 'update', {
        'ad_storage': accepted ? 'granted' : 'denied',
        'ad_user_data': accepted ? 'granted' : 'denied',
        'ad_personalization': accepted ? 'granted' : 'denied',
        'personalization_storage': accepted ? 'granted' : 'denied'
    });

    if (accepted && shouldRepush) {
        pushGtmJsEvent();
    }

    if (emitEvent) {
        gtag('event', 'cookie_consent', {
            'event_category': 'ads',
            'event_label': accepted ? 'accepted' : 'denied'
        });
    }
}

function applyFunctionalConsent (accepted) {
    gtag('consent', 'update', {
        'functionality_storage': accepted ? 'granted' : 'denied'
    });
}

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "box",
            position: "bottom left",
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },

    // Runs on each page load after consent exists; keep this idempotent.
    onConsent: function(){
        applyAnalyticsConsent({
            accepted: CookieConsent.acceptedCategory('analytics'),
            shouldRepush: false,
            emitEvent: false
        });
        applyAdsConsent({
            accepted: CookieConsent.acceptedCategory('ads'),
            shouldRepush: false,
            emitEvent: false
        });
        applyFunctionalConsent(CookieConsent.acceptedCategory('functional'));
    },

    // Runs once when the user makes the first consent decision.
    onFirstConsent: function () {
        var analyticsAccepted = CookieConsent.acceptedCategory('analytics');
        var adsAccepted = CookieConsent.acceptedCategory('ads');

        applyAnalyticsConsent({
            accepted: analyticsAccepted,
            shouldRepush: analyticsAccepted && !window._ffHadStoredAnalyticsConsent,
            emitEvent: true
        });
        applyAdsConsent({
            accepted: adsAccepted,
            shouldRepush: adsAccepted && !window._ffHadStoredAdsConsent && !analyticsAccepted,
            emitEvent: true
        });
        applyFunctionalConsent(CookieConsent.acceptedCategory('functional'));
    },

    onChange: function({changedCategories}){
        if(changedCategories.includes('analytics')){
            applyAnalyticsConsent({
                accepted: CookieConsent.acceptedCategory('analytics'),
                shouldRepush: CookieConsent.acceptedCategory('analytics'),
                emitEvent: true
            });
        }

        if(changedCategories.includes('ads')){
            applyAdsConsent({
                accepted: CookieConsent.acceptedCategory('ads'),
                shouldRepush: CookieConsent.acceptedCategory('ads') && !changedCategories.includes('analytics'),
                emitEvent: true
            });
        }

        if(changedCategories.includes('functional')){
            applyFunctionalConsent(CookieConsent.acceptedCategory('functional'));
        }
    },

    categories: {
        necessary: {
            readOnly: true
        },
        functional: {},
        analytics: {
            autoClear: {
                cookies: [
                    {
                        name: /^(_ga|_gid|_gat|_gcl)/
                    },
                    {
                        name: /^(__hstc|hubspotutk|__hssrc|__hssc|__hs_do_not_track|__hs_cookie_cat_pref)$/
                    },
                    {
                        name: /^(ph_[^=\s]+_posthog|ph_phc_[^=\s]+_posthog|__ph_opt_in_out_[^=\s]+)$/
                    },
                    {
                        name: /^warmly_/
                    }
                ],
                reloadPage: false
            }
        },
        ads: {}
    },
    
    language: {
        default: "en",
        autoDetect: "browser",
        translations: {
            en: {
                consentModal: {
                    title: "This site uses cookies",
                    description: "We use cookies to ensure this site works properly and, with your permission, to improve your experience and enable features like analytics and live chat support.",
                    acceptAllBtn: "Accept all",
                    showPreferencesBtn: "Settings",
                    footer: "<a href=\"/privacy-policy/\">Privacy Policy</a>\n"
                },
                preferencesModal: {
                    title: "Cookie Options",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    savePreferencesBtn: "Save preferences",
                    closeIconLabel: "Close modal",
                    serviceCounterLabel: "Service|Services",
                    sections: [
                        {
                            title: "Cookie Usage",
                            description: "We use cookies to ensure the basic functionality of the website and to enhance your online experience. You can opt-in/out of receiving non-essential cookies."
                        },
                        {
                            title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                            description: "Essential cookies are crucial for the basic functionality of our website. Without these cookies, our website could not function properly.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Functional Cookies",
                            description: "These cookies support optional site functionality that is not strictly necessary to run the website.",
                            linkedCategory: "functional"
                        },
                        {
                            title: "Analytics Cookies",
                            description: "We use tools including Google Analytics, HubSpot, PostHog, and warmly.ai to understand how visitors interact with our website. This category also enables HubSpot meeting embeds and the chat widget.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "Advertisement Cookies",
                            description: "We use advertising cookies from Google, Meta, and LinkedIn to measure the effectiveness of our campaigns, show relevant ads, and limit how often you see the same ad.",
                            linkedCategory: "ads"
                        }
                    ]
                }
            }
        }
    }
});
