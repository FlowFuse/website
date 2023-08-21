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
  # This line serves as an example, but can safely be removed if it's no longer
  # needed 
  - { "from": "/blog/first-deploy/", "to": "/blog/2021/04/first-deploy/"}
# The "permalink" attribute determines where the output page will be located.
permalink: "{{ redirect.from }}"
# The "redirect" layout just has a small html header with the meta tags that do redirection.
layout: redirect
skipIndex: true
title: "You're being redirected"
---
(the content can be left blank; it's entirely the frontmatter doing the work here.)
