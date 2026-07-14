---
title: "Markdown Guide"
---

# Markdown Guide

This is a very short reference guide for those trying to write Markdown. For more
comprehensive guides, we recommend looking at:

 - [Markdown Guide's Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
 - [GitHub's Getting Started with Markdown Guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Header

```md
# First-Tier Header
## Second-Tier Header
### Third-Tier Header
#### Fourth-Tier Header
```

## Paragraph

Hello There, this is a paragraph that is split over
multiple lines in the source, but displays as a single
formatted paragraph.

To start a new paragraph, we separate it with a blank line
from the previous paragraph.

```md
Hello There, this is a paragraph that is split over
multiple lines in the source, but displays as a single
formatted paragraph.

To start a new paragraph, we separate it with a blank line
from the previous paragraph.
```

## List - Bullet Points

- this is a bullet point list
- this is another item in the list

```md
- this is a bullet point list
- this is another item in the list
```


## List - Numbered

1. this is a numbered list
2. this is another item in the list

```md
1. this is a numbered list
2. this is another item in the list
```

To prevent reordering and keeping count, Markdown allows you to use non-sequential numbers:

```
1. Item one
1. Item two
```

1. Item one
1. Item two

## Text Format - Italic

*this will be italic*

```md
*this will be italic*
```

## Text Format - Italic

**this will be bold**

```md
**this will be bold**
```

## Links

[this will be a link](http://example.com/)

```md
[this will be a link](http://example.com/)
```

## Images

A picture speaks a thousand words, to include an image in your content it's like a link
but with an `!` in front of it.

```md
![Image Name](image.jpg "alt text when you hover the image")
```

### Adding images to handbook pages

1. Place the image file in `nuxt/public/handbook/images/` (or a subfolder, e.g. `nuxt/public/handbook/images/screenshots/`).
2. Reference it with an absolute path starting from `/handbook/images/`:

```md
![A screenshot of the dashboard](/handbook/images/screenshots/my-screenshot.png)
```

Images in the handbook are automatically optimised on delivery — resized to fit the viewer's screen, converted to WebP or AVIF where supported, and compressed — so there is no need to manually compress or resize images before committing them. Do not run them through an external compression tool first, as that would apply lossy compression twice.

## Quoting

> this will quote some text

```md
> this will quote some text
```

## Code Example

For `inline` quoting, use single backticks:

```md
For `inline` quoting, use single backticks.
```

For block quotes, use triple backticks:

```
this will write the content as if it is code
```

````md
```
this will write the content as if it is code
```
````

Add syntax highlighting by defining the language, for example:

```js
console.log("Hello, world!")
```

````md
```js
console.log("Hello, world!")
```
````

## Callout boxes

Use callout boxes to highlight important information that readers might otherwise skip. Three types are available:

::note
This is a **note** callout. Use it for general information worth calling out.
::

::warning
This is a **warning** callout. Use it for something the reader should be careful about.
::

::caution
This is a **caution** callout. Use it for potential data loss, security risks, or irreversible actions.
::

### Which syntax to use

Since we're in the middle of a migration from 11ty to Nuxt, there are two syntaxes available, pick the one you need according to the location of the files.

**Handbook pages** (`nuxt/content/handbook/`):

```md
::note
Content here.
::

::warning
Content here.
::

::caution
Content here.
::
```

**Docs, blog, and changelog pages** (`src/docs/`, `src/blog/`, `src/changelog/`):

```
{% note %}
Content here.
{% endnote %}

{% warning %}
Content here.
{% endwarning %}

{% caution %}
Content here.
{% endcaution %}
```
