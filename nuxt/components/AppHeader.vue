<script setup>
import { onMounted } from 'vue'
import navHighlights from '../../src/_data/navHighlights.json'

const hl = (key) => {
    const entry = navHighlights[key]
    return { ...entry, image: entry.image || '/images/og-blog.jpg' }
}

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
  <header id="ff-header" class="ff-header">
    <nav class="relative w-full flex items-center justify-between xl:grid xl:grid-cols-header mx-auto max-screen-none lg:max-w-screen-xl 2xl:max-w-[1920px]">

      <!-- Wordmark: visible from 420px up on mobile and on desktop, hidden on tablet -->
      <a class="ff-logo-link hidden min-[420px]:flex md:hidden lg:flex no-underline hover:no-underline font-bold h-8 w-40 flex-row" href="/" aria-label="FlowFuse Home" style="font-family:'Baloo 2', sans-serif">
        <svg class="h-full w-full" viewBox="0 0 402 70" xmlns="http://www.w3.org/2000/svg">
          <!-- Five stops feed the staggered hover wave in style.css (ff-logo-wave). -->
          <defs>
            <linearGradient id="ffWaveWordmark" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="402" y2="0">
              <stop offset="0" stop-color="#DA3D0B" />
              <stop offset="0.25" stop-color="#DA3D0B" />
              <stop offset="0.5" stop-color="#DA3D0B" />
              <stop offset="0.75" stop-color="#DA3D0B" />
              <stop offset="1" stop-color="#DA3D0B" />
            </linearGradient>
          </defs>
          <mask id="wm-mask0" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="402" height="70">
            <path d="M402 0H0V70H402V0Z" fill="white" />
          </mask>
          <g mask="url(#wm-mask0)">
            <mask id="wm-mask1" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="402" height="70">
              <path d="M402 0H0V70H402V0Z" fill="white" />
            </mask>
            <g mask="url(#wm-mask1)">
              <path d="M118.95 9.98H95.3695C93.7495 9.98 92.4595 10.47 91.4795 11.44C90.4995 12.41 90.0195 13.71 90.0195 15.32V55.38C90.0195 57.05 90.4495 58.24 91.3095 58.94C92.1695 59.64 93.5495 59.99 95.4395 59.99C96.3595 59.99 97.2495 59.92 98.1095 59.79C98.9695 59.66 99.6195 59.53 100.05 59.43V39.87H113.6C114.73 39.87 115.62 39.51 116.27 38.78C116.92 38.05 117.24 37.01 117.24 35.66C117.24 34.85 117.12 34.11 116.88 33.43C116.64 32.76 116.38 32.2 116.11 31.77H100.05V18.15H116.35C117.48 18.15 118.37 17.79 119.02 17.06C119.67 16.33 119.99 15.27 119.99 13.86C119.99 13.05 119.88 12.3 119.67 11.59C119.45 10.89 119.21 10.35 118.94 9.97" fill="url(#ffWaveWordmark)" />
              <path d="M130.979 9.98001C130.059 9.98001 129.199 10.06 128.389 10.22C127.579 10.38 126.959 10.52 126.529 10.62V55.53C126.529 57.2 126.969 58.36 127.859 59.01C128.749 59.66 130.079 59.98 131.869 59.98C132.839 59.98 133.719 59.91 134.499 59.78C135.279 59.65 135.889 59.5 136.319 59.34V14.52C136.319 12.85 135.889 11.68 135.029 11C134.169 10.33 132.819 9.99001 130.979 9.99001" fill="url(#ffWaveWordmark)" />
              <path d="M175.521 22.61C172.531 20.94 169.041 20.1 165.041 20.1C161.041 20.1 157.611 20.94 154.601 22.61C151.591 24.28 149.241 26.63 147.571 29.65C145.901 32.67 145.061 36.26 145.061 40.41C145.061 44.56 145.881 48.15 147.531 51.17C149.171 54.19 151.501 56.53 154.521 58.17C157.531 59.81 161.041 60.64 165.041 60.64C169.041 60.64 172.611 59.82 175.601 58.17C178.591 56.52 180.901 54.18 182.551 51.13C184.191 48.08 185.011 44.51 185.011 40.41C185.011 36.31 184.171 32.67 182.501 29.65C180.831 26.63 178.501 24.28 175.511 22.61M172.271 49.6C170.521 51.78 168.111 52.88 165.041 52.88C161.971 52.88 159.561 51.8 157.811 49.65C156.061 47.49 155.181 44.42 155.181 40.42C155.181 36.42 156.071 33.41 157.851 31.19C159.631 28.98 162.031 27.87 165.041 27.87C168.051 27.87 170.521 28.98 172.271 31.19C174.021 33.4 174.901 36.48 174.901 40.42C174.901 44.36 174.021 47.42 172.271 49.6Z" fill="url(#ffWaveWordmark)" />
              <path d="M281.95 9.98H258.37C256.75 9.98 255.46 10.47 254.48 11.44C253.51 12.41 253.02 13.71 253.02 15.32V55.38C253.02 57.05 253.45 58.24 254.31 58.94C255.17 59.64 256.55 59.99 258.44 59.99C259.36 59.99 260.25 59.92 261.11 59.79C261.97 59.66 262.62 59.53 263.05 59.43V39.87H276.6C277.73 39.87 278.62 39.51 279.27 38.78C279.92 38.05 280.24 37.01 280.24 35.66C280.24 34.85 280.12 34.11 279.88 33.43C279.64 32.76 279.38 32.2 279.11 31.77H263.05V18.15H279.35C280.48 18.15 281.37 17.79 282.02 17.06C282.67 16.33 282.99 15.27 282.99 13.86C282.99 13.05 282.88 12.3 282.67 11.59C282.45 10.89 282.21 10.35 281.94 9.97" fill="url(#ffWaveWordmark)" />
              <path d="M243.98 21.39C243.12 20.8 242.01 20.5 240.66 20.5C239.04 20.5 237.59 20.88 236.29 21.63C235.59 26.59 234.71 31.61 233.66 36.68C232.61 41.75 231.59 46.53 230.62 51H230.22C229.95 49.76 229.45 47.87 228.72 45.34C227.99 42.81 227.14 39.91 226.17 36.64C225.2 33.38 224.17 30.02 223.09 26.56C222.77 25.59 222.13 24.87 221.19 24.42C220.25 23.96 219.08 23.73 217.67 23.73C216.59 23.73 215.64 23.84 214.83 24.05C214.02 24.27 213.26 24.59 212.56 25.02C211.48 28.63 210.42 32.2 209.36 35.7C208.31 39.21 207.39 42.32 206.61 45.05C205.83 47.77 205.27 49.76 204.95 51H204.63C204.41 50.14 204.11 48.88 203.74 47.24C203.36 45.6 202.93 43.64 202.45 41.37C201.96 39.1 201.46 36.57 200.95 33.76C200.44 30.95 199.94 28.01 199.46 24.94C199.19 23.32 198.65 22.18 197.84 21.5C197.03 20.83 195.92 20.49 194.52 20.49C193.39 20.49 192.37 20.71 191.48 21.14C190.59 21.57 189.88 22.06 189.34 22.6C189.72 24.65 190.19 27 190.76 29.64C191.33 32.28 191.95 35.01 192.62 37.81C193.29 40.62 193.97 43.33 194.64 45.94C195.31 48.56 195.97 50.86 196.62 52.86C197.27 54.86 197.84 56.4 198.32 57.47C198.75 58.33 199.53 59 200.67 59.45C201.8 59.91 203.1 60.14 204.56 60.14C205.85 60.14 206.95 60 207.84 59.73C208.73 59.46 209.44 59.11 209.99 58.68C210.64 56.9 211.4 54.67 212.29 52C213.18 49.33 214.1 46.44 215.04 43.34C215.98 40.24 216.83 37.2 217.59 34.24C218.4 37.15 219.23 40.11 220.09 43.1C220.95 46.09 221.8 48.87 222.64 51.44C223.48 54 224.22 56.09 224.87 57.71C225.41 59.33 227.33 60.14 230.61 60.14C231.85 60.14 233 59.99 234.05 59.69C235.1 59.4 235.88 59.06 236.36 58.68C236.79 57.6 237.3 56.15 237.9 54.31C238.49 52.48 239.13 50.4 239.8 48.08C240.47 45.76 241.14 43.36 241.78 40.88C242.43 38.4 243 36.05 243.52 33.84C244.03 31.63 244.45 29.67 244.78 27.97C245.1 26.27 245.26 25.07 245.26 24.37C245.26 22.97 244.83 21.97 243.97 21.38" fill="url(#ffWaveWordmark)" />
              <path d="M316.89 20.67C315.97 20.67 315.11 20.75 314.3 20.91C313.49 21.07 312.87 21.21 312.44 21.31V51.17C311.79 51.55 310.87 51.91 309.69 52.26C308.5 52.61 307.05 52.78 305.32 52.78C302.62 52.78 300.52 52.15 299.01 50.88C297.5 49.61 296.74 47.55 296.74 44.69V25.27C296.74 23.49 296.32 22.28 295.48 21.63C294.64 20.98 293.31 20.66 291.47 20.66C290.5 20.66 289.61 20.74 288.8 20.9C287.99 21.06 287.4 21.2 287.02 21.3V44.85C287.02 48.52 287.75 51.51 289.2 53.83C290.66 56.15 292.76 57.85 295.51 58.93C298.26 60.01 301.5 60.55 305.22 60.55C308.3 60.55 311.02 60.24 313.4 59.62C315.77 59 317.71 58.23 319.22 57.32C320.35 56.62 321.14 55.86 321.57 55.06C322 54.25 322.22 53.23 322.22 51.98V25.27C322.22 23.49 321.79 22.28 320.93 21.63C320.07 20.98 318.72 20.66 316.88 20.66" fill="url(#ffWaveWordmark)" />
              <path d="M347.659 36.62L343.449 35.57C341.779 35.19 340.589 34.67 339.889 33.99C339.189 33.32 338.839 32.52 338.839 31.6C338.839 30.3 339.459 29.32 340.699 28.64C341.939 27.97 343.609 27.63 345.719 27.63C347.119 27.63 348.509 27.78 349.889 28.07C351.269 28.37 352.519 28.74 353.649 29.2C354.779 29.66 355.669 30.1 356.319 30.53C356.909 30.1 357.409 29.53 357.819 28.83C358.219 28.13 358.429 27.32 358.429 26.4C358.429 25.05 357.849 23.91 356.689 22.96C355.529 22.02 353.939 21.29 351.909 20.78C349.889 20.27 347.579 20.01 344.989 20.01C340.019 20.01 336.169 21.1 333.419 23.29C330.669 25.48 329.289 28.24 329.289 31.59C329.289 34.61 330.219 37.04 332.079 38.87C333.939 40.71 336.809 42.05 340.699 42.92L345.469 44.13C347.199 44.51 348.459 45.06 349.269 45.79C350.079 46.52 350.479 47.5 350.479 48.74C350.479 51.6 348.159 53.03 343.519 53.03C340.979 53.03 338.719 52.64 336.719 51.86C334.719 51.08 332.969 50.2 331.459 49.23C330.759 49.72 330.189 50.33 329.759 51.09C329.329 51.85 329.109 52.68 329.109 53.6C329.109 55.71 330.489 57.4 333.239 58.7C335.989 60 339.519 60.64 343.839 60.64C349.119 60.64 353.159 59.57 355.939 57.44C358.719 55.31 360.109 52.38 360.109 48.66C360.109 45.53 359.119 42.99 357.149 41.02C355.179 39.05 352.009 37.58 347.639 36.61" fill="url(#ffWaveWordmark)" />
              <path d="M400.87 40.23C401.63 39.5 402 38.38 402 36.87C402 33.63 401.24 30.75 399.73 28.21C398.22 25.67 396.13 23.68 393.46 22.22C390.79 20.76 387.7 20.04 384.19 20.04C381.6 20.04 379.16 20.46 376.87 21.29C374.58 22.12 372.55 23.38 370.8 25.05C369.05 26.72 367.67 28.8 366.67 31.28C365.67 33.76 365.17 36.65 365.17 39.94C365.17 44.47 366.06 48.27 367.84 51.35C369.62 54.43 372.12 56.73 375.32 58.27C378.53 59.81 382.21 60.58 386.37 60.58C389.07 60.58 391.45 60.31 393.53 59.77C395.61 59.23 397.26 58.46 398.51 57.46C399.75 56.46 400.37 55.29 400.37 53.94C400.37 53.08 400.14 52.28 399.68 51.55C399.22 50.82 398.64 50.24 397.94 49.81C396.75 50.62 395.2 51.36 393.29 52.04C391.37 52.71 389.29 53.05 387.02 53.05C383.62 53.05 380.82 52.21 378.6 50.54C376.85 49.22 375.65 47.31 374.98 44.84L397.69 41.55C399.04 41.39 400.09 40.95 400.85 40.22M374.36 37.99C374.53 34.74 375.47 32.2 377.2 30.39C379.06 28.45 381.39 27.48 384.2 27.48C387.01 27.48 388.98 28.25 390.43 29.79C391.89 31.33 392.69 33.15 392.86 35.25L374.36 37.99Z" fill="url(#ffWaveWordmark)" />
              <path d="M38.6096 42.28C45.7596 45.31 52.6296 48.9 60.0596 50.56C63.3596 51.11 66.7096 51.38 69.9996 51.38V33.16H67.2496C57.0696 33.16 47.6796 38.41 38.5996 42.27" fill="url(#ffWaveWordmark)" />
              <path d="M17.43 48.08C14.13 47.81 10.82 47.81 7.53 47.81H0V64.54C0 67.56 2.45 70.01 5.47 70.01H64.53C67.55 70.01 70 67.56 70 64.54V62.43C62.86 62.43 55.39 61.51 48.78 58.75C38.34 55.17 28.71 48.36 17.43 48.08Z" fill="url(#ffWaveWordmark)" />
              <path d="M64.53 0H5.47C2.45 0 0 2.45 0 5.47V36.49C6.61 36.49 13.58 36.76 20.18 36.21C29.26 35.39 37.23 30.42 45.76 27.11C53.46 23.8 61.75 21.86 70 22.14V5.47C70 2.45 67.55 0 64.53 0Z" fill="url(#ffWaveWordmark)" />
              <path d="M70 33.17V22.13C61.75 21.86 53.46 23.8 45.76 27.1C37.23 30.41 29.26 35.38 20.18 36.2C13.58 36.76 6.61 36.48 0 36.48V47.79H7.54C10.83 47.79 14.14 47.79 17.44 48.06C28.72 48.33 38.34 55.15 48.79 58.73C55.4 61.49 62.87 62.41 70.01 62.41V51.37C66.72 51.37 63.37 51.1 60.07 50.55C52.64 48.88 45.77 45.3 38.62 42.27C47.7 38.4 57.08 33.16 67.27 33.16H70.02L70 33.17Z" fill="white" />
            </g>
          </g>
        </svg>
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
        <a class="ff-btn ff-btn--primary uppercase text-sm inline-flex whitespace-nowrap" href="/contact-us" onclick="capture('cta-talk-us', {'position': 'header-mobile'})">Contact Us</a>
        <button id="nav-toggle" class="text-gray-700 flex items-center text-red-hero">
          <svg class="burger fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          <svg class="close fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <!-- Nav -->
      <ul id="nav-content" class="">

        <!-- Platform -->
        <li class="ff-nav-dropdown relative hover:cursor-pointer">
          <span class="flex items-center gap-1"><span class="ff-nav-label">Platform</span><span class="ff-nav-chevron"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ff-icon--down"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg></span></span>
          <ul class="narrow mega md:grid md:grid-flow-col md:grid-rows-[repeat(8,auto)] md:pr-1 md:auto-rows-auto items-center">
            <li class="mega-highlight"><a :href="hl('platform').link" class="mega-highlight-card"><span class="mega-highlight-title">{{ hl('platform').title }}</span><span class="mega-highlight-media"><img :src="hl('platform').image" alt="" loading="lazy"></span></a></li>
            <li class="pl-3 title border-l-2 border-gray-200 xl:col-start-2 xl:row-start-1"><span class="flex items-center gap-2"><span class="ff-nav-label">Product</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-3 ml-7 auto-rows-auto border-l-2 border-gray-200 xl:col-start-2 xl:row-start-2">
              <li><a class="flex items-center gap-2" href="/platform/features/"><UIcon name="i-heroicons-star" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Features</span></a></li>
              <li><a class="flex items-center gap-2" href="/platform/security/"><UIcon name="i-heroicons-lock-closed" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Security Statement</span></a></li>
              <li><a class="flex items-center gap-2" href="/pricing/"><UIcon name="i-heroicons-currency-dollar" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Pricing</span></a></li>
            </ul>
            </li>
            <li class="pl-3 title border-l-2 border-gray-200 md:col-start-2 md:row-start-1 xl:col-start-3"><span class="flex items-center gap-2"><span class="ff-nav-label">Components</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-6 ml-7 auto-rows-auto border-l-2 border-gray-200 md:col-start-2 md:row-start-2 xl:col-start-3">
              <li><a class="flex items-center gap-2" href="/platform/dashboard/"><svg class="ff-icon ff-icon-sm" fill="none" viewBox="0 0 350 402"><path d="M346.559 97.9807L178.437 0.921873C177.372 0.30994 176.188 0 174.996 0C173.804 0 172.62 0.30994 171.555 0.921873L3.44127 97.9807C1.31134 99.2126 0 101.485 0 103.941V298.059C0 300.515 1.31134 302.787 3.44127 304.019L171.555 401.078C172.62 401.69 173.804 402 174.996 402C176.188 402 177.372 401.69 178.437 401.078L346.551 304.019C348.681 302.787 349.992 300.515 349.992 298.059V103.941C349.992 101.485 348.681 99.2126 346.551 97.9807H346.559ZM223.619 65.5801C223.619 62.1946 226.472 59.3336 229.866 59.3336H240.261L296.338 91.7104H229.866C226.48 91.7104 223.619 88.8494 223.619 85.4639V65.5801ZM174.996 21.6561L220.75 48.0725C214.432 51.3785 210.092 57.9905 210.092 65.5801V68.9656C177.166 70.9445 162.185 87.2997 150.009 100.603C141.235 110.18 134.011 118.055 121.716 120.32V116.069C121.716 105.205 112.823 96.3118 101.951 96.3118H45.6902L174.996 21.6561ZM19.678 111.332L22.2848 109.822H101.943C105.328 109.822 108.189 112.683 108.189 116.069V135.952C108.189 139.338 105.336 142.199 101.943 142.199H20.9973C20.5443 142.199 20.1072 142.135 19.678 142.04V111.332ZM102.109 338.256L69.485 319.421V269.449C69.485 268.964 69.938 268.503 70.4228 268.503H101.172C101.656 268.503 102.109 268.964 102.109 269.449V338.256ZM190.891 371.165L174.996 380.344L158.259 370.68V196.414C158.259 195.93 158.712 195.477 159.196 195.477H189.937C190.422 195.477 190.883 195.93 190.883 196.414V371.173L190.891 371.165ZM280.793 319.262L248.169 338.097V246.696C248.169 246.219 248.622 245.759 249.106 245.759H279.855C280.332 245.759 280.793 246.219 280.793 246.696V319.262ZM330.314 290.668L294.312 311.458V246.696C294.312 238.749 287.803 232.248 279.847 232.248H249.098C241.143 232.248 234.634 238.749 234.634 246.696V345.901L204.41 363.353V196.407C204.41 188.459 197.893 181.959 189.937 181.959H159.196C151.241 181.959 144.732 188.459 144.732 196.407V362.868L115.62 346.06V269.449C115.62 261.502 109.111 254.993 101.156 254.993H70.4069C62.4515 254.993 55.9425 261.502 55.9425 269.449V311.609L19.6701 290.668V155.661C20.1072 155.693 20.5443 155.709 20.9893 155.709H101.943C112.815 155.709 121.708 146.816 121.708 135.952V134.196C161.008 134.474 174.042 143.081 187.807 152.181C201.882 161.503 216.442 171.135 255.735 171.135V174.321C255.735 185.185 264.636 194.078 275.508 194.078H330.306V290.668H330.314ZM330.314 180.568H275.516C272.13 180.568 269.261 177.707 269.261 174.321V154.437C269.261 151.052 272.122 148.191 275.516 148.191H330.314V180.568ZM330.314 134.681H275.516C264.644 134.681 255.743 143.574 255.743 154.437V157.624C220.519 157.624 208.264 149.51 195.278 140.919C183.85 133.354 172.103 125.597 147.402 122.307C151.98 118.453 156.009 114.058 159.983 109.719C163.21 106.19 166.476 102.638 170.092 99.3079C179.399 90.6932 189.786 85.909 200.881 83.652C203.734 83.1195 206.81 82.7381 210.092 82.5155V85.4639C210.092 96.3277 218.985 105.221 229.858 105.221H310.811C313.203 105.221 315.5 104.784 317.622 103.997L330.322 111.332V134.681H330.314Z" fill="currentColor"/></svg><span class="ff-nav-label">FlowFuse Dashboard</span></a></li>
              <li><a class="flex items-center gap-2" href="/platform/device-agent/"><svg class="ff-icon ff-icon-sm" viewBox="0 0 389 388" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M202.763 209.857C218.321 216.441 233.282 224.255 249.385 227.89C256.584 229.049 263.854 229.681 270.983 229.681V190.049H265.013C242.94 190.049 222.501 201.498 202.763 209.857Z"/><path d="M156.757 222.482C149.557 221.867 142.358 221.867 135.228 221.867H118.845V258.269C118.845 264.854 124.201 270.122 130.698 270.122H259.112C265.697 270.122 270.965 264.766 270.965 258.269V253.668C255.407 253.668 239.217 251.684 224.818 245.643C202.184 237.9 181.288 223.079 156.739 222.465L156.757 222.482Z"/><path d="M259.183 117.914H130.698C124.183 117.914 118.845 123.269 118.845 129.837V197.301C133.244 197.301 148.398 197.916 162.727 196.687C182.482 194.895 199.813 184.079 218.339 176.879C235.073 169.68 253.107 165.5 271.071 166.045V129.837C271.071 123.252 265.715 117.914 259.218 117.914H259.183Z"/><path d="M379.73 240.217H333.531V147.818H379.73C384.823 147.818 388.967 143.691 388.967 138.581C388.967 133.472 384.823 129.345 379.73 129.345H333.531V114.138C333.531 81.7757 307.736 55.4361 276.058 55.4361H259.622V9.23642C259.622 4.12654 255.478 0 250.385 0C245.293 0 241.149 4.12654 241.149 9.23642V55.4185H148.767V9.23642C148.767 4.12654 144.623 0 139.531 0C134.438 0 130.294 4.12654 130.294 9.23642V55.4185H113.858C82.1631 55.4185 56.3854 81.7581 56.3854 114.121V129.327H10.1506C5.05831 129.327 0.914215 133.454 0.914215 138.564C0.914215 143.674 5.05831 147.8 10.1506 147.8H56.3503V240.2H10.1506C5.05831 240.2 0.914215 244.326 0.914215 249.436C0.914215 254.546 5.05831 258.673 10.1506 258.673H56.3503V273.879C56.3503 306.242 82.1456 332.581 113.823 332.581H130.259V378.764C130.259 383.873 134.403 388 139.496 388C144.588 388 148.732 383.873 148.732 378.764V332.581H241.114V378.764C241.114 383.873 245.258 388 250.35 388C255.443 388 259.587 383.873 259.587 378.764V332.581H276.023C307.718 332.581 333.496 306.242 333.496 273.879V258.673H379.695C384.788 258.673 388.932 254.546 388.932 249.436C388.932 244.326 384.788 240.2 379.695 240.2L379.73 240.217ZM315.04 273.914C315.04 296.092 297.551 314.144 276.04 314.144H113.806C92.2951 314.144 74.8056 296.092 74.8056 273.914V114.138C74.8056 91.9604 92.2951 73.9089 113.806 73.9089H276.04C297.551 73.9089 315.04 91.9604 315.04 114.138V273.914Z"/></svg><span class="ff-nav-label">Device Agent</span></a></li>
              <li><a class="flex items-center gap-2" href="/node-red/"><UIcon name="i-heroicons-code-bracket" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Node-RED</span></a></li>
              <li><a class="flex items-center gap-2" href="/docs/user/expert/"><UIcon name="i-heroicons-sparkles" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">FlowFuse Expert</span></a></li>
              <li><a class="flex items-center gap-2" href="/integrations/"><UIcon name="i-heroicons-squares-plus" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Integrations</span></a></li>
              <li><a class="flex items-center gap-2" href="/blueprints/"><UIcon name="i-heroicons-building-library" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Blueprint Library</span></a></li>
            </ul>
            </li>
                        <li class="pl-3 title border-l-2 border-gray-200 md:col-start-3 md:row-start-1 xl:col-start-4"><span class="flex items-center gap-2"><span class="ff-nav-label">Capabilities</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-[7] ml-7 auto-rows-auto border-l-2 border-gray-200 md:col-start-3 md:row-start-2 xl:col-start-4">
              <li><a class="flex items-center gap-2" href="/ai/"><UIcon name="i-heroicons-sparkles" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Industrial AI</span></a></li>
              <li><a class="flex items-center gap-2" href="/use-cases/it-ot-middleware/"><UIcon name="i-heroicons-cog-8-tooth" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">IT/OT middleware</span></a></li>
              <li><a class="flex items-center gap-2" href="/use-cases/uns/"><svg class="ff-icon ff-icon-sm" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><g clip-path="url(#uns-clip)"><path d="M6.73302 6.74087L10.0791 10.0869M13.5048 13.5127L16.8509 16.8587M13.3056 13.3055C12.4691 14.142 11.1148 14.142 10.2783 13.3055C9.44174 12.469 9.44174 11.1147 10.2783 10.2781C11.1148 9.44162 12.4691 9.44162 13.3056 10.2781C14.1422 11.1147 14.1422 12.469 13.3056 13.3055ZM6.73302 6.7329C5.8965 7.56942 4.54214 7.56942 3.70563 6.7329C2.86911 5.89639 2.86911 4.54203 3.70563 3.70551C4.54214 2.869 5.8965 2.869 6.73302 3.70551C7.56953 4.54203 7.56953 5.89639 6.73302 6.7329ZM19.8942 19.8941C19.0577 20.7306 17.7033 20.7306 16.8668 19.8941C16.0303 19.0576 16.0303 17.7032 16.8668 16.8667C17.7033 16.0302 19.0577 16.0302 19.8942 16.8667C20.7307 17.7032 20.7307 19.0576 19.8942 19.8941Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.8731 6.74087L13.5255 10.0869M10.0903 13.5127L6.74266 16.8587M16.8651 6.7329C17.702 7.56942 19.057 7.56942 19.8939 6.7329C20.7308 5.89639 20.7308 4.54203 19.8939 3.70551C19.057 2.869 17.702 2.869 16.8651 3.70551C16.0282 4.54203 16.0282 5.89639 16.8651 6.7329ZM3.70591 19.8941C4.54281 20.7306 5.89779 20.7306 6.73469 19.8941C7.57159 19.0576 7.57159 17.7032 6.73469 16.8667C5.89779 16.0302 4.54281 16.0302 3.70591 16.8667C2.86901 17.7032 2.86901 19.0576 3.70591 19.8941Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="uns-clip"><rect width="24" height="24" fill="white"/></clipPath></defs></svg><span class="ff-nav-label">Unified Namespace</span></a></li>
              <li><a class="flex items-center gap-2" href="/use-cases/mes/"><UIcon name="i-heroicons-chart-bar-square" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">MES</span></a></li>
              <li><a class="flex items-center gap-2" href="/use-cases/scada/"><UIcon name="i-heroicons-computer-desktop" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">SCADA</span></a></li>
              <li><a class="flex items-center gap-2" href="/use-cases/edge-connectivity/"><UIcon name="i-heroicons-cpu-chip" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Edge Connectivity</span></a></li>
              <li><a class="flex items-center gap-2" href="/use-cases/data-integration/"><UIcon name="i-heroicons-arrows-right-left" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Data Integration</span></a></li>
            </ul>
            </li>
          </ul>
        </li>

        <!-- Solutions -->
        <li class="ff-nav-dropdown relative hover:cursor-pointer">
          <span class="flex items-center gap-1"><span class="ff-nav-label">Solutions</span><span class="ff-nav-chevron"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ff-icon--down"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg></span></span>
          <ul class="narrow mega md:grid md:grid-flow-col md:grid-rows-[repeat(12,auto)] md:pr-1 md:auto-rows-auto items-center">
            <li class="mega-highlight"><a :href="hl('solutions').link" class="mega-highlight-card"><span class="mega-highlight-title">{{ hl('solutions').title }}</span><span class="mega-highlight-media"><img :src="hl('solutions').image" alt="" loading="lazy"></span></a></li>
            <li class="pl-3 title border-l-2 border-gray-200 xl:col-start-2 xl:row-start-1"><span class="flex items-center gap-2"><span class="ff-nav-label">By Use Case</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-3 ml-7 auto-rows-auto border-l-2 border-gray-200 xl:col-start-2 xl:row-start-2">
              <li><a class="flex items-center gap-2" href="/use-cases/production-monitoring/"><svg class="ff-icon ff-icon-sm" fill="none" viewBox="0 0 25 22" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M23.5763 10.6008H16.6467L13.0787 20.4976L11.2007 0.704102L7.63269 10.6008H7.65143H0.703125"/></svg><span class="ff-nav-label">Production Monitoring</span></a></li>
              <li><a class="flex items-center gap-2" href="/use-cases/shop-floor-communication/"><UIcon name="i-heroicons-chat-bubble-left-right" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Shop Floor Communication</span></a></li>
              <li><a class="flex items-center gap-2" href="/use-cases/"><UIcon name="i-heroicons-arrow-small-right" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">See all use cases</span></a></li>
            </ul>
            </li>
            <li class="pl-3 title border-l-2 border-gray-200 md:col-start-2 md:row-start-1 xl:col-start-3"><span class="flex items-center gap-2"><span class="ff-nav-label">By Industry</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-[9] ml-7 auto-rows-auto border-l-2 border-gray-200 md:col-start-2 md:row-start-2 xl:col-start-3">
              <li><a class="flex items-center gap-2" href="/industries/automotive/"><svg class="ff-icon ff-icon-sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.50931 20H5.61204C6.44413 20 7.12127 19.299 7.12127 18.4375V17.3333H15.8788V18.4375C15.8788 19.299 16.5559 20 17.388 20H18.4908C19.3229 20 20 19.299 20 18.4375V11.5708C20 10.5948 19.3943 9.76563 18.5521 9.46144L17.6225 6.25104C17.2331 4.90416 16.0589 4 14.7016 4H8.12826C6.72669 4 5.50821 4.98437 5.16924 6.39168L4.4247 9.46875C3.59562 9.78125 3 10.6052 3 11.5698V18.4365C3 19.2979 3.67714 19.999 4.50923 19.999L4.50931 20ZM18.4547 18.4H17.4244V17.3333H17.8389C18.0522 17.3333 18.2585 17.299 18.4547 17.2396V18.4ZM6.66753 6.7792C6.83455 6.08544 7.43523 5.60003 8.12846 5.60003H14.7018C15.3719 5.60003 15.9514 6.04587 16.1446 6.70941L16.9042 9.33336H6.04979L6.66554 6.7792H6.66753ZM4.54555 13.8667V11.5708C4.54555 11.2187 4.82123 10.9333 5.16131 10.9333H17.8368C18.1769 10.9333 18.4526 11.2187 18.4526 11.5708V15.0959C18.4526 15.448 18.1769 15.7334 17.8368 15.7334H5.16131C4.82123 15.7334 4.54555 15.448 4.54555 15.0959V13.8667ZM4.54555 17.2395C4.74175 17.3009 4.94701 17.3332 5.16131 17.3332H5.57585V18.3999H4.54555V17.2395Z" fill="currentColor"/><path d="M8 13.5C8 15.5 5 15.5 5 13.5C5 11.5 8 11.5 8 13.5Z" fill="currentColor"/><path d="M18 13.5C18 15.5 15 15.5 15 13.5C15 11.5 18 11.5 18 13.5Z" fill="currentColor"/></svg><span class="ff-nav-label">Automotive</span></a></li>
              <li><a class="flex items-center gap-2" href="/industries/food-beverage/"><svg class="ff-icon ff-icon-sm" viewBox="0 0 512 512" fill="none"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M322 416c0 35.35-20.65 64-56 64H134c-35.35 0-56-28.65-56-64m258-80c17.67 0 32 17.91 32 40h0c0 22.09-14.33 40-32 40H64c-17.67 0-32-17.91-32-40h0c0-22.09 14.33-40 32-40"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M344 336H179.31a8 8 0 0 0-5.65 2.34l-26.83 26.83a4 4 0 0 1-5.66 0l-26.83-26.83a8 8 0 0 0-5.65-2.34H56a24 24 0 0 1-24-24h0a24 24 0 0 1 24-24h288a24 24 0 0 1 24 24h0a24 24 0 0 1-24 24ZM64 276v-.22c0-55 45-83.78 100-83.78h72c55 0 100 29 100 84v-.22M241 112l7.44 63.97"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 480h139.31a32 32 0 0 0 31.91-29.61L463 112"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m368 112l16-64l47-16"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M224 112h256"/></svg><span class="ff-nav-label">Food &amp; Beverage</span></a></li>
              <li><a class="flex items-center gap-2" href="/industries/life-sciences/"><UIcon name="i-heroicons-shield-check" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Life Sciences</span></a></li>
              <li><a class="flex items-center gap-2" href="/industries/electronics-appliances/"><UIcon name="i-heroicons-power" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Electronics &amp; Appliances</span></a></li>
              <li><a class="flex items-center gap-2" href="/industries/renewables/"><svg class="ff-icon ff-icon-sm" viewBox="0 0 24 24" fill="none" stroke-width="1.75" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#wt-clip)"><path d="M13.291 13.1598V13.1798H13.281L14.251 11.5598C14.531 11.1098 14.621 10.6198 14.531 10.1098L13.721 6.21977L13.291 4.16977C13.211 3.81977 12.971 3.57977 12.641 3.50977C12.591 3.50977 12.551 3.50977 12.501 3.50977C12.401 3.50977 12.311 3.50977 12.221 3.52977C11.891 3.59977 11.671 3.79977 11.601 4.09977L10.781 8.13977L10.401 10.0598C10.331 10.5398 10.451 11.0298 10.771 11.5198L11.781 13.0498M13.311 16.2698L14.221 17.9198C14.471 18.3798 14.851 18.7098 15.331 18.8898L19.111 20.1398L21.101 20.7898C21.441 20.8998 21.771 20.8098 22.001 20.5598C22.031 20.5198 22.051 20.4798 22.081 20.4398C22.131 20.3598 22.171 20.2698 22.201 20.1898C22.311 19.8698 22.241 19.5798 22.011 19.3698L18.921 16.6298L17.451 15.3398C17.071 15.0398 16.591 14.8998 16.011 14.9298L14.181 15.0398M10.571 15.0298L8.741 14.9198C8.161 14.8898 7.671 15.0298 7.301 15.3298L5.831 16.6198L2.741 19.3598C2.511 19.5698 2.441 19.8598 2.551 20.1798C2.591 20.2598 2.631 20.3498 2.671 20.4298C2.701 20.4698 2.721 20.5098 2.751 20.5498C2.971 20.7998 3.301 20.8798 3.651 20.7798L5.641 20.1298L9.421 18.8798C9.901 18.7098 10.281 18.3798 10.531 17.9098L11.441 16.2598" stroke="currentColor"/><path d="M12.4708 16.5099C13.3931 16.5099 14.1408 15.7622 14.1408 14.8399C14.1408 13.9176 13.3931 13.1699 12.4708 13.1699C11.5485 13.1699 10.8008 13.9176 10.8008 14.8399C10.8008 15.7622 11.5485 16.5099 12.4708 16.5099Z" stroke="currentColor"/></g><defs><clipPath id="wt-clip"><rect width="20.74" height="18.33" fill="white" transform="translate(2 3)"/></clipPath></defs></svg><span class="ff-nav-label">Renewables</span></a></li>
              <li><a class="flex items-center gap-2" href="/industries/semiconductors/"><UIcon name="i-heroicons-cpu-chip" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Semiconductors</span></a></li>
              <li><a class="flex items-center gap-2" href="/industries/aerospace-components/"><UIcon name="i-heroicons-cog-6-tooth" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Aerospace Components</span></a></li>
              <li><a class="flex items-center gap-2" href="/industries/aviation-aerospace/"><svg class="ff-icon ff-icon-sm" fill="currentColor" viewBox="0 0 256 256"><path d="M235.58,128.84,160,91.06V48a32,32,0,0,0-64,0V91.06L20.42,128.84A8,8,0,0,0,16,136v32a8,8,0,0,0,9.57,7.84L96,161.76v18.93L82.34,194.34A8,8,0,0,0,80,200v32a8,8,0,0,0,11,7.43l37-14.81,37,14.81A8,8,0,0,0,176,232V200a8,8,0,0,0-2.34-5.66L160,180.69V161.76l70.43,14.08A8,8,0,0,0,240,168V136A8,8,0,0,0,235.58,128.84ZM224,158.24l-70.43-14.08A8,8,0,0,0,144,152v32a8,8,0,0,0,2.34,5.66L160,203.31v16.87l-29-11.61a8,8,0,0,0-5.94,0L96,220.18V203.31l13.66-13.65A8,8,0,0,0,112,184V152a8,8,0,0,0-9.57-7.84L32,158.24v-17.3l75.58-37.78A8,8,0,0,0,112,96V48a16,16,0,0,1,32,0V96a8,8,0,0,0,4.42,7.16L224,140.94Z"/></svg><span class="ff-nav-label">Aviation &amp; Aerospace</span></a></li>
              <li><a class="flex items-center gap-2" href="/industries/"><UIcon name="i-heroicons-arrow-small-right" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">See all industries</span></a></li>
            </ul>
            </li>
            <li class="pl-3 title border-l-2 border-gray-200 md:col-start-3 md:row-start-1 xl:col-start-4"><span class="flex items-center gap-2"><span class="ff-nav-label">By Integration</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-[9] ml-7 auto-rows-auto border-l-2 border-gray-200 md:col-start-3 md:row-start-2 xl:col-start-4">
              <li><a class="flex items-center gap-2" href="/node-red/flowfuse/hub/redis/"><UIcon name="i-heroicons-circle-stack" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Redis</span></a></li>
              <li><a class="flex items-center gap-2" href="/node-red/flowfuse/edge/opcua/"><UIcon name="i-heroicons-server-stack" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">OPC UA</span></a></li>
              <li><a class="flex items-center gap-2" href="/node-red/flowfuse/edge/rtsp/"><UIcon name="i-heroicons-camera" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">RTSP</span></a></li>
              <li><a class="flex items-center gap-2" href="/node-red/flowfuse/edge/cip-suite/"><UIcon name="i-heroicons-share" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">EtherNet/IP</span></a></li>
              <li><a class="flex items-center gap-2" href="/node-red/flowfuse/mqtt/"><UIcon name="i-heroicons-wifi" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">MQTT</span></a></li>
              <li><a class="flex items-center gap-2" href="/node-red/flowfuse/ai/onxx/"><UIcon name="i-heroicons-cpu-chip" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">ONNX</span></a></li>
              <li><a class="flex items-center gap-2" href="/node-red/flowfuse/ai/llm-nodes/"><UIcon name="i-heroicons-sparkles" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">LLM Nodes</span></a></li>
              <li><a class="flex items-center gap-2" href="/node-red/flowfuse/mcp/"><UIcon name="i-heroicons-puzzle-piece" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">MCP</span></a></li>
              <li><a class="flex items-center gap-2" href="/integrations/"><UIcon name="i-heroicons-arrow-small-right" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">See all integrations</span></a></li>
            </ul>
            </li>
          </ul>
        </li>

        <!-- Resources -->
        <li class="ff-nav-dropdown relative hover:cursor-pointer">
          <span class="flex items-center gap-1"><span class="ff-nav-label">Resources</span><span class="ff-nav-chevron"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ff-icon--down"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg></span></span>
          <ul class="narrow mega md:grid md:grid-flow-col md:grid-rows-[repeat(5,auto)] md:pr-1 md:auto-rows-auto items-center">
            <li class="mega-highlight"><a :href="hl('resources').link" class="mega-highlight-card"><span class="mega-highlight-title">{{ hl('resources').title }}</span><span class="mega-highlight-media"><img :src="hl('resources').image" alt="" loading="lazy"></span></a></li>
            <li class="pl-3 title border-l-2 border-gray-200 xl:col-start-2 xl:row-start-1"><span class="flex items-center gap-2"><span class="ff-nav-label">Learn</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-4 ml-7 auto-rows-auto border-l-2 border-gray-200 xl:col-start-2 xl:row-start-2">
              <li><a class="flex items-center gap-2" href="/blog/"><UIcon name="i-heroicons-newspaper" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Blog</span></a></li>
              <li><a class="flex items-center gap-2" href="/webinars/"><UIcon name="i-heroicons-computer-desktop" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Webinars</span></a></li>
              <li><a class="flex items-center gap-2" href="/resources/publications/"><UIcon name="i-heroicons-book-open" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Publications</span></a></li>
              <li><a class="flex items-center gap-2" href="https://node-red-academy.learnworlds.com/"><UIcon name="i-heroicons-academic-cap" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Node-RED Academy</span></a></li>
            </ul>
            </li>
            <li class="pl-3 title border-l-2 border-gray-200 md:col-start-2 md:row-start-1 xl:col-start-3"><span class="flex items-center gap-2"><span class="ff-nav-label">Reference</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-4 ml-7 auto-rows-auto border-l-2 border-gray-200 md:col-start-2 md:row-start-2 xl:col-start-3">
              <li><a class="flex items-center gap-2" href="/docs/"><UIcon name="i-heroicons-document-text" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Docs</span></a></li>
              <li><a class="flex items-center gap-2" href="/changelog/"><UIcon name="i-heroicons-rocket-launch" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Changelog</span></a></li>
              <li><a class="flex items-center gap-2" href="https://github.com/FlowFuse/flowfuse"><svg class="ff-icon ff-icon-sm" viewBox="0 0 24 24" fill="currentColor"><path d="m12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg><span class="ff-nav-label">Github</span></a></li>
              <li><a class="flex items-center gap-2" href="https://discourse.nodered.org/c/vendors/flowfuse/24/"><UIcon name="i-heroicons-chat-bubble-left-right" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Support forums</span></a></li>
            </ul>
            </li>
            <li class="pl-3 title border-l-2 border-gray-200 md:col-start-3 md:row-start-1 xl:col-start-4"><span class="flex items-center gap-2"><span class="ff-nav-label">Customers</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-2 ml-7 auto-rows-auto border-l-2 border-gray-200 md:col-start-3 md:row-start-2 xl:col-start-4">
              <li><a class="flex items-center gap-2" href="/customer-stories/"><UIcon name="i-heroicons-presentation-chart-bar" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Customer Stories</span></a></li>
            </ul>
            </li>
          </ul>
        </li>

        <!-- Company -->
        <li class="ff-nav-dropdown relative hover:cursor-pointer">
          <span class="flex items-center gap-1"><span class="ff-nav-label">Company</span><span class="ff-nav-chevron"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ff-icon--down"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg></span></span>
          <ul class="narrow mega md:grid md:grid-flow-col md:grid-rows-[repeat(6,auto)] md:pr-1 md:auto-rows-auto items-center">
            <li class="mega-highlight"><a :href="hl('company').link" class="mega-highlight-card"><span class="mega-highlight-title">{{ hl('company').title }}</span><span class="mega-highlight-media"><img :src="hl('company').image" alt="" loading="lazy"></span></a></li>
            <li class="pl-3 title border-l-2 border-gray-200 xl:col-start-2 xl:row-start-1"><span class="flex items-center gap-2"><span class="ff-nav-label">Company</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-5 ml-7 auto-rows-auto border-l-2 border-gray-200 xl:col-start-2 xl:row-start-2">
              <li><a class="flex items-center gap-2" href="/platform/why-flowfuse/"><svg class="ff-icon ff-icon-sm" viewBox="0 0 20 20" fill="currentColor"><path d="M1.59385 0.00234319C0.712771 0.00234319 0.00377529 0.711833 0.00377529 1.5929C0.00246514 4.50292 0.000461073 7.41546 0 10.3255C1.88965 10.3367 3.78181 10.3802 5.66642 10.2453C8.29428 10.0057 10.6072 8.59451 13.0285 7.66784C15.231 6.73638 17.5964 6.17101 19.9975 6.2214L19.9972 1.59056C19.9982 0.709238 19.288 0 18.4072 0L1.59385 0.00234319ZM19.999 9.37235C19.7332 9.37661 19.4671 9.38387 19.2013 9.39475C16.2686 9.38346 13.6684 10.8999 11.0229 11.9621C13.0675 12.7893 15.0416 13.8402 17.2084 14.3277C18.1343 14.4682 19.0658 14.5366 20 14.5566L19.999 9.37235ZM2.0776 13.5472C1.38548 13.5487 0.693371 13.5559 0.00176078 13.5594C0.00236546 15.1759 0.00357496 16.7919 0.00618771 18.4094C0.00711994 19.2908 0.715434 20 1.59626 20H18.4091C19.2901 20 19.9991 19.2905 19.9991 18.4094V17.7095C17.9324 17.696 15.8671 17.381 13.9422 16.6075C10.9641 15.5685 8.18508 13.7227 4.95252 13.5992C3.99561 13.554 3.03718 13.5451 2.07774 13.5473L2.0776 13.5472Z"/></svg><span class="ff-nav-label">Why FlowFuse</span></a></li>
              <li><a class="flex items-center gap-2" href="/about/"><UIcon name="i-heroicons-building-office-2" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">About us</span></a></li>
              <li><a class="flex items-center gap-2" href="https://boards.greenhouse.io/flowfuse"><UIcon name="i-heroicons-briefcase" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Jobs</span></a></li>
              <li><a class="flex items-center gap-2" href="/handbook/"><UIcon name="i-heroicons-book-open" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Handbook</span></a></li>
              <li><a class="flex items-center gap-2" href="/platform/security/#certifications"><svg class="ff-icon ff-icon-sm" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path d="M9.25 4.75H11.87C12.77 4.75 13.62 5.11 14.26 5.74C14.89 6.37 15.25 7.23 15.25 8.13V9.63C15.25 9.93 15.37 10.21 15.58 10.43C15.79 10.64 16.08 10.76 16.38 10.76H17.88C18.78 10.76 19.63 11.12 20.27 11.75C20.9 12.38 21.26 13.24 21.26 14.14V16.02" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 11.5H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 8H11.64" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 14.8599H11.64" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.2517 13.7498V18.6298C21.2517 19.2498 20.7517 19.7498 20.1317 19.7498H2.88172C2.26172 19.7498 1.76172 19.2498 1.76172 18.6298V5.87977C1.76172 5.25977 2.26172 4.75977 2.88172 4.75977H12.2617C14.6517 4.75977 16.9417 5.70977 18.6217 7.39977C20.3117 9.08977 21.2617 11.3798 21.2617 13.7598L21.2517 13.7498Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.3994 15.1602C18.2994 15.0402 18.2294 14.8902 18.2194 14.7202C18.1994 14.5402 18.1194 14.3702 17.9994 14.2402C17.8794 14.1102 17.7094 14.0302 17.5194 14.0202C17.3594 14.0002 17.2094 13.9402 17.0794 13.8402C16.9494 13.7202 16.7694 13.6602 16.5894 13.6602C16.4094 13.6602 16.2294 13.7202 16.0994 13.8402C15.9794 13.9402 15.8294 14.0102 15.6694 14.0202C15.4894 14.0402 15.3194 14.1202 15.1894 14.2402C15.0594 14.3602 14.9794 14.5302 14.9694 14.7202C14.9494 14.8802 14.8894 15.0302 14.7894 15.1602C14.6694 15.2902 14.6094 15.4702 14.6094 15.6502C14.6094 15.8302 14.6694 16.0102 14.7894 16.1402C14.8894 16.2602 14.9594 16.4102 14.9694 16.5702C14.9894 16.7502 15.0694 16.9202 15.1894 17.0502C15.3094 17.1802 15.4794 17.2602 15.6694 17.2702C15.8294 17.2902 15.9794 17.3502 16.0994 17.4502C16.2294 17.5702 16.4094 17.6302 16.5894 17.6302C16.7694 17.6302 16.9494 17.5702 17.0794 17.4502C17.1994 17.3502 17.3494 17.2802 17.5194 17.2702C17.6994 17.2502 17.8694 17.1702 17.9994 17.0502C18.1294 16.9302 18.2094 16.7602 18.2194 16.5702C18.2394 16.4102 18.2994 16.2602 18.3994 16.1402C18.5194 16.0102 18.5794 15.8302 18.5794 15.6502C18.5794 15.4702 18.5194 15.2902 18.3994 15.1602Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="ff-nav-label">Security certifications</span></a></li>
            </ul>
            </li>
            <li class="pl-3 title border-l-2 border-gray-200 md:col-start-2 md:row-start-1 xl:col-start-3"><span class="flex items-center gap-2"><span class="ff-nav-label">Partners &amp; Services</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-2 ml-7 auto-rows-auto border-l-2 border-gray-200 md:col-start-2 md:row-start-2 xl:col-start-3">
              <li><a class="flex items-center gap-2" href="/partners/"><UIcon name="i-heroicons-user-group" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Partnerships</span></a></li>
              <li><a class="flex items-center gap-2" href="/professional-services/"><UIcon name="i-heroicons-wrench-screwdriver" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Professional Services</span></a></li>
            </ul>
            </li>
            <li class="pl-3 title border-l-2 border-gray-200 md:col-start-3 md:row-start-1 xl:col-start-4"><span class="flex items-center gap-2"><span class="ff-nav-label">Support</span></span></li>
            <li class="contents">
            <ul class="sub-menu grid grid-rows-subgrid row-span-3 ml-7 auto-rows-auto border-l-2 border-gray-200 md:col-start-3 md:row-start-2 xl:col-start-4">
              <li><a class="flex items-center gap-2" href="https://status.flowfuse.com/"><UIcon name="i-heroicons-check-badge" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Service Status</span></a></li>
              <li><a class="flex items-center gap-2" href="/support/"><UIcon name="i-heroicons-lifebuoy" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Request Support</span></a></li>
              <li><a class="flex items-center gap-2" href="/contact-us/"><UIcon name="i-heroicons-envelope" class="ff-icon ff-icon-sm" /><span class="ff-nav-label">Contact Us</span></a></li>
            </ul>
            </li>
          </ul>
        </li>

        <!-- Direct links -->
        <li class="nav-collapsible"><a class="flex items-center gap-2" href="/ai/"><span class="ff-nav-label">Industrial AI</span></a></li>
        <li class="nav-collapsible"><a class="flex items-center gap-2" href="/pricing/"><span class="ff-nav-label">Pricing</span></a></li>

        <!-- More overflow (populated by JS) -->
        <li id="nav-more" class="ff-nav-dropdown relative hover:cursor-pointer" style="display:none">
          <span class="flex items-center gap-1"><span class="ff-nav-label">More</span><span class="ff-nav-chevron"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ff-icon--down"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg></span></span>
          <ul id="nav-more-list" class="align-left"></ul>
        </li>
      </ul>

      <!-- Desktop CTAs -->
      <ul class="cta hidden md:flex flex-row items-center justify-end font-medium text no-underline z-10 bg-transparent w-auto">
        <li class="hidden md:flex"><a class="ff-nav-freetrial" href="https://app.flowfuse.com/account/create" onclick="capture('cta-join', {'position': 'header'})"><span class="ff-nav-label">Free Trial</span></a></li>
        <li class="flex">
          <a class="ml-2 ff-btn ff-btn--primary uppercase text-sm inline-flex whitespace-nowrap" href="/contact-us" onclick="capture('cta-talk-us', {'position': 'header'})">Contact Us</a>
        </li>
      </ul>
    </nav>

    <!-- Mobile CTAs -->
    <div id="mobile-ctas" class="hidden fixed bottom-0 z-20">
      <div class="grid grid-cols-2 gap-2">
        <a href="https://app.flowfuse.com" class="ff-btn ff-btn--primary-outlined">Sign In</a>
        <a href="https://app.flowfuse.com/account/create" onclick="capture('cta-join', {'position': 'header'})" class="ff-btn ff-btn--primary-outlined">Free Trial</a>
      </div>
      <a class="ff-btn ff-btn--primary" href="/contact-us" onclick="capture('cta-talk-to-sales', {'position': 'header'})">Contact Us</a>
    </div>
  </header>
</template>
