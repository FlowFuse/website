<script setup>
import { onMounted } from 'vue'
import navHighlights from '../../src/_data/navHighlights.json'
// Shared with the Eleventy layout, which reads the same file as an 11ty _data
// global. Edit the nav or footer there and both renderers follow.
import chrome from '../../src/_data/chrome.json'

const hl = (key) => {
    const entry = navHighlights[key]
    return { ...entry, image: entry.image || '/images/og-blog.jpg' }
}

const resolveHref = useResolveHref()

onMounted(() => {
    const navToggle = document.getElementById('nav-toggle')
    if (navToggle) {
        navToggle.onclick = function () {
            const header = document.getElementById('ff-header')
            const navContent = document.getElementById('nav-content')
            if (!header || !navContent) return
            const willOpen = !header.classList.contains('mobile-open')
            navToggle.classList.toggle('mobile-open')
            header.classList.toggle('mobile-open')
            // Freeze the page behind the drawer. Lock the scroll container (html)
            // only: locking html and body together makes the sticky header revert
            // to its static position and jump off screen.
            document.documentElement.classList.toggle('nav-scroll-lock', willOpen)
            if (willOpen) {
                // The drawer is fixed with top:0 in the stylesheet, so it has to be
                // anchored to the header's live bottom edge or it slides up behind
                // the header and the CTA row floats over the first nav rows.
                navContent.style.top = header.getBoundingClientRect().bottom + 'px'
            } else {
                navContent.style.top = ''
            }
        }
    }

    // Growing past the mobile breakpoint has to clear any open drawer state,
    // otherwise the scroll lock and the inline top offset stay stuck.
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            document.getElementById('nav-toggle')?.classList.remove('mobile-open')
            document.getElementById('ff-header')?.classList.remove('mobile-open')
            document.documentElement.classList.remove('nav-scroll-lock')
            const navContent = document.getElementById('nav-content')
            if (navContent) navContent.style.top = ''
        }
    })

    // Mobile nav: dropdown sections expand on tap, not hover
    document.querySelectorAll('header .ff-nav-dropdown > span').forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault()
                e.stopPropagation()
                // Toggle this section on its own; other open sections stay open
                trigger.parentElement.classList.toggle('mobile-expanded')
            }
        })
    })

    const nav = document.getElementById('nav-content')
    const headerNav = document.querySelector('.ff-header nav')
    const moreItem = document.getElementById('nav-more')
    const moreList = document.getElementById('nav-more-list')
    if (!nav || !moreItem || !moreList || !headerNav) return

    function isOverflowing() {
        const overflowBuffer = 24
        const navRight = headerNav.getBoundingClientRect().right
        const children = Array.from(headerNav.children).filter(el => el.offsetWidth > 0)
        const last = children[children.length - 1]
        return last && last.getBoundingClientRect().right > navRight + 1 + overflowBuffer
    }

    function handleNavOverflow() {
        if (window.innerWidth < 768) {
            moreItem.style.display = 'none'
            nav.querySelectorAll('.nav-collapsible').forEach(el => { el.style.display = '' })
            return
        }
        nav.querySelectorAll('.nav-collapsible').forEach(el => { el.style.display = '' })
        moreItem.style.display = 'none'
        while (moreList.firstChild) moreList.removeChild(moreList.firstChild)
        if (!isOverflowing()) return
        moreItem.style.display = ''
        const collapsible = Array.from(nav.querySelectorAll('.nav-collapsible')).reverse()
        for (let i = 0; i < collapsible.length; i++) {
            const item = collapsible[i]
            if (!isOverflowing()) break
            const link = item.querySelector('a')
            if (link) {
                const li = document.createElement('li')
                const a = document.createElement('a')
                a.className = 'flex items-center gap-2'
                a.href = link.getAttribute('href')
                a.textContent = link.textContent.trim()
                li.appendChild(a)
                moreList.prepend(li)
            }
            item.style.display = 'none'
        }
        if (moreList.children.length === 0) moreItem.style.display = 'none'
    }

    let resizeTimer
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(handleNavOverflow, 50)
    })
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(handleNavOverflow)
    } else {
        window.addEventListener('load', handleNavOverflow)
    }
    handleNavOverflow()
})
</script>

