<script setup lang="ts">
// Ported from src/about.njk (11ty), which this replaces. Same page, same copy, same
// classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The team grid read the `team` global and sorted by `order`. It uses useStaff(), the
//    same files, which is the team/ directory only: useTeam() also merges guests/, whose
//    former-staff entries still carry an `order`.
//  - The social glyphs were {% include %}d partials; components/icons/ already has Vue
//    components for GitHub, LinkedIn and Twitter, so those are reused. The mail and RSS
//    links use <UIcon>.
//  - values.njk and benefits.njk each had exactly one caller, this page, so they are the
//    two const grids below rather than components.
//  - The frontmatter's `meta.organization` block was rendered by jsonld.njk as a
//    hand-built JSON string. It goes through useSchemaOrg, which escapes properly.
//  - Production renders a second, empty <h1> from layouts/page.njk's `nohero` branch,
//    because the page sets no `title`. Only the real heading survives.
const team = useStaff()

const members = computed(() =>
    Object.values(team)
        .filter(member => typeof member.order === 'number')
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
)

const VALUES = [
    { image: '/images/pictograms/results_blue.png', alt: 'Icon representing Results', title: 'Results' },
    { image: '/images/pictograms/iteration_blue.png', alt: 'Icon representing Iterative Improvement', title: 'Iterative Improvement' },
    { image: '/images/pictograms/community_blue.png', alt: 'Icon representing Collaborative Community', title: 'Collaborative Community' },
    { image: '/images/pictograms/candor_blue.png', alt: 'Icon representing Constructive Candor', title: 'Constructive Candor' },
    { image: '/images/pictograms/trusting_blue.png', alt: 'Icon representing Customer Empathy', title: 'Customer Empathy' },
]

const BENEFITS = [
    { image: '/images/pictograms/remote_blue.png', alt: 'Icon representing Fully Remote', title: 'Fully Remote' },
    { image: '/images/pictograms/vacation_blue.png', alt: 'Icon representing Unlimited Vacation', title: 'Unlimited Vacation' },
    { image: '/images/pictograms/time_blue.png', alt: 'Icon representing Flexible Hours', title: 'Flexible Hours' },
    { image: '/images/pictograms/education_blue.png', alt: 'Icon representing Education Budget', title: 'Education Budget' },
    { image: '/images/pictograms/equipment_blue.png', alt: 'Icon representing Equipment', title: 'Equipment' },
    { image: '/images/pictograms/parental_leave_blue.png', alt: 'Icon representing Paid Parental Leave', title: 'Paid Parental Leave' },
]

const INVESTORS = [
    { image: '/images/about/investors/opencore.png', alt: 'Open Core Ventures Logo', mobileWidth: 280, width: 238 },
    { image: '/images/about/investors/cota-capital.png', alt: 'Cota Capital Logo', mobileWidth: 200, width: 170 },
    { image: '/images/about/investors/westwave.png', alt: 'Westwave Capital Logo', mobileWidth: 215, width: 184 },
    { image: '/images/about/investors/uncorrelated.png', alt: 'Uncorrelated Logo', mobileWidth: 190, width: 152 },
]

const JOB_BOARD = 'https://boards.greenhouse.io/flowfuse'

const META_DESCRIPTION = 'FlowFuse provides a complete platform for building, scaling and securing your production Node-RED applications. Accelerate digitalization of your industrial processes with ease.'

