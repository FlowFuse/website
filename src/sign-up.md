---
# Inspired by https://github.com/11ty/eleventy/issues/510#issuecomment-824104799
#
# This file generates redirects for pages that have moved.
#
pagination:
  data: redirects
  size: 1
  alias: redirect
# Add your redirection tuples to this list!
redirects:
  - { "from": "/sign-up/", "to": "https://app.flowforge.com/account/create"}
# The "permalink" attribute determines where the output page will be located.
permalink: "{{ redirect.from }}"
# The "redirect" layout just has a small html header with the meta tags that do redirection.
layout: redirect
title: "Create an account for FlowForge"
sitemapPriority: 0.9
---
(the content can be left blank; it's entirely the frontmatter doing the work here.)
