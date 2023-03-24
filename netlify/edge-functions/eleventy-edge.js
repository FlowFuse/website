import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";

const POSTHOG_APIKEY = 'phc_yVWfmiJ3eiVd2iuLYJIQROuHUN65z3hkhkGvAjjaTL7'; //Deno.env.get("POSTHOG_APIKEY");

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
  const phCookie = getCookie(context, `ph_${POSTHOG_APIKEY}_posthog`)
  const ffDistinctId = getCookie(context, `ff-distinctid`)
  if (phCookie) {
      return decodeJsonCookie(phCookie)
  } else if (ffDistinctId) {
      return ffDistinctId
  } else {
      return generateUUID()
  }
}

async function getPHFeatureFlags (distinctId) {
  return new Promise ((resolve, reject) => {
      console.log('get feature flag for: ' + distinctId)
      fetch('https://eu.posthog.com/decide?v=2', {
          method: 'POST',
          body: JSON.stringify({
              "api_key": POSTHOG_APIKEY,
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
              "api_key": POSTHOG_APIKEY,
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
          resolve(data)
      }).catch((err) => {
          console.error(err)
      })
  })
}

export default async (request, context) => {

  console.log('edge function')

  // const POSTHOG_APIKEY = process.env.POSTHOG_APIKEY
  
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,
      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: ['ff-feats', 'ff-distinctid', `ph_${POSTHOG_APIKEY}_posthog`, 'ff-test'],
    });

    function decodeJsonCookie (cookie) {
      const decoded = decodeURIComponent(cookie)
      return JSON.parse(decoded)
    }

    edge.config((eleventyConfig) => {

      console.log(`ph_${POSTHOG_APIKEY}_posthog`)

      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      // eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));

      eleventyConfig.addFilter("json", (content) => {
        return JSON.stringify(content, null, 2)
      });

      eleventyConfig.addPairedShortcode("shortcodetest", async function (content) {
        return `${content} - shortcode at edge`
      })

      eleventyConfig.addGlobalData('distinctId', async function () {
        const distinctId = getDistinctId(context);
        return distinctId
      })

      /*
          A/B Testing
      */
     // TODO: Using this means we get two event ids every time we see a new Person

      eleventyConfig.addPairedAsyncShortcode("abtesting", async function (content, flag, value) {
        console.log('A/B Testing : ' + flag + " " + value)
        if (POSTHOG_APIKEY) {
          const distinctId = this.ctx.environments.distinctId
          // call PostHog /decide API   
          const flags = await getPHFeatureFlags(distinctId)
          console.log(flags)
          const strFlag = encodeURIComponent(JSON.stringify(flags))
          // set cookies to pass data to client PostHog for bootstrapping
          setCookie(context, "ff-distinctid", distinctId, 1);    
          setCookie(context, "ff-feats", strFlag, 1);
          
          if (flags[flag] && flags[flag] === value) {
            // inform PostHog we have used a Feature Flag to track in our experiment
            await featureFlagCalled(distinctId, flag, value)
            return `${content}`
          } else if (!flags[flag] && value === 'control') {
            // this is not a valid feature flag - fall back to the "control" content
            return `${content}`
          } else {
            return ''
          }
        } else if (value === 'control') {
          console.log('no posthog API key')
          // fallback to control if we have no PostHog API key
          return `${content}`
        }
      })
    });
    const distinctId = getDistinctId(context)
    setCookie(context, "ff-distinctid", distinctId, 1);   
    console.log('handle response')
    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