useSeoMeta({
    title: 'About',
    description: META_DESCRIPTION,
    ogDescription: META_DESCRIPTION,
    ogUrl: 'https://flowfuse.com/about/',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineOrganization({
        name: 'FlowFuse',
        legalName: 'FlowFuse Inc',
        url: 'https://www.flowfuse.com',
        description: META_DESCRIPTION,
        logo: {
            url: 'https://flowfuse.com/handbook/images/logos/ff-logo--square--dark.png',
            width: 396,
            height: 215,
        },
        foundingDate: '2021',
        founder: [{ name: "Nick O'Leary" }],
        address: {
            streetAddress: '548 Market Street PO Box 7775 #29439',
            addressLocality: 'San Francisco',
            addressRegion: 'CA',
            postalCode: '94120',
            addressCountry: 'US',
        },
        sameAs: [
            'https://www.linkedin.com/company/flowfuse',
            'https://www.facebook.com/FlowFuse/',
            'https://twitter.com/flowfuseinc',
            'https://github.com/FlowFuse',
            'https://www.youtube.com/channel/UCbBzP8NZbv3WDtlt4UouA-g',
        ],
    }),
])
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="about w-full px-6">
        <div class="w-full pt-12 pb-16 md:pb-10 md:pt-12 flex flex-col items-center">
          <div class="container text-center max-w-xl md:max-w-4xl">
            <h1>About FlowFuse</h1>
            <div class="flex flex-col md:flex-row gap-8 items-center mt-10">
              <div class="md:w-1/2 text-left my-auto">
                <p>
                  <span class="font-medium">FlowFuse</span> was founded in 2021 by <span class="font-medium">Nick
                  O’Leary, <span class="inline-block">co-creator</span> of Node-RED</span>, a renowned open-source
                  development tool. Nick saw the potential to make <span class="inline-block">Node-RED</span> a powerful
                  solution for industrial enterprises and FlowFuse was created to elevate Node-RED through a secure and
                  scalable platform.
                </p>
                <p>
                  <span class="font-medium">FlowFuse seamlessly integrates into existing industrial environments,</span>
                  offering an adaptable foundation for building bespoke applications. Our customers rely on FlowFuse to
                  develop innovative applications that modernize their industrial operations creating the opportunity to
                  improve their processes continuously.
                </p>
                <p>
                  <NuxtLink to="/platform/security/#certifications" class="text-indigo-600 hover:text-indigo-800 font-medium">See our security certifications</NuxtLink>
                </p>
              </div>
              <div class="md:w-1/2 m-auto max-w-[370px] md:max-w-none">
                <img src="/images/about/about.png" alt="FlowFuse hosting Node-RED connected to many devices" width="440" class="w-full h-auto">
              </div>
            </div>
          </div>
        </div>

        <div class="about w-full">
          <div class="container m-auto max-w-xl md:max-w-4xl pt-10 pb-12 px-6">
            <div class="pb-6 md:pb-0 flex flex-col md:flex-row gap-3 md:gap-1">
              <div class="md:w-[28%] md:mt-4 flex flex-row gap-3">
                <div class="w-[42px]">
                  <img src="/images/node-red-hexagon.png" alt="Node-RED Logo" width="42" class="w-full h-auto">
                </div>
                <h2 class="mt-3 text-[1.4rem] leading-[1.9rem]"><span class="inline-block text-red-700">Node-RED</span></h2>
              </div>
              <p class="md:w-[72%] text-justify">
                <span class="font-medium">We are deeply committed to the success of the Node-RED open
                source project</span>. FlowFuse dedicates significant resources to improving the core technology of the
                project and fostering the growth of the Node-RED community.
              </p>
            </div>
            <div class="pb-6 md:pb-0 flex flex-col md:flex-row gap-3 md:gap-1 pt-6 md:pt-3">
              <div class="md:w-[28%] md:mt-4 flex flex-row gap-3">
                <div class="w-[42px]">
                  <img src="/images/pictograms/opensource_red.png" alt="Open Source Logo" width="42" class="w-full h-auto">
                </div>
                <h2 class="mt-2 text-[1.4rem] leading-[1.9rem]"><span class="inline-block text-red-700">Open Source</span></h2>
              </div>
              <div class="md:w-[72%] text-justify">
                <p>
                  We believe strongly that <span class="font-medium">Open Source is the heart of everything we
                  do</span> influencing not just our contributions to Node-RED but also the development of FlowFuse. We
                  strive to be good Open Source citizens and to empower the community to get involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="team w-full pb-20 pt-12 px-6">
        <div class="container m-auto text-center max-w-xl md:max-w-4xl mb-10">
          <h2>Meet the Team</h2>
        </div>
        <div class="container m-auto text-left max-w-4xl">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div v-for="member in members" :id="member.slug" :key="member.slug" class="team-headshot w-full max-w-xs m-auto">
              <img :src="`/images/team/headshot-${member.headshot}`" :alt="`Photo of ${member.name}`" width="256" loading="lazy" class="w-full h-auto">
              <ul class="member-facts">
                <li v-for="fact in member.facts" :key="fact">{{ fact }}</li>
              </ul>
              <div class="member-info">
                <div class="title">
                  <div class="name">{{ member.name }}</div>
                  <div class="role">{{ member.title }}</div>
                </div>
                <!-- Each link keeps its <span> wrapper: style.page.css spaces and colours
                     the icons through `.team .socials span`, so a bare <a> renders them
                     jammed together in the browser's default link colour. -->
                <div class="socials">
                  <span v-if="member.email">
                    <a :href="`mailto:${member.email}`" :aria-label="`Email ${member.name}`">
                      <UIcon name="i-lucide-mail" class="w-5 h-5" />
                    </a>
                  </span>
                  <span v-if="member.twitter">
                    <a target="_blank" rel="noopener" :href="`https://twitter.com/${member.twitter}`" :aria-label="`${member.name} on Twitter`">
                      <IconsTwitterIcon class="w-5 h-5" />
                    </a>
                  </span>
                  <span v-if="member.github">
                    <a target="_blank" rel="noopener" :href="`https://github.com/${member.github}`" :aria-label="`${member.name} on GitHub`">
                      <IconsGithubIcon class="w-5 h-5" />
                    </a>
                  </span>
                  <span v-if="member.linkedin">
                    <a target="_blank" rel="noopener" :href="`https://www.linkedin.com/in/${member.linkedin}`" :aria-label="`${member.name} on LinkedIn`">
                      <IconsLinkedinIcon class="w-5 h-5" />
                    </a>
                  </span>
                  <span v-if="member.blog">
                    <a target="_blank" rel="noopener" :href="member.blog" :aria-label="`${member.name}'s blog`">
                      <UIcon name="i-lucide-rss" class="w-5 h-5" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="about w-full bg-gray-50 px-6 pt-12 pb-6 md:pt-12 md:pb-6">
        <div class="container about-values m-auto max-w-xl md:max-w-4xl px-0 sm:px-6 md:px-0">
          <div>
            <h2 class="mb-10 text-center">Corporate Values</h2>
            <p class="text-justify">
              As a remote-only company, FlowFuse seeks and fosters talent from Europe, North America, and Asia. Our
              <NuxtLink to="/handbook/company/values/" class="underline">corporate values</NuxtLink> encourage our team
              to continuously iterate using constructive candor to prioritize customer empathy.
            </p>
          </div>
          <div class="flex flex-wrap justify-center mt-12 md:mt-20">
            <div v-for="value in VALUES" :key="value.title" class="company-value">
              <img :src="value.image" :alt="value.alt" width="128" loading="lazy" class="w-full h-auto">
              <h3>{{ value.title }}</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="about w-full px-6 py-14">
        <div class="container m-auto p-10 text-center max-w-xl md:max-w-4xl rounded-lg bg-white drop-shadow-lg">
          <h2 class="mb-4">Our Investors</h2>
          <div class="investors mt-12 m-auto md:hidden">
            <div class="logos">
              <img v-for="i in INVESTORS.slice(0, 2)" :key="i.image" :src="i.image" :alt="i.alt" :width="i.mobileWidth" class="w-full h-auto">
            </div>
            <div class="logos">
              <img v-for="i in INVESTORS.slice(2)" :key="i.image" :src="i.image" :alt="i.alt" :width="i.mobileWidth" class="w-full h-auto">
            </div>
          </div>
          <div class="investors mt-12 hidden m-auto md:block">
            <div class="logos">
              <img v-for="i in INVESTORS" :key="i.image" :src="i.image" :alt="i.alt" :width="i.width" class="w-full h-auto">
            </div>
          </div>
        </div>
      </div>

      <div class="about w-full bg-gray-50 px-6 pt-12 pb-12 md:pt-20 md:px-0">
        <div class="container m-auto text-center max-w-4xl">
          <div>
            <h2 class="mb-4">Working at FlowFuse</h2>
            <p>
              Here are just some of the benefits enjoyed by our employees. We are always looking to improve and expand
              these too. You can read more about them in our
              <NuxtLink to="/handbook/peopleops/" class="underline">Handbook.</NuxtLink>
            </p>
          </div>
          <div class="flex flex-wrap justify-center mt-12 md:mt-20">
            <div v-for="benefit in BENEFITS" :key="benefit.title" class="company-value">
              <img :src="benefit.image" :alt="benefit.alt" width="128" loading="lazy" class="w-full h-auto">
              <h3>{{ benefit.title }}</h3>
            </div>
          </div>
          <p class="mt-8">
            Interested in joining FlowFuse? Check out our
            <a :href="JOB_BOARD" class="underline">Jobs</a> page for our current openings.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
