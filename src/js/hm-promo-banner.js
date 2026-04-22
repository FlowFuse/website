(function () {
    'use strict';

    var STORAGE_KEY      = 'hm_banner_dismissed';
    var MOBILE_BP        = 768;
    var SHOW_DELAY       = 3000;
    var EXPIRY_DATE      = new Date('2026-04-20T14:00:00Z');

    var chatObserver     = null;
    var bannerWasShown   = false; // tracks whether the banner has been shown this session
    var hasResizeListener = false;

    function adjustForChat(banner) {
        var chat = document.getElementById('hubspot-messages-iframe-container');
        if (chat && chat.offsetHeight > 0) {
            banner.style.bottom = (chat.offsetHeight + 16) + 'px';
        } else {
            banner.style.bottom = '';
        }
    }

    function watchChatBubble(banner) {
        var chat = document.getElementById('hubspot-messages-iframe-container');
        if (chat) {
            chatObserver = new MutationObserver(function () {
                adjustForChat(banner);
                setTimeout(function () { adjustForChat(banner); }, 500);
            });
            chatObserver.observe(chat, { attributes: true, attributeFilter: ['style', 'class'] });
            adjustForChat(banner);
            setTimeout(function () { adjustForChat(banner); }, 500);
            return;
        }

        chatObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    // Guard against text nodes and other non-element nodes
                    if (node.nodeType === 1 && node.id === 'hubspot-messages-iframe-container') {
                        chatObserver.disconnect();
                        chatObserver.observe(node, { attributes: true, attributeFilter: ['style', 'class'] });
                        adjustForChat(banner);
                        setTimeout(function () { adjustForChat(banner); }, 500);
                    }
                });
            });
        });
        chatObserver.observe(document.body, { childList: true });
    }

    function showBanner(banner) {
        if (banner.classList.contains('hm-promo-banner--visible')) return;
        banner.classList.add('hm-promo-banner--visible');
        bannerWasShown = true;
        if (typeof capture === 'function') {
            capture('hm-banner-shown', { page: location.pathname, location: 'floating-banner' });
        }
    }

    function init() {
        if (new Date() >= EXPIRY_DATE) return;
        if (window.innerWidth < MOBILE_BP) return;
        if (sessionStorage.getItem(STORAGE_KEY)) return;

        var banner = document.getElementById('hm-promo-banner');
        if (!banner) return;

        // Resize: hide on mobile, restore on desktop if banner was shown and not dismissed
        if (!hasResizeListener) {
            window.addEventListener('resize', function () {
                if (window.innerWidth < MOBILE_BP) {
                    banner.classList.remove('hm-promo-banner--visible');
                } else if (bannerWasShown && !sessionStorage.getItem(STORAGE_KEY)) {
                    banner.classList.add('hm-promo-banner--visible');
                }
            });
            hasResizeListener = true;
        }

        setTimeout(function () {
            if (window.innerWidth < MOBILE_BP) return;
            showBanner(banner);
            adjustForChat(banner);
            watchChatBubble(banner);
        }, SHOW_DELAY);

        var closeBtn = document.getElementById('hm-promo-banner-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                dismiss(banner, 'close-button');
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && banner.classList.contains('hm-promo-banner--visible')) {
                dismiss(banner, 'esc-key');
            }
        });
    }

    function dismiss(banner, method) {
        banner.classList.remove('hm-promo-banner--visible');
        sessionStorage.setItem(STORAGE_KEY, 'true');
        if (chatObserver) {
            chatObserver.disconnect();
            chatObserver = null;
        }
        if (typeof capture === 'function') {
            capture('hm-banner-dismissed', { page: location.pathname, method: method, location: 'floating-banner' });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
