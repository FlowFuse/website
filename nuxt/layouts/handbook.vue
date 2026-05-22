<template>
  <div class="font-sans ff-website leading-normal tracking-normal gradient text-gray-500 min-h-screen flex flex-col">
    <a href="#main-content" class="skip-to-main">Skip to main content</a>
    <div class="flex-grow base">
      <div class="w-full">
        <AppHeader />
        <main id="main-content">
          <slot />
        </main>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
