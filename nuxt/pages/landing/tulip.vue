<script setup>
import indexData from '../../customer-stories.index.json'

const heroTitle = "<span class='text-indigo-600'>Get ALL Your Data</span> into Your MES"
const metaTitle = 'Get ALL Your Data into Your MES'
const metaDescription = 'Tulip is only as powerful as the data you feed it. FlowFuse connects legacy machines, edge devices, ERPs, and any industrial system—giving Tulip the complete picture it needs to optimize your operations.'

const hero = { buttonText: 'REQUEST DEMO', buttonLink: 'form' }

const image = '/images/solutions/mes-hero.png'
const imageDescription = 'MES Diagram'

const problem = {
    title: "Is <span class='text-indigo-600'>Tulip</span> Running on Incomplete Data?",
    intro: 'Tulip should give you complete visibility across your shop floor. But most manufacturers struggle with:',
    outro: 'The result? Tulip can only work with the data it receives—and critical information stays trapped in isolated systems.',
}

// `large/` icons are not exposed via the flat <Icon> glob, so their SVG markup is inlined here.
const problems = [
    {
        svg: '<svg width="100%" height="auto" viewBox="0 0 92 77" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M77.7066 19.2532C80.8023 21.3522 83.7029 23.735 86.3531 26.3797C86.8876 26.9197 87.6114 27.2204 88.3742 27.226C89.1314 27.226 89.8552 26.9253 90.3953 26.3908C90.9298 25.8563 91.2304 25.127 91.2304 24.3697C91.2249 23.607 90.9242 22.8831 90.3841 22.3486C87.4722 19.4479 84.2932 16.8256 80.8858 14.5261C79.3881 13.5295 77.8737 12.6276 76.3537 11.7868L83.2576 4.88295C83.7977 4.34846 84.1095 3.62467 84.1095 2.86186C84.115 2.09909 83.8144 1.36971 83.2743 0.835219C82.7398 0.295156 82.0105 -0.00548296 81.2477 7.57341e-05C80.4849 7.57341e-05 79.7611 0.311861 79.2266 0.851924L7.9613 72.1172C7.42124 72.6517 7.10945 73.3755 7.10945 74.1383C7.10388 74.9011 7.40453 75.6305 7.94459 76.165C8.47908 76.705 9.20844 77.0057 9.97124 77.0001C10.734 77.0001 11.4578 76.6883 11.9923 76.1482L39.3625 48.7781C46.3666 46.3618 54.1386 48.1601 59.3666 53.4103C60.4857 54.5183 62.2841 54.5072 63.392 53.3936C64.4999 52.2745 64.4944 50.4762 63.3809 49.3627C58.8155 44.7194 52.5742 42.097 46.0605 42.0803L57.5521 30.5887C59.8013 31.2847 61.9728 32.1978 64.0383 33.3169C67.2786 35.0708 70.2407 37.281 72.8408 39.8923C73.9543 41.0058 75.7582 41.0058 76.8717 39.8923C77.9851 38.7788 77.9852 36.9748 76.8717 35.8614C73.8874 32.866 70.4856 30.3216 66.7665 28.3061C65.241 27.471 63.6653 26.7304 62.0452 26.0902L72.1225 16.0128C74.0434 16.9872 75.9082 18.0673 77.7066 19.2532Z" fill="#818CF8"/><path d="M2.85016 27.2084C3.60735 27.2139 4.33119 26.9133 4.86568 26.3732C18.2279 13.0723 37.2358 7.1202 55.8033 10.4326C57.351 10.7054 58.832 9.67542 59.1048 8.12205C59.3777 6.57431 58.3477 5.09327 56.7943 4.82047C36.3996 1.17368 15.5103 7.71555 0.833918 22.3418C0.0210519 23.1602 -0.22393 24.3851 0.21592 25.4485C0.655755 26.5175 1.69765 27.2084 2.85016 27.2084Z" fill="#818CF8"/><path d="M18.3778 39.8872C23.6893 34.5589 30.4651 30.9177 37.8474 29.4368C39.3896 29.125 40.3919 27.6218 40.08 26.0795C39.7683 24.5373 38.2651 23.5351 36.7227 23.8469C28.2377 25.5506 20.4543 29.7319 14.3469 35.8563C13.2333 36.9698 13.2333 38.7793 14.3469 39.8872C15.4604 41.0007 17.2643 41.0007 18.3778 39.8872Z" fill="#818CF8"/><path d="M41.3466 62.8637C39.6207 64.5896 39.1028 67.1841 40.0382 69.439C40.9735 71.694 43.1727 73.1638 45.6114 73.1638C48.0501 73.1638 50.2492 71.694 51.1846 69.439C52.1201 67.1841 51.6022 64.5897 49.8762 62.8637C47.5212 60.5142 43.7017 60.5142 41.3466 62.8637Z" fill="#818CF8"/></svg>',
        title: "Legacy equipment that doesn't communicate with Tulip",
    },
    {
        svg: '<svg width="100%" height="auto" viewBox="0 0 95 92" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.16602 39.3285V75.1618C2.16602 83.0809 15.0015 89.4951 30.8327 89.4951C46.6639 89.4951 59.4994 83.0809 59.4994 75.1618V39.3285M2.16602 39.3285C2.16602 47.2476 15.0015 53.6618 30.8327 53.6618C46.6639 53.6618 59.4994 47.2476 59.4994 39.3285M2.16602 39.3285C2.16602 31.4093 15.0015 24.9951 30.8327 24.9951C46.6639 24.9951 59.4994 31.4093 59.4994 39.3285M59.4994 57.2451C59.4994 65.1643 46.6639 71.5784 30.8327 71.5784C15.0015 71.5784 2.16602 65.1643 2.16602 57.2451" stroke="#818CF8" stroke-width="4.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M66.8259 66.595C81.3259 65.885 92.6659 59.775 92.6659 52.335V16.495C92.6659 8.57504 79.8259 2.16504 63.9959 2.16504C48.1659 2.16504 35.3359 8.57504 35.3359 16.495V18.545" stroke="#818CF8" stroke-width="4.33" stroke-linecap="round" stroke-linejoin="round"/><path d="M66.8262 48.675C81.3262 47.965 92.6662 41.855 92.6662 34.415" stroke="#818CF8" stroke-width="4.33" stroke-linecap="round" stroke-linejoin="round"/><path d="M66.8262 30.095C81.3262 29.385 92.6662 23.275 92.6662 15.835" stroke="#818CF8" stroke-width="4.33" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        title: 'Data silos across different systems and protocols',
    },
    {
        svg: '<svg width="100%" height="auto" viewBox="0 0 95 83" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.2991 16.5H37.9991C37.3991 16.5 36.8991 17 36.8991 17.6V22.4C30.3991 22.9 25.2991 28.7 26.1991 35.6C26.8991 41.6 32.2991 45.9 38.3991 45.9H43.4991C45.9991 45.9 47.9991 48 47.6991 50.6C47.4991 52.8 45.4991 54.4 43.1991 54.4H37.7991C35.7991 54.4 33.9991 52.9 33.5991 51C33.4991 50.5 32.9991 50.1 32.4991 50.1H27.0991C26.3991 50.1 25.8991 50.7 25.9991 51.4C26.5991 57 31.0991 61.3 36.7991 61.8V66.6C36.7991 67.2 37.2991 67.7 37.8991 67.7H43.1991C43.7991 67.7 44.2991 67.2 44.2991 66.6V61.8C50.7991 61.3 55.8991 55.5 54.9991 48.6C54.4991 42.7 49.0991 38.4 42.9991 38.4H38.0991C35.8991 38.4 33.8991 36.8 33.5991 34.6C33.2991 32.1 35.2991 29.9 37.7991 29.9H43.4991C45.4991 29.9 47.2991 31.4 47.6991 33.3C47.7991 33.8 48.2991 34.2 48.7991 34.2H54.1991C54.8991 34.2 55.3991 33.6 55.2991 32.9C54.5991 27.3 50.0991 22.9 44.4991 22.4V17.6C44.4991 17 43.9991 16.5 43.2991 16.5Z" fill="#818CF8"/><path d="M40.7 6.6C21.1 6.6 5.1 22.5 5.1 42.2C5.1 61.9 21 77.8 40.7 77.8C58.8 77.8 73.9 64.1 76 46.5H81.2C79 66.9 61.7 82.9 40.7 82.9C18.3 82.9 0 64.6 0 42.2C0 19.8 18.3 1.5 40.7 1.5C49.1 1.5 57 4.1 63.5 8.5L60.1 12.4C54.5 8.7 47.9 6.6 40.7 6.6Z" fill="#818CF8"/><path d="M92.4001 20.9H87.2001V38.8C87.2001 40.2 86.0001 41.4 84.6001 41.4H73.0001C71.6001 41.4 70.4001 40.2 70.4001 38.8V20.9H65.2001C63.0001 20.9 61.8001 18.3 63.3001 16.6L76.9001 0.9C77.9001 -0.3 79.8001 -0.3 80.8001 0.9L94.4001 16.7C95.8001 18.3 94.6001 20.9 92.4001 20.9Z" fill="#818CF8"/></svg>',
        title: 'Custom integrations that are expensive and fragile',
    },
    {
        svg: '<svg width="100%" height="auto" viewBox="0 0 88 77" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_5970_5207)"><path d="M9.98634 52.7188H1.04335C0.467123 52.7188 0 53.1859 0 53.7621V75.9556C0 76.5319 0.467123 76.999 1.04335 76.999H9.98634C10.5626 76.999 11.0297 76.5319 11.0297 75.9556V53.7621C11.0297 53.1859 10.5626 52.7188 9.98634 52.7188Z" fill="#818CF8"/><path d="M36.7855 71.0371C36.1744 71.0371 35.6677 71.5439 35.6677 72.155V74.7634H33.0593C32.4482 74.7634 31.9414 75.2701 31.9414 75.8812C31.9414 76.4923 32.4482 76.9991 33.0593 76.9991H36.7855C37.3966 76.9991 37.9034 76.4923 37.9034 75.8812V72.155C37.9034 71.5439 37.3966 71.0371 36.7855 71.0371Z" fill="#818CF8"/><path d="M27.2445 74.7634H24.6361V72.155C24.6361 71.5439 24.1294 71.0371 23.5183 71.0371C22.9072 71.0371 22.4004 71.5439 22.4004 72.155V75.8812C22.4004 76.4923 22.9072 76.9991 23.5183 76.9991H27.2445C27.8556 76.9991 28.3624 76.4923 28.3624 75.8812C28.3624 75.2701 27.8556 74.7634 27.2445 74.7634Z" fill="#818CF8"/><path d="M23.5183 50.6615C24.1294 50.6615 24.6361 50.1547 24.6361 49.5436V42.0017C24.6361 41.3906 24.1294 40.8838 23.5183 40.8838C22.9072 40.8838 22.4004 41.3906 22.4004 42.0017V49.5436C22.4004 50.1547 22.9072 50.6615 23.5183 50.6615Z" fill="#818CF8"/><path d="M22.4004 64.6129C22.4004 65.224 22.9072 65.7308 23.5183 65.7308C24.1294 65.7308 24.6361 65.224 24.6361 64.6129V57.071C24.6361 56.4599 24.1294 55.9531 23.5183 55.9531C22.9072 55.9531 22.4004 56.4599 22.4004 57.071V64.6129Z" fill="#818CF8"/><path d="M27.2445 29.6309H23.5183C22.9072 29.6309 22.4004 30.1376 22.4004 30.7487V34.475C22.4004 35.0861 22.9072 35.5929 23.5183 35.5929C24.1294 35.5929 24.6361 35.0861 24.6361 34.475V31.8666H27.2445C27.8556 31.8666 28.3624 31.3598 28.3624 30.7487C28.3624 30.1376 27.8556 29.6309 27.2445 29.6309Z" fill="#818CF8"/><path d="M36.7855 29.6309H33.0593C32.4482 29.6309 31.9414 30.1376 31.9414 30.7487C31.9414 31.3598 32.4482 31.8666 33.0593 31.8666H35.6677V34.475C35.6677 35.0861 36.1744 35.5929 36.7855 35.5929C37.3966 35.5929 37.9034 35.0861 37.9034 34.475V30.7487C37.9034 30.1376 37.3966 29.6309 36.7855 29.6309Z" fill="#818CF8"/><path d="M36.7858 40.8838C36.1747 40.8838 35.668 41.3906 35.668 42.0017V49.5436C35.668 50.1547 36.1747 50.6615 36.7858 50.6615C37.3969 50.6615 37.9037 50.1547 37.9037 49.5436V42.0017C37.9037 41.3906 37.3969 40.8838 36.7858 40.8838Z" fill="#818CF8"/><path d="M36.7858 55.9678C36.1747 55.9678 35.668 56.4745 35.668 57.0856V64.6276C35.668 65.2387 36.1747 65.7454 36.7858 65.7454C37.3969 65.7454 37.9037 65.2387 37.9037 64.6276V57.0856C37.9037 56.4745 37.3969 55.9678 36.7858 55.9678Z" fill="#818CF8"/><path d="M59.2481 45.8477H50.3051C49.7288 45.8477 49.2617 46.3148 49.2617 46.891V75.9557C49.2617 76.532 49.7288 76.9991 50.3051 76.9991H59.2481C59.8243 76.9991 60.2914 76.532 60.2914 75.9557V46.891C60.2914 46.3148 59.8243 45.8477 59.2481 45.8477Z" fill="#818CF8"/><path d="M83.8848 24.7725H74.9418C74.3656 24.7725 73.8984 25.2396 73.8984 25.8158V75.9562C73.8984 76.5324 74.3656 76.9995 74.9418 76.9995H83.8848C84.461 76.9995 84.9281 76.5324 84.9281 75.9562V25.8158C84.9281 25.2396 84.461 24.7725 83.8848 24.7725Z" fill="#818CF8"/><path d="M86.8959 0.402435C86.6873 0.14905 86.3742 0 86.0463 0H77.312C76.7009 0 76.1941 0.50677 76.1941 1.11787C76.1941 1.72898 76.7009 2.23575 77.312 2.23575H83.3187L58.4125 22.119C56.0724 20.1068 52.5548 20.3602 50.5278 22.7003C50.3638 22.8941 50.1998 23.1027 50.0657 23.3263L37.2325 17.8562C37.4114 17.2004 37.5157 16.5296 37.5157 15.8589C37.4859 11.3427 33.7894 7.70588 29.2732 7.73569C24.8017 7.7655 21.1798 11.3874 21.15 15.8589C21.1351 17.2153 21.463 18.5567 22.1188 19.7491L2.5933 34.2219C2.10144 34.5945 1.99711 35.295 2.35483 35.8018C2.5635 36.085 2.90631 36.2489 3.26403 36.2489C3.50251 36.2489 3.72608 36.1744 3.91985 36.0254L23.4603 21.5377C25.0104 23.1624 27.1418 24.1014 29.3925 24.1014C32.3139 24.1014 35.0117 22.5065 36.3978 19.9429L49.2161 25.3832C48.6199 28.4685 50.6321 31.4644 53.7174 32.0606C56.8028 32.6568 59.7987 30.6447 60.3949 27.5593C60.4694 27.2165 60.4992 26.8588 60.4992 26.5011C60.4992 25.577 60.2756 24.6529 59.8285 23.848L84.3323 4.29264L83.1548 10.7763C83.0355 11.3725 83.4231 11.9538 84.0193 12.073C84.0193 12.073 84.0342 12.073 84.0491 12.073C84.1236 12.073 84.1832 12.0879 84.2577 12.0879C84.7943 12.0879 85.2564 11.7004 85.3458 11.1787L87.1493 1.31164C87.2089 0.983729 87.1195 0.65582 86.8959 0.402435ZM31.9412 16.9619C32.3735 17.3792 32.3884 18.0798 31.971 18.512C31.971 18.512 31.9561 18.5269 31.9412 18.5418C31.7326 18.7505 31.4494 18.8697 31.1513 18.8697C30.8532 18.8697 30.57 18.7505 30.3613 18.5418L29.3329 17.4985L28.3044 18.5418C28.0957 18.7505 27.8125 18.8697 27.5144 18.8697C27.2163 18.8697 26.9332 18.7505 26.7245 18.5418C26.2922 18.1245 26.2773 17.4239 26.6947 16.9917C26.6947 16.9917 26.7096 16.9768 26.7245 16.9619L27.7529 15.9185L26.7245 14.8901C26.2922 14.4578 26.2922 13.7424 26.7245 13.3102C27.1567 12.8779 27.8722 12.8779 28.3044 13.3102L29.3329 14.3386L30.3613 13.3102C30.7935 12.8779 31.509 12.8779 31.9412 13.3102C32.3735 13.7424 32.3735 14.4578 31.9412 14.8901L30.9128 15.9185L31.9412 16.9619Z" fill="#818CF8"/></g><defs><clipPath id="clip0_5970_5207"><rect width="87.1644" height="76.9992" fill="white"/></clipPath></defs></svg>',
        title: 'Incomplete shop floor visibility because not all data reaches Tulip',
    },
]

