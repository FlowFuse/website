<script setup>
import teamData from '../team.json'

const team = teamData.team
const JOB_BOARD = 'https://boards.greenhouse.io/flowfuse'

const values = [
    { img: '/images/pictograms/results_blue.png', alt: 'Icon representing Results', title: 'Results' },
    { img: '/images/pictograms/iteration_blue.png', alt: 'Icon representing Iterative Improvement', title: 'Iterative Improvement' },
    { img: '/images/pictograms/community_blue.png', alt: 'Icon representing Collaborative Community', title: 'Collaborative Community' },
    { img: '/images/pictograms/candor_blue.png', alt: 'Icon representing Constructive Candor', title: 'Constructive Candor' },
    { img: '/images/pictograms/trusting_blue.png', alt: 'Icon representing Customer Empathy', title: 'Customer Empathy' },
]
const benefits = [
    { img: '/images/pictograms/remote_blue.png', alt: 'Icon representing Fully Remote', title: 'Fully Remote' },
    { img: '/images/pictograms/vacation_blue.png', alt: 'Icon representing Unlimited Vacation', title: 'Unlimited Vacation' },
    { img: '/images/pictograms/time_blue.png', alt: 'Icon representing Flexible Hours', title: 'Flexible Hours' },
    { img: '/images/pictograms/education_blue.png', alt: 'Icon representing Education Budget', title: 'Education Budget' },
    { img: '/images/pictograms/equipment_blue.png', alt: 'Icon representing Equipment', title: 'Equipment' },
    { img: '/images/pictograms/parental_leave_blue.png', alt: 'Icon representing Paid Parental Leave', title: 'Paid Parental Leave' },
]

