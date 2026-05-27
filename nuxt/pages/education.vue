<script setup>
const scrollToAnchor = (event, id) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
useHead({
    title: 'FlowFuse for Education • FlowFuse',
    meta: [
        { name: 'description', content: 'FlowFuse offers a comprehensive suite of tools and resources for educational institutions, students, and educators to accelerate learning, teaching, and research in Node-RED and industrial automation.' },
    ],
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="nohero w-full">
        <div class="w-full pt-12 md:pt-6">
          <div class="md:max-w-screen-lg px-6 container mx-auto pb-20">
            <div class="flex flex-col my-16 items-center md:flex-row md:items-start text-center md:text-left gap-8">
              <div class="md:my-auto md:w-2/3">
                <h1 class="mt-0 mb-10 mx-auto">FlowFuse <span class="text-indigo-600 inline-block">for Education</span></h1>
                <p>FlowFuse is your partner in teaching engineering, IoT, development, OT/IT integration, and automation to your students. FlowFuse offers a comprehensive suite of tools and resources for accredited educational institutions to accelerate learning, teaching, and research in Node-RED and industrial automation.</p>
                <p class="mb-12">Instructors and educational administrators are invited to contact us for an educational license, which will supply you and your students with 5 free months of FlowFuse Cloud Starter. </p>
                <div class="m-auto lg:mt-3 flex gap-4 items-center justify-center md:items-start md:justify-start md:m-0 flex-row">
                  <a class="ff-btn ff-btn--primary flex flex-col max-xl:mb-6" href="#contact-us" @click="scrollToAnchor($event, 'contact-us')">
                    <span class="text-base uppercase items-center">CONTACT US</span>
                  </a>
                </div>
              </div>
              <div class="md:max-w-[369px] m-auto rounded-xl ff-image-cover h-full aspect-video md:aspect-[369/427]">
                <img src="/images/education/education_hero.jpg" alt="Node-RED pseudo UI" style="max-width:369px" />
              </div>
            </div>
            <div id="contact-us" class="grid grid-cols-1 md:grid-cols-4 border-2 border-indigo-200 ff-image-cover rounded-xl mt-20">
              <div class="max-md:hidden">
                <img src="/images/education/education_form.jpg" alt="Node-RED pseudo UI" style="max-width:369px" />
              </div>
              <div class="p-8 pb-4 md:col-span-3">
                <HubSpotForm form-id="48a92e16-8e5c-4bb6-aaee-ed0dfec0174d" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
