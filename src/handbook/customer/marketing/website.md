---
navTitle: Marketing - Website
---

# Marketing Website

- All written content should be in UK English.
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
```

If there were more than one event, then duplicating that and updating the info will create the second banner for rotation. It would look like this:

```
- type: "Webinar"
  title: "Deploy FlowFuse on Industrial IoT with NCD.io"
  buttonText: "Learn more"
  link: "/webinars/2024/deploy-flowfuse-on-industrial-iot-with-ncd-io/"
- type: "New Release"
  title: "FlowFuse 2.4: making it easier to work with Snapshots, Blueprints & Devices "
  buttonText: "See blog post"
  link: "/blog/2024/05/flowfuse-2-4-release/"
```

If there is only one event, the banner will continuously display that event. If there are multiple events, the banner will rotate through them, displaying each one for a few seconds at a time.

Please also ensure that the banner is not disabled in [this file](https://github.com/FlowFuse/website/blob/main/src/_includes/layouts/base.njk). If it is, the code would look like this: 
`{% raw %}
{# {% include "../components/events-banner.njk" %} #}
{% endraw %}`. Please remove the comment symbols `{#` and `#}` to enable the banner.

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

## Meta Keywords

Meta keywords are a type of metadata that provide information about the content of a webpage. They are commonly used by search engines to understand the topics covered in a page and improve its visibility in search results.

### Default Keywords

By default, each webpage on the FlowFuse website includes a set of predefined keywords: **{{ site.messaging.keywords }}**. These default keywords are relevant to the overall theme of the website and help categorize the content.

### Priority of Keywords

When it comes to determining which keywords to include in the meta tags of a webpage, FlowFuse follows a specific priority order:

1. [**Tags:**](/handbook/customer/marketing/blog/#tags) The tags assigned to the content take precedence and are included as meta keywords. These tags are used to categorize the content and provide relevant context.

2. **Meta Keywords:** If no tags are available, the meta keywords specified in the front matter of the webpage are used. These meta keywords are specifically defined for each page and offer additional context.

3. **Default Keywords:** These keywords are always included and provide general information about the website's content. They can be appended to the keywords obtained from previous points. If neither tags nor meta keywords are present, the default keywords are used as a fallback option. 

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