const sectionTitle = "<span class='text-indigo-600'>Connect Everything</span> to Tulip"

const sectionDescription = [
    'MQTT, OPC-UA, Modbus HTTP/REST',
    'Legacy PLCs, modern IoT sensors, edge devices',
    'ERP systems, databases, APIs',
    'Any protocol, any device, any system',
]
const sections = [
    { icon: 'arrows-pointing-out', title: 'Connect Everything', description: sectionDescription },
    { icon: 'puzzle-piece', title: 'Integrate Legacy Equipment', description: sectionDescription },
    { icon: 'check-circle', title: 'Optimized for Tulip Users', description: sectionDescription },
]

const how = {
    title: "The Data Connectivity Platform <span class='text-indigo-600'>Built for Manufacturing</span>",
    img: '/vs/images/flowfuse-tulip.png',
    imgAlt: 'FlowFuse Tulip Integration Diagram',
    subtitle: "Built on <span class='whitespace-nowrap'>Node-RED</span> with enterprise features:",
}
const howFeatures = [
    { icon: 'user-group', title: 'Team collaboration and version control' },
    { icon: 'lock-closed', title: 'Secure deployment across edge and cloud' },
    { icon: 'arrows', title: 'High availability and disaster recovery' },
    { icon: 'lifebuoy', title: 'Enterprise support and professional services' },
]

