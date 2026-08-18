<script setup>
// Shared with the Eleventy layout, which reads the same file as an 11ty _data
// global. Edit the nav or footer there and both renderers follow.
import chrome from '../../src/_data/chrome.json'

const resolveHref = useResolveHref()

const onCaptureClick = (item) => {
    if (!item.capture || typeof window === 'undefined' || !window.capture) return
    window.capture(item.capture.event, item.capture.props)
}
</script>

<template>
    <footer class="ff-footer bg-gray-100 w-full" data-nav-zone="footer">
        <div class="pt-20 pb-12 px-6 max-w-screen-xl mx-auto">
            <!-- Sections synced with the top nav: Platform / Solutions / Resources / Company -->
            <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr_1fr] gap-x-8 gap-y-12 text-sm">
                <section v-for="sec in chrome.footer.sections" :key="sec.title" class="pt-5" :data-nav-section="sec.title">
                    <p class="text-lg font-medium text-gray-900 mb-6">{{ sec.title }}</p>
                    <div :class="sec.gridClasses">
                        <div v-for="grp in sec.groups" :key="grp.title" :class="grp.classes">
                            <p class="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-4">{{ grp.title }}</p>
                            <ul class="flex flex-col gap-2.5">
                                <li v-for="item in grp.links" :key="item.label"><a :href="resolveHref(item.href)" @click="onCaptureClick(item)">{{ item.label }}</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
            <!-- Company -->
            <section class="mt-12 border-t border-gray-300 pt-9" data-nav-section="Company">
                <!-- Mirrors the upper section's [2fr_3fr_1fr] tracks so the logo lines up
                     under Platform, the three groups under Solutions' sub-columns, and the
                     last group under Resources. -->
                <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr_1fr] gap-x-8 gap-y-8 text-sm">
                    <div>
                        <a href="/" class="ff-logo-link ff-footer-logo block w-40 no-underline hover:no-underline" aria-label="FlowFuse home">
                            <FlowFuseWordmark uid="footer" color="#1F2937" />
                        </a>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8">
                        <div v-for="(grp, i) in chrome.footer.company.grid" :key="i">
                            <ul class="flex flex-col gap-2.5">
                                <li v-for="item in grp.links" :key="item.label"><a :href="resolveHref(item.href)">{{ item.label }}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul class="flex flex-col gap-2.5">
                            <li v-for="item in chrome.footer.company.trailing.links" :key="item.label"><a :href="resolveHref(item.href)">{{ item.label }}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
<!-- Legal + social bottom row -->
            <div class="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-500" data-nav-section="Legal and social">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>Copyright {{ new Date().getFullYear() }} FlowFuse Inc. All Rights Reserved.</span>
                    <span aria-hidden="true">&middot;</span>
                    <a href="/privacy-policy/">Privacy</a>
                    <span aria-hidden="true">&middot;</span>
                    <a href="/terms/">Terms</a>
                    <span aria-hidden="true">&middot;</span>
                    <a class="cursor-pointer" type="button" data-cc="show-preferencesModal">Cookie preferences</a>
                </div>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a href="https://www.facebook.com/FlowFuse/" class="block">
                <span class="sr-only">Visit our Facebook page</span>
                <IconsFacebookIcon class="h-5 hover:text-red-hero" />
              </a>
              <a href="https://github.com/FlowFuse" class="block">
                <span class="sr-only">Visit our GitHub page</span>
                <IconsGithubIcon class="hover:text-red-hero h-5" />
              </a>
              <a href="https://discord.gg/2RrvW8dkrF" class="block">
                <span class="sr-only">Join our Discord</span>
                <svg class="fill-current hover:text-red-hero h-5" width="22" height="17" viewBox="0 0 22 17" xmlns="http://www.w3.org/2000/svg"><path d="M18.6361 1.39641C17.1907 0.734661 15.6648 0.265193 14.0973 0C13.8828 0.38343 13.6888 0.777928 13.5159 1.18184C11.8463 0.930252 10.1484 0.930252 8.47881 1.18184C8.30587 0.77797 8.1118 0.383476 7.8974 0C6.32897 0.267433 4.80205 0.738015 3.35518 1.39987C0.482757 5.64967 -0.29591 9.79391 0.0934235 13.8793C1.77558 15.1222 3.6584 16.0674 5.66003 16.6739C6.11074 16.0677 6.50956 15.4246 6.85226 14.7514C6.20135 14.5083 5.57311 14.2084 4.9748 13.8551C5.13227 13.7409 5.28627 13.6232 5.43508 13.509C7.17601 14.3277 9.07613 14.7522 11 14.7522C12.9238 14.7522 14.8239 14.3277 16.5648 13.509C16.7154 13.6319 16.8694 13.7495 17.0251 13.8551C16.4257 14.209 15.7963 14.5095 15.1442 14.7532C15.4865 15.426 15.8853 16.0686 16.3364 16.6739C18.3398 16.0698 20.224 15.1251 21.9065 13.881C22.3633 9.14329 21.1261 5.03711 18.6361 1.39641ZM7.34541 11.3668C6.26047 11.3668 5.36414 10.3822 5.36414 9.17097C5.36414 7.95971 6.22932 6.96648 7.34195 6.96648C8.45458 6.96648 9.34399 7.95971 9.32496 9.17097C9.30593 10.3822 8.45112 11.3668 7.34541 11.3668ZM14.6545 11.3668C13.5678 11.3668 12.675 10.3822 12.675 9.17097C12.675 7.95971 13.5401 6.96648 14.6545 6.96648C15.7689 6.96648 16.6514 7.95971 16.6323 9.17097C16.6133 10.3822 15.7602 11.3668 14.6545 11.3668Z"/></svg>
              </a>
              <a href="https://www.reddit.com/r/flowfuse" class="block">
                <span class="sr-only">Visit our Reddit community</span>
                <IconsRedditIcon class="h-5 hover:text-red-hero" />
              </a>
              <a href="/blog/index.xml" class="block">
                <span class="sr-only">Subscribe to our RSS feed</span>
                <svg class="fill-current hover:text-red-hero" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/flowfuse" class="block">
                <span class="sr-only">Visit our LinkedIn page</span>
                <IconsLinkedinIcon class="h-5 hover:text-red-hero" />
              </a>
              <a href="https://www.youtube.com/channel/UCbBzP8NZbv3WDtlt4UouA-g" class="block">
                <span class="sr-only">Visit our YouTube channel</span>
                <svg class="fill-current h-5 hover:text-red-hero" width="28" height="20" viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg"><path d="M27.3016 2.97749C26.9889 1.80488 26.0709 0.88338 24.9028 0.569489C22.7854 0 14.3001 0 14.3001 0C14.3001 0 5.81476 0 3.69957 0.569489C2.53142 0.88338 1.61342 1.80488 1.30072 2.97749C0.733398 5.10074 0.733398 9.53333 0.733398 9.53333C0.733398 9.53333 0.733398 13.9659 1.30072 16.0892C1.61342 17.2618 2.53142 18.1833 3.69957 18.4972C5.81476 19.0667 14.3001 19.0667 14.3001 19.0667C14.3001 19.0667 22.7854 19.0667 24.9006 18.4972C26.0687 18.1833 26.9867 17.2618 27.2994 16.0892C27.8667 13.9659 27.8667 9.53333 27.8667 9.53333C27.8667 9.53333 27.8667 5.10074 27.2994 2.97749H27.3016ZM11.5863 13.6184V5.44826L18.6354 9.53333L11.5863 13.6184Z"/></svg>
              </a>
                </div>
            </div>
        </div>
    </footer>
</template>
