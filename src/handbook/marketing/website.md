---
navTitle: Marketing - Website
---

# Marketing Website

- All written content should be in UK English.
- All page titles should summarise the content, keep the URL length as short as practical and use [Kebab Case](https://en.wiktionary.org/wiki/kebab_case).
- All images should use informative [alt tags](https://www.w3.org/WAI/tutorials/images/tips/) which clearly describe the point of an image rather than all the details. Alt tags should be no longer than 60 characters.
- When mentioning [FlowFuse Concepts](/docs/user/concepts/) (terminology) where possible we should link to an explanation of that concept.
- All written content should use the [Oxford Comma](https://en.wikipedia.org/wiki/Serial_comma). We believe the Oxford Comma reduces the ambiguity of written technical content.

### Website Inspiration

For the creative aspect of the website and its UX, we refer to a few B2B sites for various page patterns whether it's the layout, user flow, or interactions, and this may extend to other aspects as well. Here's a list:

1. [Asana](https://asana.com/)
2. [GitLab](https://about.gitlab.com)
3. [Adyen](https://www.adyen.com/)
4. [FleetDM](https://fleetdm.com/)
5. [Ionic](https://ionic.io/)

## Events Banner

To update the event banner that appears at the top of the Website, you will need two pieces of information:

- The title of the Webinar
- URL that the Webinar Registration is hosted at

Once you have those, you can update the [following file](https://github.com/FlowFuse/website/blob/main/src/_includes/components/events-banner.njk):

Update the `href=""` value of the `<a>` tag to update the Event URL, and change the title inside the middle `<span>`

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

## Reviewing Pull Requests

When creating a PR and requesting a review from a FlowFuse team member, please consider if
the content is ready to be released ASAP or if its release should be to a particular schedule. If you
don't want the reviewer to merge the content (in effect put it live on the website) mark the PR as a draft in GitHub.
If you are reviewing a website PR and it is not marked as draft you can merge it, otherwise simply review and where appropriate approve the PR.
