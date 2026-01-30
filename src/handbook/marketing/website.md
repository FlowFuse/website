---
navTitle: Marketing - Website
---

# Marketing Website

- All written content should be in US English.
- All page titles should summarise the content, keep the URL length as short as practical and use [Kebab Case](https://en.wiktionary.org/wiki/kebab_case).
- All images should use informative [alt tags](https://www.w3.org/WAI/tutorials/images/tips/) which clearly describe the point of an image rather than all the details. Alt tags should be no longer than 60 characters.
- When mentioning [FlowFuse Concepts](/docs/user/concepts/) (terminology) where possible we should link to an explanation of that concept.
- All written content should use the [Oxford Comma](https://en.wikipedia.org/wiki/Serial_comma). We believe the Oxford Comma reduces the ambiguity of written technical content.

## Events Banner

The event banner at the top of the website can display more than one event or announcement.

To add or update an event, you'll need to modify the [following file](https://github.com/FlowFuse/website/blob/main/src/_data/events.yaml). The information should be formatted as follows for each banner:

```
- type: "Webinar"
  title: "Deploy FlowFuse on Industrial IoT with NCD.io"
  buttonText: "Learn more"
  link: "/webinars/2024/deploy-flowfuse-on-industrial-iot-with-ncd-io/"
  expire: "2024-05-29T16:00:00Z"
```
The `expire` field is used to set the date and time when the event should stop being displayed on the banner. The date and time are set in the ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`, and the time is in Coordinated Universal Time (UTC).

For example, `expire: "2024-05-29T15:00:00Z"` means that the event will stop being displayed on the banner at 16:00 UTC on May 29, 2024.

Please note that the website is built once a day at 9:30 AM UTC, and also on Wednesdays and Thursdays at 16:05 UTC. This means that if an event expires at some point during the day, it will still be displayed until the next time the website is built.

If there were more than one event, then duplicating that and updating the info will create the second banner for rotation. It would look like this:

```
- type: "Webinar"
  title: "Deploy FlowFuse on Industrial IoT with NCD.io"
  buttonText: "Learn more"
  link: "/webinars/2024/deploy-flowfuse-on-industrial-iot-with-ncd-io/"
  expire: "2024-05-29T15:00:00Z"
- type: "New Release"
  title: "FlowFuse 2.4: making it easier to work with Snapshots, Blueprints & Devices "
  buttonText: "See blog post"
  link: "/blog/2024/05/flowfuse-2-4-release/"
  expire: "2024-05-20T15:00:00Z"
```

If there is only one event, the banner will continuously display that event. If there are multiple events, the banner will rotate through them, displaying each one for a few seconds at a time.

## Images

All images on the website, whether part of the blog or otherwise, are run though an [image pipeline](https://github.com/FlowFuse/website/blob/main/lib/image-handler.js), that compresses, resizes and converts the images to reduce file size and improve page loading speed.

That pipeline also generates x2 versions of images for high DPI screens if the provided image is large enough.

The first build locally will take roughly a minute, while the cache remains intact, all future builds should take only a few seconds.

Guidelines for including images:

- Downsize the image to at maximum two times the width it will be displayed (1300px for blog prose)
- Ideally use JPEG for lossy ok images, and PNG for others (they will be converted to AVIF and WebP regardless)
- Wherever possible use:
  - The markdown image include tag in blog prose: `![Name of Image](../relative-path-to-image.jpeg)` 
    - You can use the `@skip` tag to disable the image pipeline entirely for an image `![Name of Image](../relative-path-to-image.jpeg "@skip")`
  - The NJK shortcode in website body: {% raw %} `{% image "./relative-path-to-image.png", "Image alt tag for screen readers", [150] %}`{% endraw %}
    - Where 150 is the maximum width the image will be displayed on the page (source image should be two times this width)
- GIFs can grow incredibly large, consider using a video in a modern format if the animation is longer than a few seconds

## Non-Image Assets

If you need to include things other than images, e.g. Video or resource bundles (zip files), these should be uploaded to the `website-data` S3 bucket in the Production AWS account.

This can be done by [Ben](/team#ben-hardill), [Nick](/team#nick-oleary), [Piotr](/team#piotr-pawlowski) or [ZJ](/team#zeger-jan-van-de-weg).

A URL will be made available to include in the post.

## Meta Keywords

Meta keywords are a type of metadata that provide information about the content of a webpage. They are commonly used by search engines to understand the topics covered in a page and improve its visibility in search results.

### Default Keywords

By default, each webpage on the FlowFuse website includes a set of predefined keywords: **{{ site.messaging.keywords }}**. These default keywords are relevant to the overall theme of the website and help categorize the content.

### Priority of Keywords

When adding meta keywords to the website pages, a specific priority order is followed:

1. **Meta Keywords:** These are the keywords specified in the front matter of the webpage. They are specifically defined for each page and offer additional context.

2. **Keywords:** If no `meta.keywords` are found, the `keywords` specified in the front matter of the webpage are used.

3. [**Tags:**](/handbook/marketing/blog/#tags) If neither `meta.keywords` nor `keywords` are assigned, the `tags` assigned to the content are included as meta keywords. These tags are used to categorize the content and provide relevant context.

4. **Default Keywords:** These are always included and provide general information about the website's content. They can be appended to the keywords obtained from previous points, or, if neither of the previous conditions are met, the default keywords are used as a fallback option.

### Adding Meta Keywords

To specify meta keywords for a webpage, include them in the front matter of the Markdown file. Here's an example:

```yaml
---
title: Example Page
meta:
  keywords: flowfuse, flows, manufacturing
---
```

## Reviewing Pull Requests

When creating a PR and requesting a review from a FlowFuse team member, please consider if
the content is ready to be released ASAP or if its release should be to a particular schedule. If you
don't want the reviewer to merge the content (in effect put it live on the website) mark the PR as a draft in GitHub.
If you are reviewing a website PR and it is not marked as draft you can merge it, otherwise simply review and where appropriate approve the PR.

### Preview URLs

[FlowFuse/website](https://github.com/FlowFuse/website) PRs automatically receive Netlify preview deployment URLs. Look for the Netlify bot comment on the PR with the preview link to review your changes before merging.
