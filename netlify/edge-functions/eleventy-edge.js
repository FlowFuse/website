import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";

// import { PostHog } from "posthog-node";

export default async (request, context) => {
  try {
    console.log('request')

    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: ["abtesting"],
    });

    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      eleventyConfig.addFilter("testFilter", (obj) => {
        return obj
      });

      // eleventyConfig.addPairedShortcode("abtesting", async function (content, flag, value) {
      //     // const response = await fetch("https://news.bbc.co.uk", {
      //     //   method: 'GET'
      //     // }).then((response) => {
      //     //   console.log(response)
      //     //   return
      //     // });

      //     // const response = await fetch("https://eu.posthog.com/decide/", {
      //     //   method: 'POST',
      //     //   body: JSON.stringify({
      //     //     "api_key": "phc_yVWfmiJ3eiVd2iuLYJIQROuHUN65z3hkhkGvAjjaTL7",
      //     //     "distinct_id": "joepavitt@flowforge.com"
      //     //   })
      //     // }).then((response) => return response.json());
          
      //     return `edge ${flag}: ${value}`
      //     // const response = await axios.get('https://news.bbc.co.uk')
      //     // console.log(response)
      //     // const fFlag = 'testA'
      //     // const fFlag = await posthog.getFeatureFlag('test-flag', 'joepavitt@flowforge.com')
      //     // console.log(fFlag)
      //     // if (fFlag === value) {
      //     //     return `${content}`
      //     // } else {
      //     //     return ''
      //     // }
      // })
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
