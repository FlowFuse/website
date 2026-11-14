<script setup lang="ts">
// The footer's newsletter signup. It is the blog's HubSpot form (same list, same
// cta-blog-subscribe event) embedded with its own stylesheet, which HubSpot uses in place of
// its default one (it then renders the form into the page, not an iframe; every rule here is
// scoped to the footer for that reason). Two simpler routes
// don't work: the form has captcha on, so HubSpot refuses direct API submissions, and its
// default look carries a full consent block that is right for a signup page and far too
// heavy for a footer on every page.
//
// The form only requires `email`. Processing consent is set to implicit (a notice, not a
// checkbox) and its one checkbox, "other communications", is optional, so the consent block
// is hidden here and the privacy line below the embed gives the notice instead.
const FORM_ID = '159c173d-dd95-49bd-922b-ff3ef243e90c'

const css = `
.ff-footer-newsletter .hs-form { display: flex; flex-wrap: wrap; gap: 8px; font-family: Heebo, Helvetica, Arial, sans-serif; }
.ff-footer-newsletter .hs-form fieldset, .ff-footer-newsletter .hs-form .hs_email { flex: 1 1 200px; max-width: none !important; margin: 0; padding: 0; border: 0; }
.ff-footer-newsletter .hs-form .input { margin: 0 !important; }
.ff-footer-newsletter .hs-form .hs_email > label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.ff-footer-newsletter .hs-form .hs_email .hs-input { box-sizing: border-box; width: 100% !important; height: 42px; padding: 0 12px; font: inherit; font-size: 15px; color: #111827; background: #fff; border: 1px solid #d1d5db; border-radius: 6px; outline: none; }
.ff-footer-newsletter .hs-form .hs_email .hs-input::placeholder { color: #9ca3af; }
.ff-footer-newsletter .hs-form .hs_email .hs-input:focus { border-color: #4f46e5; box-shadow: 0 0 0 1px #4f46e5; }
.ff-footer-newsletter .hs-form .hs_email .hs-input.invalid.error { border-color: #dc2626; }
.ff-footer-newsletter .hs-form .legal-consent-container { order: 8; flex: 0 0 100%; margin-top: 8px; font-size: 12px; line-height: 1.6; color: #6b7280; }
.ff-footer-newsletter .hs-form .legal-consent-container p { margin: 0 0 4px; font-size: 12px !important; color: inherit !important; }
.ff-footer-newsletter .hs-form .legal-consent-container span { font-size: 12px !important; color: inherit !important; font-family: inherit !important; }
.ff-footer-newsletter .hs-form .legal-consent-container a { color: inherit; text-decoration: underline; }
.ff-footer-newsletter .hs-form .legal-consent-container ul { list-style: none; margin: 0 0 4px; padding: 0; }
.ff-footer-newsletter .hs-form .legal-consent-container .hs-form-booleancheckbox-display { display: flex; align-items: flex-start; gap: 6px; margin: 0; cursor: pointer; }
.ff-footer-newsletter .hs-form .legal-consent-container input[type=checkbox] { width: 14px; height: 14px; margin: 2px 0 0; flex: 0 0 auto; accent-color: #4f46e5; }
.ff-footer-newsletter .hs-form .legal-consent-container .field { margin: 0; }
.ff-footer-newsletter .hs-form .legal-consent-container label span { margin: 0 !important; padding: 0 !important; }
/* Three groups with room between them: the consent text, the checkbox, then the two
   privacy sentences run together as one paragraph instead of two stacked lines. */
.ff-footer-newsletter .hs-form .legal-consent-container .hs-richtext { margin: 0 0 10px; }
.ff-footer-newsletter .hs-form .legal-consent-container .inputs-list { margin: 0 0 10px; }
.ff-footer-newsletter .hs-form .legal-consent-container div + .hs-richtext, .ff-footer-newsletter .hs-form .legal-consent-container .hs-richtext + .hs-richtext { display: inline; margin: 0; }
.ff-footer-newsletter .hs-form .legal-consent-container div + .hs-richtext::after { content: " "; }
/* The captcha is invisible; its inline badge is hidden (Google allows this when the form
   carries the reCAPTCHA notice, which the line under the embed does). visibility, not
   display: none, so the captcha still runs. */
.ff-footer-newsletter .hs-form .hs_recaptcha { order: 9; flex: 0 0 100%; height: 0; margin: -8px 0 0; overflow: hidden; }
.ff-footer-newsletter .hs-form .grecaptcha-badge { visibility: hidden; }
.ff-footer-newsletter .hs-form .hs_submit { flex: 0 0 auto; }
.ff-footer-newsletter .hs-form .hs_submit .actions { margin: 0; padding: 0; }
.ff-footer-newsletter .hs-form .hs-button { height: 42px; padding: 0 20px; font: inherit; font-size: 15px; font-weight: 600; color: #fff; background: #4f46e5; border: 0; border-radius: 6px; cursor: pointer; }
.ff-footer-newsletter .hs-form .hs-button:hover { background: #4338ca; }
.ff-footer-newsletter .hs-form .hs-error-msgs { list-style: none; margin: 6px 0 0; padding: 0; font-size: 13px; color: #dc2626; }
.ff-footer-newsletter .hs-form .hs_error_rollup { display: none; }
.ff-footer-newsletter .submitted-message { font-size: 15px; color: #111827; }
.ff-footer-newsletter .submitted-message p { margin: 0; }
.ff-footer-newsletter .submitted-message span { color: inherit !important; font-family: inherit !important; }
`

function onReady(form: HTMLFormElement) {
    const input = form.querySelector('input[name="email"]') as HTMLInputElement | null
    if (input) input.placeholder = 'Work email'
    const button = form.querySelector('input[type="submit"], button[type="submit"]') as HTMLInputElement | null
    if (button) {
        if (button.tagName === 'INPUT') button.value = 'Subscribe'
        else button.textContent = 'Subscribe'
    }
}
</script>

<template>
  <section class="ff-footer-newsletter w-full lg:max-w-md" data-nav-section="Newsletter">
    <p class="font-semibold text-gray-900">Get the monthly newsletter</p>
    <p class="text-gray-600 mt-1 mb-4">Product updates, guides and webinars, once a month.</p>
    <HubSpotForm :form-id="FORM_ID" cta="cta-blog-subscribe" reference="footer" :css="css" @ready="onReady" />
    <p class="mt-2 text-xs text-gray-500">
      This site is protected by reCAPTCHA and the Google
      <a href="https://policies.google.com/privacy" class="underline" target="_blank" rel="noopener">Privacy Policy</a> and
      <a href="https://policies.google.com/terms" class="underline" target="_blank" rel="noopener">Terms of Service</a> apply.
    </p>
  </section>
</template>
