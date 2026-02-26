// Detects if we're on any Node-RED Con 2025 landing
const isNodeRedLanding = window.location.pathname.includes('landing/node-red-con-2025');

if (isNodeRedLanding) {
    // Activates dark mode
    document.documentElement.classList.add('cc--darkmode');
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
            // GTM's "All Pages" trigger, firing ALL analytics tags that have
            // "Require additional consent: analytics_storage" — no custom trigger
            // needed per tag, works for any tag added to GTM in the future.
            // Guards prevent duplicate page_views:
            //   _ffNonPrivacyRegion          → GA4 already fired via All Pages (no regional deny)
            //   _ffHadStoredAnalyticsConsent → GA4 already fired via All Pages (consent granted in <head>)
            if (!window._ffNonPrivacyRegion && !window._ffHadStoredAnalyticsConsent) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'gtm.js' });
            }
            // Send event to Google Analytics
            gtag('event', 'cookie_consent', {
                'event_category': 'analytics',
                'event_label': 'accepted'
            });
            // Enable PostHog
            posthog.opt_in_capturing();
            // Enable HubSpot tracking
            window._hsq = window._hsq || [];
            window._hsq.push(['doNotTrack', {track: true}]);
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
            // Disable PostHog
            posthog.opt_out_capturing();
            // Keep HubSpot tracking blocked
            window._hsq = window._hsq || [];
            window._hsq.push(['doNotTrack']);
        }

        if(CookieConsent.acceptedCategory('ads')){
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
            // Send event to Google Analytics
            gtag('event', 'cookie_consent', {
                'event_category': 'ads',
                'event_label': 'accepted'
            });
        }else{
            gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
            // Send event to Google Analytics
            gtag('event', 'cookie_consent', {
                'event_category': 'ads',
                'event_label': 'denied'
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
                // The All Pages trigger already fired for this page load — re-push
                // 'gtm.js' to re-trigger it now that consent has changed. This fires
                // all analytics tags generically without any custom GTM trigger.
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'gtm.js' });
                // Send event to Google Analytics
                gtag('event', 'cookie_consent', {
                    'event_category': 'analytics',
                    'event_label': 'accepted'
                });
                // Enable PostHog
                posthog.opt_in_capturing();
                // Enable HubSpot tracking
                window._hsq = window._hsq || [];
                window._hsq.push(['doNotTrack', {track: true}]);
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
                // Disable PostHog
                posthog.opt_out_capturing();
                // Block HubSpot tracking
                window._hsq = window._hsq || [];
                window._hsq.push(['doNotTrack']);
            }
        }

        if(changedCategories.includes('ads')){
            if(CookieConsent.acceptedCategory('ads')){
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted'
                });
                // Send event to Google Analytics
                gtag('event', 'cookie_consent', {
                    'event_category': 'ads',
                    'event_label': 'accepted'
                });
            }else{
                gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied'
                });
                // Send event to Google Analytics
                gtag('event', 'cookie_consent', {
                    'event_category': 'ads',
                    'event_label': 'denied'
                });
            }
        }
    },

    categories: {
        necessary: {
            readOnly: true
        },
        functional: {},
        analytics: {},
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
                            description: "These cookies enable functional features on our website, such as the live chat support widget. Enabling these cookies allows you to use the chat to get help from our team.",
                            linkedCategory: "functional"
                        },
                        {
                            title: "Analytics Cookies",
                            description: "We use tools including Google Analytics, HubSpot, and PostHog to understand how visitors interact with our website. These cookies help us improve our content and build a better experience.",
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

// Auto-accept all categories for non-privacy-region users, but ONLY if the user
// has not already made an explicit consent decision (accept or reject).
// validConsent() returns true once any decision has been stored — this prevents
// the auto-accept from overriding a user's deliberate "Reject All" choice.
// Covers the race condition where /country fetch resolved before cc.min.js loaded.
if (window._ffLoadChat && !CookieConsent.validConsent()) {
    CookieConsent.acceptCategory(['analytics', 'functional', 'ads']);
}