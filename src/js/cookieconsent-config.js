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
                    description: "We use cookies to ensure this site's proper operation and, if you approve, tracking cookies to understand how you interact with it.",
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
                            description: "We use Google Analytics, HubSpot, PostHog and Reo.Dev for analytics. These services use cookies to collect data that helps us understand how you interact with our website. These insights allow us to improve our content and build better features that enhance your experience.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "Advertisement Cookies",
                            description: "Google uses cookies for advertising, including serving and rendering ads, personalizing ads, limiting the number of times an ad is shown to a user, muting ads you have chosen to stop seeing, and measuring the effectiveness of ads.",
                            linkedCategory: "ads"
                        }
                    ]
                }
            }
        }
    }
});

// Auto-accept analytics + functional + ads for non-privacy-region users.
// Covers the race condition where the /country fetch resolved before cc.min.js loaded —
// in that case base.njk already set window._ffLoadChat = true but CookieConsent wasn't
// ready yet, so we check here once CookieConsent.run() has finished initialising.
if (window._ffLoadChat && !CookieConsent.acceptedCategory('analytics')) {
    CookieConsent.acceptCategory(['analytics', 'functional', 'ads']);
}