const stories = {
    title: "Latest <span class='text-indigo-600'>Customer Stories</span>",
    url: '/customer-stories/',
    urlText: 'See more customer stories',
}
const latestStories = [...indexData.stories]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)

const hubspotDataSrc = 'https://meetings-eu1.hubspot.com/michael-davis/round-robin-michael-omar-kasheef?embed=true'

useHead({
    title: metaTitle + ' • FlowFuse',
    meta: [{ name: 'description', content: metaDescription }],
})
</script>

<template>
  <!--Hero Content-->
  <div class="nohero w-full">
    <div class="w-full pt-12 pb-20 md:pt-6 md:pb-12">
      <div class="md:flex px-6 md:my-16 items-center md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8 items-stretch">
        <div class="m-auto md:w-1/2">
          <h1 class="w-full mt-0 px-12 md:px-0 my-auto text-base md:max-w-[365px]">
            <span class="text-4xl" v-html="heroTitle" />
          </h1>
          <p class="mb-10">
            {{ metaDescription }}
          </p>
          <a class="ff-btn ff-btn--primary hidden min-h-[40px] md:inline" :href="`#${hero.buttonLink}`">
            {{ hero.buttonText }}
          </a>
        </div>
        <div class="md:w-1/2 flex-grow relative">
          <div class="ff-image-rounded w-full h-full">
            <img :src="image" :alt="imageDescription" loading="lazy" class="w-full h-auto">
          </div>
        </div>
        <a class="ff-btn ff-btn--primary flex flex-col w-full md:hidden m-auto mt-12" :href="`#${hero.buttonLink}`">
          {{ hero.buttonText }}</a>
      </div>
    </div>

    <!-- Problem -->
    <div class="w-full">
      <div class="max-w-screen-lg mx-auto px-6">
        <h2 class="text-center w-full md:text-left mb-4" v-html="problem.title" />
        <p class="text-center w-full md:text-left text-gray-500 font-normal">{{ problem.intro }}</p>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 my-12">
          <div v-for="item in problems" :key="item.title" class="relative w-full max-md:max-w-md mx-auto bg-indigo-50 rounded-md p-6">
            <div class="flex flex-row justify-center items-center gap-8 h-full">
              <div class="flex w-16 items-center justify-center">
                <span v-html="item.svg" />
              </div>
              <h5 class="w-full md:m-0 text-gray-600 font-medium mx-auto">{{ item.title }}</h5>
            </div>
          </div>
        </div>
        <p class="text-center w-full md:text-left text-gray-500 font-normal">{{ problem.outro }}</p>
      </div>
    </div>
    <!-- Solution -->
    <div class="w-full">
      <div class="max-w-screen-lg mx-auto px-6 mt-20">
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="sectionTitle" />
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 mt-12">
          <div v-for="section in sections" :key="section.title" class="container relative w-full max-md:max-w-md mx-auto">
            <div class="flex flex-col items-center sm:items-start">
              <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                <div class="w-8 h-8 m-auto sm:m-0 text-indigo-600">
                  <Icon :name="section.icon" />
                </div>
                <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                  <h5 class="w-full md:m-0 font-medium">
                    <div class="text-xl text-gray-600 text-center sm:text-left">{{ section.title }}</div>
                  </h5>
                </div>
              </div>
              <ul class="mt-6 ff-prose prose list-disc">
                <li v-for="item in section.description" :key="item" class="font-light my-0 ml-4" v-html="item" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- How It Works -->
    <div class="w-full bg-indigo-50/50 py-16 mt-20">
      <div class="max-w-screen-lg mx-auto px-6">
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="how.title" />
        <div class="w-full my-12">
          <img :src="how.img" :alt="how.imgAlt" loading="lazy" class="w-full h-auto">
        </div>
        <div class="w-full md:flex gap-4">
          <h4 class="md:w-[203px] text-xl max-md:mb-6 max-md:text-center" v-html="how.subtitle" />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div v-for="item in howFeatures" :key="item.title" class="bg-indigo-50 border border-white rounded-md flex flex-row items-center gap-4 p-4">
              <div class="w-8 h-8 text-indigo-600">
                <Icon :name="item.icon" />
              </div>
              <div class="text-gray-600">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Customer Stories Banner-->
    <div class="max-w-screen-lg mx-auto px-6 mt-16">
      <h2 class="max-md:text-center max-w-3xl" v-html="stories.title" />
      <ul class="mt-10 grid grid-cols-1 md:grid md:grid-cols-3 gap-y-4 pb-4 m-auto gap-6">
        <li v-for="item in latestStories" :key="item.url" class="w-full max-w-md m-auto my-2">
          <a :href="item.url" class="w-full flex flex-col group hover:no-underline">
            <div>
              <div>
                <div class="relative">
                  <div class="w-full h-40 ff-image-cover scale mb-4 ff-image-rounded object-contain overflow-hidden">
                    <template v-if="item.image">
                      <div v-if="item.logo" class="w-1/2 h-full absolute left-0 top-0 bg-white flex items-center justify-center">
                        <img :src="item.logo" :alt="`Image representing ${item.story.brand} logo`" loading="lazy" class="w-full h-auto">
                      </div>
                      <img :src="item.image" :alt="`Image representing ${item.title}`" loading="lazy" class="w-full h-auto">
                    </template>
                    <img v-else src="/images/og-blog.jpg" alt="Image with logo and the slogan: Elevate Node-RED with Flowfuse" loading="lazy" class="w-full h-auto">
                  </div>
                </div>
              </div>
              <h5 class="mt-1 mb-0 group-hover:underline font-light text-lg text-left text-gray-600">{{ item.title }}</h5>
            </div>
          </a>
        </li>
      </ul>
      <a :href="stories.url" class="w-full font-light text-center md:text-left hover:underline pt-3 flex flex-row items-center gap-1 cursor-pointer flex-wrap max-md:max-w-md mx-auto mb-20">
        {{ stories.urlText }} <Icon name="chevron-right-sm" />
      </a>
    </div>
    <!-- Form -->
    <div id="form" class="max-w-screen-lg mx-auto mb-6">
      <div class="w-full px-6 pb-2 max-sm:mt-4">
        <h2 class="mb-8 max-md:text-center">Ready to Make the Wiser Decision?</h2>
        <p>See how FlowFuse can connect ALL your data sources to Tulip. Book your demo now.</p>
        <div class="my-10">
          <HubSpotMeeting :data-src="hubspotDataSrc" />
        </div>
      </div>
    </div>
  </div>
</template>
