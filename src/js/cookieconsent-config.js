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

    onConsent: function(){
        if(CookieConsent.acceptedCategory('analytics')){
            // Enable Google Analytics
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
            // GTM's consent-queue mechanism doesn't reliably re-fire blocked tags
            // when consent is updated mid-session. Re-pushing 'gtm.js' re-triggers
            // the "All Pages" page-view trigger, so any tag using that trigger with
            // analytics_storage required will fire without a custom trigger per tag.
            // Tags using click or other interaction triggers don't need this — they
            // fire naturally when the interaction happens, after consent is already set.
            // Guard prevents a duplicate page_view:
            //   _ffHadStoredAnalyticsConsent → consent was granted in <head>, GTM already fired on load
            if (!window._ffHadStoredAnalyticsConsent) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'gtm.js' });
            }
            // Send event to Google Analytics
            gtag('event', 'cookie_consent', {
                'event_category': 'analytics',
                'event_label': 'accepted'
            });
            // Enable HubSpot tracking
            syncHubSpotConsent(true);
            // Load HubSpot meetings embed if present on this page
            if (typeof window._ffLoadMeetings === 'function') {
                window._ffLoadMeetings();
            }
            // Enable HubSpot chat widget
            window._ffLoadChat = true;
            if (window.HubSpotConversations) {
                window.HubSpotConversations.widget.load();
            }
        }else{
            // Disable Google Analytics
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
            // Send event to Google Analytics
            gtag('event', 'cookie_consent', {
                'event_category': 'analytics',
                'event_label': 'denied'
            });
            // Keep HubSpot tracking blocked
            syncHubSpotConsent(false);
            window._ffLoadChat = false;
        }

        if(CookieConsent.acceptedCategory('ads')){
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'personalization_storage': 'granted'
            });
            // Re-trigger the "All Pages" trigger so ads tags held on page load can fire now.
            // Guard prevents duplicates:
            //   _ffHadStoredAdsConsent → ad_storage was granted in <head> and tags already fired
            if (!window._ffHadStoredAdsConsent) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'gtm.js' });
            }
            // Send event to Google Analytics
            gtag('event', 'cookie_consent', {
                'event_category': 'ads',
                'event_label': 'accepted'
            });
        }else{
            gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'personalization_storage': 'denied'
            });
            // Send event to Google Analytics
            gtag('event', 'cookie_consent', {
                'event_category': 'ads',
                'event_label': 'denied'
            });
        }

        if(CookieConsent.acceptedCategory('functional')){
            gtag('consent', 'update', {
                'functionality_storage': 'granted'
            });
        }else{
            gtag('consent', 'update', {
                'functionality_storage': 'denied'
            });
        }
    },

    onChange: function({changedCategories}){
        if(changedCategories.includes('analytics')){
            if(CookieConsent.acceptedCategory('analytics')){
                // Enable Google Analytics
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
                // The "All Pages" trigger already fired for this page load — re-push
                // 'gtm.js' to re-trigger it now that consent has changed. Tags using
                // click or interaction triggers will fire naturally when they occur.
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'gtm.js' });
                // Send event to Google Analytics
                gtag('event', 'cookie_consent', {
                    'event_category': 'analytics',
                    'event_label': 'accepted'
                });
                // Enable HubSpot tracking
                syncHubSpotConsent(true);
                // Load HubSpot meetings embed if present on this page
                if (typeof window._ffLoadMeetings === 'function') {
                    window._ffLoadMeetings();
                }
                // Enable HubSpot chat widget
                window._ffLoadChat = true;
                if (window.HubSpotConversations) {
                    window.HubSpotConversations.widget.load();
                }
            }else{
                // Disable Google Analytics
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
                // Send event to Google Analytics
                gtag('event', 'cookie_consent', {
                    'event_category': 'analytics',
                    'event_label': 'denied'
                });
                // Block HubSpot tracking
                syncHubSpotConsent(false);
                window._ffLoadChat = false;
            }
        }

        if(changedCategories.includes('ads')){
            if(CookieConsent.acceptedCategory('ads')){
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'personalization_storage': 'granted'
                });
                // Re-trigger the "All Pages" trigger so ads tags held on page load can fire now.
                // Guard: if analytics also just changed, that block already pushed gtm.js
                // and all held tags (including ads) will re-fire from that single push.
                if (!changedCategories.includes('analytics')) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({ event: 'gtm.js' });
                }
                // Send event to Google Analytics
                gtag('event', 'cookie_consent', {
                    'event_category': 'ads',
                    'event_label': 'accepted'
                });
            }else{
                gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'personalization_storage': 'denied'
                });
                // Send event to Google Analytics
                gtag('event', 'cookie_consent', {
                    'event_category': 'ads',
                    'event_label': 'denied'
                });
            }
        }

        if(changedCategories.includes('functional')){
            if(CookieConsent.acceptedCategory('functional')){
                gtag('consent', 'update', {
                    'functionality_storage': 'granted'
                });
            }else{
                gtag('consent', 'update', {
                    'functionality_storage': 'denied'
                });
            }
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
