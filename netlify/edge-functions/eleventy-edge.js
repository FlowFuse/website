import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";

function generateUUID() {
  function genSubString () {
    return Math.random().toString(36).slice(2)
  }
  return `${genSubString()}-${genSubString()}-${genSubString()}`
}

function getCookie(context, cookie) {
  return context.cookies.get(cookie);
}

function setCookie(context, name, value) {
  context.cookies.set({
      name,
      value,
      path: "/",
      httpOnly: false,
      secure: true,
      sameSite: "Lax",
  });
}

function decodeJsonCookie (cookie) {
  const decoded = decodeURIComponent(cookie)
  return JSON.parse(decoded).distinct_id;
}

/*
  Check if this is a person we already recognise in PostHog (they will have a PostHog cookie)
  If not, we need to geenrate a random identifier for them
*/
function getDistinctId (context) {
  const phCookie = getCookie(context, 'ph_phc_yVWfmiJ3eiVd2iuLYJIQROuHUN65z3hkhkGvAjjaTL7_posthog')
  if (phCookie) {
      return decodeJsonCookie(phCookie)
  } else {
      return generateUUID()
  }
}

async function getPHFeatureFlags (distinctId) {
  return new Promise ((resolve, reject) => {
      fetch('https://eu.posthog.com/decide?v=2', {
          method: 'POST',
          body: JSON.stringify({
              "api_key": "phc_yVWfmiJ3eiVd2iuLYJIQROuHUN65z3hkhkGvAjjaTL7",
              "distinct_id": distinctId
          })
      }).then((response) => {
          return response.json()
      }).then((data) => {
          resolve(data.featureFlags)
      })
  })
}

async function featureFlagCalled (distinctId, feature, value) {
  return new Promise ((resolve, reject) => {
      fetch('https://eu.posthog.com/capture', {
          method: 'POST',
          body: JSON.stringify({
              "api_key": "phc_yVWfmiJ3eiVd2iuLYJIQROuHUN65z3hkhkGvAjjaTL7",
              "distinct_id": distinctId,
              "event": "$feature_flag_called",
              "properties": {
                "$feature_flag": feature,
                "$feature_flag_response": value
              }
          })
      }).then((response) => {
          return response.json()
      }).then((data) => {
        console.log(data)
          resolve(data)
      }).catch((err) => {
          console.error(err)
      })
  })
}

export default async (request, context) => {
  
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,
      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: ['ff-feats', 'ff-distinctid', 'ph_phc_yVWfmiJ3eiVd2iuLYJIQROuHUN65z3hkhkGvAjjaTL7_posthog'],
    });

    function decodeJsonCookie (cookie) {
      const decoded = decodeURIComponent(cookie)
      return JSON.parse(decoded)
    }

    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      // eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));

      eleventyConfig.addFilter("json", (content) => {
        return JSON.stringify(content, null, 2)
      });

      eleventyConfig.addPairedShortcode("shortcodetest", async function (content) {
        return `${content} - shortcode at edge`
      })

      /*
          A/B Testing
      */

      eleventyConfig.addPairedShortcode("abtesting", async function (content, flag, value) {
        // get globals from the edge
        // note: .ctx works for "liquid", it's .context for "njk"
        // we are currently using "liquid" _just_ for our edge functions due to eleventy bugs
        // const phFlags = await posthog.getFeatureFlag('test-flag', 'joepavitt@flowforge.com')
        const distinctId = getDistinctId(context)
        // call PostHog /decide API   
        const flags = await getPHFeatureFlags(distinctId)
        const strFlag = encodeURIComponent(JSON.stringify(flags))
        // set cookies to pass data to client PostHog for bootstrapping
        setCookie(context, "ff-distinctid", distinctId, 1);    
        setCookie(context, "ff-feats", strFlag, 1);
        
        if (flags[flag] && flags[flag] === value) {
          // inform PostHog we have used a Feature Flag to track in our experiment
          featureFlagCalled(distinctId, flag, value)
          return `${content}`
        } else if (!flags[flag] && value === 'control') {
          // this is not a valid feature flag - fall back to the "control" content
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
