import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";


export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: ['feats'],
    });

    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      // eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));
      eleventyConfig.addGlobalData("feats", () => {
        const encoded = context.cookies.get('feats')
        const decoded = decodeURIComponent(encoded)
        const feats = JSON.parse(decoded)
        return feats
      });

      eleventyConfig.addFilter("json", (content) => {
        return JSON.stringify(content, null, 2)
      });

      eleventyConfig.addPairedShortcode("shortcodetest", async function (content) {
        return `${content} - shortcode at edge`
      })

      /*
          A/B Testing
      */

      // const posthog = new PostHog('phc_yVWfmiJ3eiVd2iuLYJIQROuHUN65z3hkhkGvAjjaTL7', { host: 'https://eu.posthog.com' })

      eleventyConfig.addPairedShortcode("abtesting", async function (content, flag, value) {
        // get globals from the edge
        // note: .ctx works for "liquid", it's .context for "njk"
        // we are currently using "liquid" _just_ for our edge functions due to eleventy bugs
        // const phFlags = await posthog.getFeatureFlag('test-flag', 'joepavitt@flowforge.com')
        const feats = this.ctx.environments.feats
        // const fFlag = await posthog.getFeatureFlag('test-flag', 'joepavitt@flowforge.com')
        if (feats[flag] === value) {
            return `${content}`
        } else {
            return ''
        }
      })

    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
