import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";

const POSTHOG_APIKEY = Deno.env.get("POSTHOG_APIKEY");

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
  return JSON.parse(decoded);
}

/*
Check if this is a person we already recognize in PostHog (they will have a PostHog cookie)
If not, we need to geenrate a random identifier for them
*/
function getDistinctId (context) {
  const phCookie = getCookie(context, `ph_${POSTHOG_APIKEY}_posthog`)
  const ffDistinctId = getCookie(context, `ff-distinctid`)
  if (phCookie) {
      return decodeJsonCookie(phCookie).distinct_id
  } else if (ffDistinctId) {
      return ffDistinctId
  } else {
      return generateUUID()
  }
}

function getExistingFeatureFlags (context) {
  const phCookie = getCookie(context, `ff-feats`)
  if (phCookie) {
      return decodeJsonCookie(phCookie)
  } else {
      return null
  }
}

/*
Are we missing a value for this feat?
*/
function isNewFlag (context, flag) {
  const flags = getExistingFeatureFlags(context)
  return !flags || !!!(flags[flag])
}

async function getPHFeatureFlags (distinctId) {
  return new Promise ((resolve, reject) => {
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
      }).catch((err) => {
          console.error("Error getting feature flags > ", err)
          resolve({})
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
          console.error("Error capturing feature flag called event > ", err)
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
          cookies: ['ff-feats', 'ff-distinctid', `ph_${POSTHOG_APIKEY}_posthog`, 'ff-test'],
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

          eleventyConfig.addGlobalData('distinctId', async function () {
              const distinctId = getDistinctId(context);
              return distinctId
          })

          /*
              A/B Testing
          */
          // TODO: Using this means we get two event ids every time we see a new Person

          eleventyConfig.addPairedAsyncShortcode("abtesting", async function (content, flag, value) {
              if (POSTHOG_APIKEY) {
                  const distinctId = this.ctx.environments.distinctId
                  setCookie(context, "ff-distinctid", distinctId, 1);
                  const requireFlagsRefresh = isNewFlag(context, flag)
                  var flags
                  if (requireFlagsRefresh) {
                      // call PostHog /decide API - not billed $$$ for this
                      flags = await getPHFeatureFlags(distinctId)
                  } else {
                      flags = getExistingFeatureFlags(context)
                  }
                  // set cookies to pass data to client PostHog for bootstrapping
                  if (flags) {
                      const strFlag = encodeURIComponent(JSON.stringify(flags))
                      setCookie(context, "ff-feats", strFlag, 1)
                  }
                  if (flags && flags[flag] && flags[flag] === value) {
                      if (requireFlagsRefresh) {
                          // inform PostHog we have used a Feature Flag to track in our experiment - we are $$$ for this
                          await featureFlagCalled(distinctId, flag, value)
                      }
                      return `${content}`
                  } else if (!flags[flag] && value === 'control') {
                      // this is not a valid feature flag - fall back to the "control" content
                      console.warn(`WARN: Could not find feature flag: '${flag}'. Falling back to "control" content`)
                      return `${content}`
                  } else {
                      return ''
                  }
              } else if (value === 'control') {
                  console.warn('WARN: No PostHog API Key - Falling back to A/B "control" content across the website')
                  // fallback to control if we have no PostHog API key
                  return `${content}`
              }
          })
      });
      const distinctId = getDistinctId(context)
      setCookie(context, "ff-distinctid", distinctId, 1);
      const response = await edge.handleResponse();
      response.headers.set('X-Frame-Options', 'DENY')
      response.headers.set('Content-Security-Policy', "frame-ancestors 'none';")    
      return response
  } catch (e) {
      console.error("ERROR", { e });
      return context.next(e);
  }
};