useHead({
    title: 'About • FlowFuse',
    meta: [{ name: 'description', content: 'FlowFuse provides a complete platform for building, scaling and securing your production Node-RED applications. Accelerate digitalization of your industrial processes with ease.' }],
})
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
                <p><span class="font-medium">FlowFuse</span> was founded in 2021 by <span class="font-medium">Nick O’Leary, <span class="inline-block">co-creator</span> of Node-RED</span>, a renowned open-source development tool. Nick saw the potential to make <span class="inline-block">Node-RED</span> a powerful solution for industrial enterprises and FlowFuse was created to elevate Node-RED through a secure and scalable platform.</p>
                <p><span class="font-medium">FlowFuse seamlessly integrates into existing industrial environments,</span> offering an adaptable foundation for building bespoke applications. Our customers rely on FlowFuse to develop innovative applications that modernize their industrial operations creating the opportunity to improve their processes continuously.</p>
              </div>
              <div class="md:w-1/2 m-auto max-w-[370px] md:max-w-none">
                <img src="/images/about/about.png" alt="FlowFuse hosting Node-RED connected to many devices" style="max-width:440px" />
              </div>
            </div>
          </div>
        </div>
        <div class="about w-full">
          <div class="container m-auto max-w-xl md:max-w-4xl pt-10 pb-12 px-6">
            <div class="pb-6 md:pb-0 flex flex-col md:flex-row gap-3 md:gap-1">
              <div class="md:w-[28%] md:mt-4 flex flex-row gap-3">
                <div class="w-[42px]"><img src="/images/node-red-hexagon.png" alt="Node-RED Logo" style="max-width:42px" /></div>
                <h2 class="mt-3 text-[1.4rem] leading-[1.9rem]"><span class="inline-block text-red-700">Node-RED</span></h2>
              </div>
              <p class="md:w-[72%] text-justify"><span class="font-medium">We are deeply committed to the success of the Node-RED open source project</span>. FlowFuse dedicates significant resources to improving the core technology of the project and fostering the growth of the Node-RED community. </p>
            </div>
            <div class="pb-6 md:pb-0 flex flex-col md:flex-row gap-3 md:gap-1 pt-6 md:pt-3">
              <div class="md:w-[28%] md:mt-4 flex flex-row gap-3">
                <div class="w-[42px]"><img src="/images/pictograms/opensource_red.png" alt="Open Source Logo" style="max-width:42px" /></div>
                <h2 class="mt-2 text-[1.4rem] leading-[1.9rem]"><span class="inline-block text-red-700">Open Source</span></h2>
              </div>
              <div class="md:w-[72%] text-justify">
                <p>We believe strongly that <span class="font-medium">Open Source is the heart of everything we do</span> influencing not just our contributions to Node-RED but also the development of FlowFuse. We strive to be good Open Source citizens and to empower the community to get involved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="team w-full pb-20 pt-12 px-6">
        <div class="container m-auto text-center max-w-xl md:max-w-4xl mb-10"><h2>Meet the Team</h2></div>
        <div class="container m-auto text-left max-w-4xl">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div v-for="member in team" :id="member.slug" :key="member.slug" class="team-headshot w-full max-w-xs m-auto">
              <img :src="`/images/team/headshot-${member.headshot}`" :alt="`Photo of ${member.name}`" style="max-width:256px" />
              <ul class="member-facts">
                <li v-for="(fact, i) in member.facts" :key="i" v-html="fact" />
              </ul>
              <div class="member-info">
                <div class="title">
                  <div class="name">{{ member.name }}</div>
                  <div class="role">{{ member.title }}</div>
                </div>
                <div class="socials">
                  <span v-if="member.email"><a :href="`mailto:${member.email}`" :aria-label="`Email ${member.name}`"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg></a></span>
                  <span v-if="member.twitter"><a target="_blank" :href="`https://twitter.com/${member.twitter}`" :aria-label="`${member.name} on Twitter`"><svg class="fill-current hover:text-red-hero h-5" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2011 7.14188L16.2071 0H14.7839L9.5689 6.2012L5.40369 0H0.599609L6.89822 9.37731L0.599609 16.8667H2.02292L7.5301 10.318L11.9289 16.8667H16.7329L10.2008 7.14188H10.2011ZM8.25172 9.45992L7.61354 8.52616L2.53576 1.09606H4.72188L8.8197 7.09238L9.45788 8.02615L14.7846 15.8205H12.5985L8.25172 9.46028V9.45992Z"/></svg></a></span>
                  <span v-if="member.github"><a target="_blank" :href="`https://github.com/${member.github}`" :aria-label="`${member.name} on GitHub`"><svg class="fill-current hover:text-red-hero h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a></span>
                  <span v-if="member.linkedin"><a target="_blank" :href="`https://www.linkedin.com/in/${member.linkedin}`" :aria-label="`${member.name} on LinkedIn`"><svg class="fill-current h-5 hover:text-red-hero" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"/></svg></a></span>
                  <span v-if="member.blog"><a target="_blank" :href="member.blog" :aria-label="`${member.name}'s blog`"><svg class="fill-current hover:text-red-hero" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/></svg></a></span>
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
            <p class="text-justify">As a remote-only company, FlowFuse seeks and fosters talent from Europe, North America, and Asia. Our <a href="/handbook/company/values/" class="underline">corporate values</a> encourage our team to continuously iterate using constructive candor to prioritize customer empathy.</p>
          </div>
          <div class="flex flex-wrap justify-center mt-12 md:mt-20">
            <div v-for="v in values" :key="v.title" class="company-value">
              <img :src="v.img" :alt="v.alt" style="max-width:128px" />
              <h3>{{ v.title }}</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="about w-full px-6 py-14">
        <div class="container m-auto p-10 text-center max-w-xl md:max-w-4xl rounded-lg bg-white drop-shadow-lg">
          <h2 class="mb-4">Our Investors</h2>
          <div class="investors mt-12 m-auto md:hidden">
            <div class="logos">
              <img src="/images/about/investors/opencore.png" alt="Open Core Ventures Logo" style="max-width:280px" />
              <img src="/images/about/investors/cota-capital.png" alt="Cota Capital Logo" style="max-width:200px" />
            </div>
            <div class="logos">
              <img src="/images/about/investors/westwave.png" alt="Westwave Capital Logo" style="max-width:215px" />
              <img src="/images/about/investors/uncorrelated.png" alt="Uncorrelated Logo" style="max-width:190px" />
            </div>
          </div>
          <div class="investors mt-12 hidden m-auto md:block">
            <div class="logos">
              <img src="/images/about/investors/opencore.png" alt="Open Core Ventures Logo" style="max-width:238px" />
              <img src="/images/about/investors/cota-capital.png" alt="Cota Capital Logo" style="max-width:170px" />
              <img src="/images/about/investors/westwave.png" alt="Westwave Capital Logo" style="max-width:184px" />
              <img src="/images/about/investors/uncorrelated.png" alt="Uncorrelated Logo" style="max-width:152px" />
            </div>
          </div>
        </div>
      </div>

      <div class="about w-full bg-gray-50 px-6 pt-12 pb-12 md:pt-20 md:px-0">
        <div class="container m-auto text-center max-w-4xl">
          <div>
            <h2 class="mb-4">Working at FlowFuse</h2>
            <p>Here are just some of the benefits enjoyed by our employees. We are always looking to improve and expand these too. You can read more about them in our <a href="/handbook/peopleops/" class="underline">Handbook.</a></p>
          </div>
          <div class="flex flex-wrap justify-center mt-12 md:mt-20">
            <div v-for="b in benefits" :key="b.title" class="company-value">
              <img :src="b.img" :alt="b.alt" style="max-width:128px" />
              <h3>{{ b.title }}</h3>
            </div>
          </div>
          <p class="mt-8">Interested in joining FlowFuse? Check out our <a :href="JOB_BOARD" class="underline">Jobs</a> page for our current openings.</p>
        </div>
      </div>
    </div>
  </div>
</template>
