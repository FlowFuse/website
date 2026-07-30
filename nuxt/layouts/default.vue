<template>
  <div class="font-sans ff-website leading-normal tracking-normal gradient text-gray-500 min-h-screen flex flex-col">
    <a href="#main-content" class="skip-to-main">Skip to main content</a>
    <!-- The utility bar and header sit outside the .base wrapper on purpose. Nested
         inside it, the header's sticky containing block ends at the main content, so
         the footer scrolls it away instead of pinning it. Matches base.njk. -->
    <AppUtilityBar />
    <AppHeader />
    <div class="flex-grow base">
      <div class="w-full">
        <main id="main-content" class="flex flex-col mx-auto items-center justify-center gradient-bg">
          <slot />
        </main>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
