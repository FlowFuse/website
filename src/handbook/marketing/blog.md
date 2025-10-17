---
meta:
    title: Marketing - Blog
---

# Blog

## Blogging Process

Content creation and blogging are effective ways to communicate with our community and are tied to our SEO performance and our [Social Media Strategy](/handbook/marketing/social-media/#strategy-for-increasing-reach). The process for publishing a blog is as follows:

1. Create an initial issue or tie your blog to one of your scheduled issues [here](https://github.com/orgs/FlowFuse/projects/21/views/1).
1. Issues should be assigned a date, which should be posted here in this [Github projects](https://github.com/orgs/FlowFuse/projects/21/views/1). The target date for review should be at least three working days before the planned posting date on social media. Check the [social media planning and posting section](/handbook/marketing/social-media/#planning-and-posting).
1. Create an [art request](/handbook/design/art-requests/#creating-an-art-request) for a blog tile to go with your article and share a deadline for when you're planning it to go live. This image will be used not only on the web, but also when the content is promoted on socials. If the content is time sensitive, a [temporary tile](/handbook/marketing/blog/#temporary-blog-tile-image-process) can be used instead. 
1. Create a PR requests with your Blog Content.
1. Assign yourself as an Assignee.
1. Convert to Draft
1. No Reviews shall be done until the PR is “Ready for Review”
1. Assign two reviewers
    * One Reviewer for Content (ZJ)
    * One Reviewer for SEO.
1. If the content is time-sensitive, please make sure everyone involved is aware of this. 
1. Content will be reviewed first.
1. SEO will be reviewed second.
1. When both reviews are done*, the Author or SEO reviewer can merge. In the event of an external author, SEO/content review will merge.
1. Once merged, SEO Reviewer will promote on FlowFuse Social channels. Check the [social media planning and posting section](/handbook/marketing/social-media/#planning-and-posting) for guidance and considerations.

### Temporary Blog Tile Image Process

**When no designer is available and the content is time-sensitive**, you may create a temporary blog tile so we can publish without delay. Please still open an art request so a designer can update the image later.

Options and steps:

1. **Default Image**  
   Useful when urgency is driven by SEO/indexing and social sharing can happen later, once a proper tile is available.  
   If you don’t add an image to the article front matter, a default branded image will be automatically applied.

1. **Use existing assets from the article**  
   Useful when it’s fine for the article to use the default image, and you just need something quick for the social post.  
   If the article already contains screenshots, diagrams, or videos, you can reuse one of those for the post.

1. **Create a quick tile from a template**  
   - If no other assets are available, this is how you can create a custom one for your article.  
   - Go to the [Google Slides Template Gallery](https://docs.google.com/presentation/u/0/?ftv=1&folder=1FlyDcmraih3uJ-D__v9qoHrBsNw8phkY&tgif=d) and pick any template that starts with **“Blog Post”** — this will create a copy in your Google Drive.  
   - Move the copy to a folder named after the article inside [this shared Drive folder](https://drive.google.com/open?id=1w99oFeCCcbVVkOxkzmwKlrwjWzAJFOWM&usp=drive_fs).  
   - Edit the title and visuals, then **export the slide as a .png** and add it to your article.  
   - Templates are available in three styles: text-only, text + icons, and full-image.

1. **If you choose a full-image approach**  
   - Use a royalty-free stock photo (recommended sources):  
     - [Adobe Stock (Free)](https://stock.adobe.com/es/search/free) (if you have corporate access)  
     - [Pexels](https://www.pexels.com/)  
     - [Unsplash](https://unsplash.com/)  
   - You can also use AI-generated images, but avoid artworks or graphics. Stick to realistic, photo-style images such as shop floors, people, or equipment. Current AI tools aren’t yet reliable for producing artwork aligned with our visual identity.  
   - Stock and AI-generated images are often high-resolution and in different aspect ratios. **Always place or import the image into the Google Slides template and export from there** to match FlowFuse’s required tile dimensions. Make sure your original image is at least **1600px wide** for optimal quality.


## Blog CMS

When creating a blog post there are several headers which are used by the CMS to populate the blogs as well as the blog index page. e.g:


```njk
---
title: The title
subtitle: The subtitle
description: The description
date: 2022-12-20
authors: ["rob-marcer"]
tags:
    - posts
    - node-red
    - how-to
---

above more
<!--more-->
below more
```

### Title

The title of the page can be seen on both the blog index and the articles.

### Subtitle

The subtitle is only shown on the articles.

### Description

Provides the (OpenGraph) description for social media sharing and may appear on search engine results pages. Also used on the `/blog` page for past articles. Keep it unique, simple, and concise, capturing the essence of the content within 80 to 220 characters, ideally around 160.

### Date

The data can be seen on both the blog index and the articles.

The `date` field in the blog post front matter serves a crucial role in determining when a blog post is published. You can set this field to a future date if you wish to schedule your blog post for publication on a specific day. See the [Scheduling a blog post](#scheduling-a-blog-post) section for more details.

### Authors

The author can be seen on both the blog index and the articles. If you need to add multiple authors, it can be achieved in this way:
```njk
authors: ["rob-marcer", "joe-pavitt"]
```
If the authors are FlowFuse team members, the names need to be formatted inline with the file names found [here](https://github.com/FlowFuse/website/tree/main/src/_data/team)

If they're not FlowFuse team members, they need to be added to the [guests list](https://github.com/FlowFuse/website/tree/main/src/_data/guests). Duplicate any of the files already in that folder, proceed to change the name of the file and update the info inside the `json` file. You'll also need to add a headshot in the images/team [folder](https://github.com/FlowFuse/website/tree/main/src/images/team) following the same name convention as the rest of the files.

### Tags

Tag your content appropriately from the collection of tags that help us manage our blog content. They include:

- `node-red`
- `flowfuse`
- `how-to`
- `dashboard`
- `community`
- `releases`
- `news`
- `unified-namespace`

There's a page with a collection of posts for each tag in that list.

#### Custom Tags

You can also add your own custom tags. While these won't create a new page with a collection of posts, they will help suggest related articles. Keep in mind that for an article to be considered related, the majority of tags must match, with allowance for a difference in one tag.

#### Meta Keywords

Additionally, the tags you assign to your content will also be used as [meta keywords](/handbook/marketing/website/#meta-keywords) for each article, alongside the [default keywords](/handbook/marketing/website#default-keywords).

### Adding Images

Images can be added into the respective `/blog/<year>/<month>/images` folder.

The image can then be referenced in the markdown file like so:

```md
![Alt Text](./images/<image>.png){data-zoomable}
<figcaption>Caption Here</figcaption>
```

- `Alt Text` is the text that will be displayed if the image fails to load.
- `./images/<image>.png` is the path to the image.
- `{data-zoomable}` is an optional attribute that allows the image to be zoomed in when clicked. It is recommended to use this as users can often explore images in more detail.
- `<figcaption>Caption Here</figcaption>` is an optional caption that will be displayed below the image. It is recommended to use these, as it makes the article easier to read.

### More tag

The `<!--more-->` tag is used to define the text shown in the blog index from each article.

### Example blog index item based on the header above

![Example of how the headers are shown on the blog index](./images/blog-index.png)

### Example blogs based on the header above

![Example of how the headers are shown on blogs](./images/blog-article.png)

### Rendering Node-RED Flows

The blog uses a flow renderer to make it easier for users to understand what the
flow looks like and how to use them. Furthermore it automatically provides a
download and copy button too for users to use what they've learned.

To render a flow you'll need to export it to JSON in Node-RED and paste it in a
`renderFlow` shortcode:

{% raw %}
```
{% renderFlow %}
<flowJSONHere>
{% endrenderFlow %}
```
{% endraw %}

### Writing content

FlowFuse blog posts are written in markdown. To learn how to style content and
have a nice markup for your content, please read the [markdown guide](/handbook/company/guides/markdown/)

### Scheduling a blog post

By setting a future date, the blog post will be automatically scheduled for publication on the specified date. This allows contributors to plan ahead and coordinate blog posts with events or marketing strategies. The post will be published at the next deploy after the `date` is set, a daily deploy is done at noon GMT.

Feel free to request reviews and merge your blog post when it's ready, even if the publication date is set in the future. This provides the flexibility to collaborate, make revisions, and ensure the content is polished well before it goes live.
The post, to be published in the future, will be rendered when developing locally and on deployment previews.

By utilizing the scheduling feature, we can maintain a consistent and organized publishing schedule without the need for last-minute adjustments.