<template>
  <header id="ff-header" class="ff-header" data-nav-zone="header">
    <nav class="relative w-full flex items-center justify-between xl:grid xl:grid-cols-header mx-auto max-screen-none lg:max-w-screen-xl 2xl:max-w-[1920px]">

      <!-- Wordmark: visible from 420px up on mobile and on desktop, hidden on tablet -->
      <a class="ff-logo-link hidden min-[420px]:flex md:hidden lg:flex no-underline hover:no-underline font-bold h-8 w-40 flex-row" href="/" aria-label="FlowFuse Home" style="font-family:'Baloo 2', sans-serif">
        <!-- Five stops feed the staggered hover wave in style.css (ff-logo-wave). -->
        <FlowFuseWordmark uid="header" color="#DA3D0B" />
      </a>

      <!-- Square icon: visible below 420px and on tablet -->
      <a class="ff-logo-link w-8 h-8 block min-[420px]:hidden md:block lg:hidden shrink-0" href="/" aria-label="FlowFuse Home">
        <svg class="ff-wave-square" enable-background="new 0 0 79.4 79.4" viewBox="0 0 79.4 79.4" xmlns="http://www.w3.org/2000/svg">
          <!-- Rests on #ED4E4E, so ff-wave-square rebases the wave in style.css. -->
          <defs>
            <linearGradient id="ffWaveSquare" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="79.4" y2="0">
              <stop offset="0" stop-color="#ED4E4E" />
              <stop offset="0.25" stop-color="#ED4E4E" />
              <stop offset="0.5" stop-color="#ED4E4E" />
              <stop offset="0.75" stop-color="#ED4E4E" />
              <stop offset="1" stop-color="#ED4E4E" />
            </linearGradient>
          </defs>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.28751 0H73.5639C77.022 0 79.8514 2.83457 79.8514 6.29905V25.5112C70.4201 25.1962 60.9888 27.4009 52.1863 31.1803C49.3488 32.2807 46.5646 33.5413 43.7871 34.7989C37.0251 37.8605 30.3032 40.904 22.9494 41.5737C17.2809 42.047 11.435 41.9869 5.67825 41.9277C3.77251 41.9082 1.87653 41.8887 0 41.8887V6.29905C0 2.83457 2.82938 0 6.28751 0ZM44.0131 48.1865C45.9468 49.0061 47.863 49.861 49.7741 50.7136L49.7742 50.7136C55.9409 53.4649 62.0544 56.1924 68.5343 57.635C72.3069 58.2649 76.0794 58.5799 79.8519 58.5799V37.793H76.7081C67.2021 37.793 58.326 41.7897 49.7365 45.6572L49.7363 45.6573C47.8155 46.5222 45.909 47.3806 44.0131 48.1865ZM19.8057 54.8032C16.0332 54.4883 12.2606 54.4883 8.48814 54.4883H0V73.7004C0 77.1649 2.82938 79.9994 6.28751 79.9994H73.8782C77.3364 79.9994 80.1657 77.1649 80.1657 73.7004V71.1808C71.992 71.1808 63.5038 70.2359 55.9588 67.0864C51.7804 65.691 47.7481 63.8567 43.7373 62.0322L43.7373 62.0322C35.9794 58.5031 28.3023 55.0108 19.8057 54.8032Z" fill="url(#ffWaveSquare)"/>
          <path d="M79.8514 37.7939V25.1958C70.4201 24.8808 60.9888 27.0855 52.1863 30.8649C42.4407 34.6444 33.3238 40.3135 22.9494 41.2584C15.4044 41.8883 7.54501 41.5733 0 41.5733V54.4864H8.48814C12.2606 54.4864 16.0331 54.4864 19.8057 54.8013C32.695 55.1163 43.6982 62.9901 55.6445 67.0845C63.1895 70.234 71.6776 71.1789 79.8514 71.1789V58.5807C76.0789 58.5807 72.3064 58.2658 68.5338 57.6359C60.0457 55.7462 52.1863 51.6518 44.0126 48.1873C54.387 43.778 65.0757 37.7939 76.7076 37.7939H79.8514Z" fill="white"/>
        </svg>
      </a>

      <!-- Mobile hamburger -->
      <div class="flex items-center gap-2 md:hidden relative z-20">
        <CtaContactUs variant="primary" position="header-mobile" />
        <button id="nav-toggle" class="text-gray-700 flex items-center text-red-hero">
          <svg class="burger fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          <svg class="close fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <!-- Nav -->
      <ul id="nav-content" class="">
        <li v-for="dd in chrome.header.dropdowns" :key="dd.label" class="ff-nav-dropdown relative hover:cursor-pointer" :data-nav-section="dd.label">
          <span class="flex items-center gap-1"><span class="ff-nav-label">{{ dd.label }}</span><span class="ff-nav-chevron"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ff-icon--down"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg></span></span>
          <ul :class="dd.megaClasses">
            <li class="mega-highlight"><a :href="hl(dd.highlight).link" class="mega-highlight-card"><span class="mega-highlight-title">{{ hl(dd.highlight).title }}</span><span class="mega-highlight-media"><img :src="hl(dd.highlight).image" alt="" loading="lazy"></span></a></li>
            <template v-for="col in dd.columns" :key="col.title">
              <li class="pl-3 title border-l-2 border-gray-200" :class="col.titleGrid"><span class="flex items-center gap-2"><span class="ff-nav-label">{{ col.title }}</span></span></li>
              <li class="contents">
                <ul class="sub-menu grid grid-rows-subgrid ml-7 auto-rows-auto border-l-2 border-gray-200" :class="col.listClasses">
                  <li v-for="item in col.links" :key="item.label"><a class="flex items-center gap-2" :href="resolveHref(item.href)"><NavIcon :name="item.icon" :solid="!!item.solid" /><span class="ff-nav-label">{{ item.label }}</span></a></li>
                </ul>
              </li>
            </template>
          </ul>
        </li>

        <!-- Direct links -->
        <li v-for="item in chrome.header.direct" :key="item.label" :class="item.classes"><a class="flex items-center gap-2" :href="item.href"><span class="ff-nav-label">{{ item.label }}</span></a></li>

        <!-- More overflow (populated by JS) -->
        <li id="nav-more" class="ff-nav-dropdown relative hover:cursor-pointer" style="display:none" data-nav-section="More">
          <span class="flex items-center gap-1"><span class="ff-nav-label">More</span><span class="ff-nav-chevron"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ff-icon--down"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg></span></span>
          <ul id="nav-more-list" class="align-left"></ul>
        </li>
      </ul>

      <!-- Desktop CTAs -->
      <ul class="cta hidden md:flex flex-row items-center justify-end font-medium text no-underline z-10 bg-transparent w-auto">
        <li class="hidden md:flex"><CtaSignUp variant="nav-text" position="main-nav" padded class="ff-nav-freetrial text-base" /></li>
        <li class="flex">
          <CtaContactUs variant="primary" position="main-nav" class="ml-2" />
        </li>
      </ul>
    </nav>

    <!-- Mobile CTAs -->
    <div id="mobile-ctas" class="hidden fixed bottom-0 z-20">
      <div class="grid grid-cols-2 gap-2">
        <CtaSignIn variant="primary-outlined" position="mobile-cta-bar" />
        <CtaSignUp variant="primary-outlined" position="mobile-cta-bar" />
      </div>
      <CtaContactUs variant="primary" position="mobile-cta-bar" />
    </div>
  </header>
</template>
