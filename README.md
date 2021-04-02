# FlowForge Website

[![Build Site](https://github.com/flowforge/website/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/flowforge/website/actions/workflows/build.yml)

This repository contains the source of the FlowForge website.

It is built using [Tailwind CSS](https://tailwindcss.com/) and [Eleventy](https://www.11ty.dev/).
It is hosted on GitHub Pages and every commit to the `main` branch is automatically
deployed using GitHub Actions.

## Building the site locally

After cloning the repository, install the project dependencies, then run the build and the eleventy server:

```bash
npm install

npm run serve
```

This will start a server on http://localhost:8080 that will live reload whenever
any content is changed. **Note:** if you modify `src/css/style.css` you will need
to run `npm run tailwind` to rebuild the CSS content.

## How to add blog posts

Add a new markdown file to `src/blog/` with the following metadata in the top:

```
---
title: My post title
subtitle: A subtitle
description: A short description of the post
date: 2020-04-06
authors: ["nick-oleary"]
---
```

The `authors` list should correspond to an entry under `src/_data/team`.

## Acknowledgements

This setup was inspired by:

 - [Eleventy Base Blog starter repository](https://github.com/11ty/eleventy-base-blog)
 - [Oxide.Computer's website setup](https://github.com/oxidecomputer/website)

