<script setup lang="ts">
// Ported from src/blueprints/submit.njk (11ty), which this replaces. Same page, same copy,
// same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The .njk used 11ty pagination (size 3) purely to slice three blueprints for the
//    "Existing Blueprints" row. That generated five further pages nobody links to
//    (/blueprints/submit/1/ through /5/, each an identical form with three other
//    examples). This queries the first three of the same ordering instead, so only
//    /blueprints/submit/ exists.
//  - hubspot/hs-form.njk becomes <HubSpotForm> with the same form id, cta and reference.
//  - The frontmatter carried a `description` full of raw <p> tags for the layout to print
//    with `| safe`; the visible copy was written out again in the body. Only the body copy
//    is kept, and the meta description is the `meta.description` the .njk set.
//  - The .njk never closed its outer container div, so the browser put the "Existing
//    Blueprints" section inside it anyway. That nesting is written out here.

const EXAMPLE_COUNT = 3
const FALLBACK_IMAGE = '/images/og-blog.jpg'
const FALLBACK_IMAGE_ALT = 'Image with logo and the slogan: Elevate Node-RED with Flowfuse'

// Same ordering as the listing (see useBlueprintList), just the first few of it.
const { data: examples } = await useAsyncData('blueprints-submit-examples', () =>
    queryCollection('blueprints')
        .select('path', 'title', 'image')
        .order('path', 'DESC')
        .limit(EXAMPLE_COUNT)
        .all()
)

useSeoMeta({
    title: 'Submit Your Blueprint',
    description: 'Submit your own Blueprints for publishing in the FlowFuse Blueprint Library',
})
</script>

<template>
  <div class="max-w-full">
    <div class="m-auto sm:max-w-xl md:max-w-6xl px-4">
      <div class="grid gap-12 pt-24 md:grid-cols-2">
        <div>
          <h1 class="mb-10">Submit Your Blueprint</h1>
          <p>Share your Blueprints to help the FlowFuse community build <span class="inline-block">best-in-class</span> Node-RED templates and build recognition of yourself as a Node-RED expert.</p>
          <p>We are accepting submissions of Blueprints that are <b>useful and professionally well-constructed</b>.</p>
          <p>Submissions will be reviewed by the FlowFuse team.</p>
          <p>Accepted submissions will be featured on the Blueprints page and announced on social media.</p>
        </div>
        <div class="w-full">
          <HubSpotForm
              form-id="c627fbcb-a3e0-46dd-978b-122461b7835c"
              cta="blueprint-upload"
              reference="blueprint-upload"
          />
        </div>
      </div>
      <div class="w-full pt-10 pb-16">
        <div class="m-auto md:max-w-6xl border-t pt-8">
          <div class="grid lg:grid-cols-3 lg:gap-6">
            <h2 class="mt-2">Existing Blueprints</h2>
            <p class="col-span-2">
              Here are a few examples of Blueprints from our collection. You can take a look at
              the full collection in our <NuxtLink to="/blueprints/">Blueprint Library</NuxtLink>
            </p>
          </div>
          <ul class="grid md:grid-cols-3 gap-6 mt-6">
            <li
                v-for="example in examples"
                :key="example.path"
                class="grid max-md:text-center max-md:mx-auto max-md:max-w-md bg-white ff-image-cover blueprint rounded-lg border drop-shadow-md hover:drop-shadow-lg grow"
            >
              <NuxtLink :to="`${example.path}/`" class="w-full flex flex-col group hover:no-underline">
                <div class="ff-image-cover aspect-video border-b">
                  <img
                      :src="example.image || FALLBACK_IMAGE"
                      :alt="example.image ? `Image representing ${example.title}` : FALLBACK_IMAGE_ALT"
                      width="285"
                      loading="lazy"
                      class="w-full h-auto"
                  >
                </div>
                <h5 class="my-4 group-hover:underline px-4 font-medium text-lg leading-6">{{ example.title }}</h5>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
