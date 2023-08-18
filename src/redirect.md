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
  - { "from": "/blog/first-deploy/", "to": "/blog/2021/04/first-deploy/"}
  - { "from": "/blog/welcome-ben/", "to": "/blog/2021/05/welcome-ben/" }
  - { "from": "/blog/welcome-sam/", "to": "/blog/2021/05/welcome-sam/" }
  - { "from": "/blog/welcome-zj/", "to": "/blog/2022/01/welcome-zj/" }
  - { "from": "/blog/welcome-steve/", "to": "/blog/2022/01/welcome-steve/" }
  - { "from": "/blog/flowforge-01-released/", "to": "/blog/2022/01/flowforge-01-released/" }
  - { "from": "/blog/community-news-01/", "to": "/blog/2022/01/community-news-01/" }
  - { "from": "/blog/welcome-joe/", "to": "/blog/2022/02/welcome-joe/" }
  - { "from": "/blog/use-case-solar-afloat/", "to": "/blog/2022/02/use-case-solar-afloat/" }
  - { "from": "/blog/flowforge-02-released/", "to": "/blog/2022/02/flowforge-02-released/" }
  - { "from": "/blog/announcing-flowforge-cloud/", "to": "/blog/2022/02/announcing-flowforge-cloud/" }
  - { "from": "/blog/community-news-02/", "to": "/blog/2022/03/community-news-02/" }
  - { "from": "/blog/flowforge-03-released/", "to": "/blog/2022/03/flowforge-03-released/" }
  - { "from": "/blog/2023/03/comparinig-dashboards/", "to": "/blog/2023/03/comparing-node-red-dashboards" }
  - { "from": "/roadmap/", "to": "/product/roadmap/" }
  - { "from": "/handbook/development/release/", "to": "/handbook/development/releases/" }
  - { "from": "/blog/2023/06/Flowforge-as-a-No-Code-Ethernet_IP-to-Profinet-Protocol-Converter/", "to": "/blog/2023/06/Node-RED-as-a-No-Code-Ethernet_IP-to-S7-Protocol-Converter/" }
  - { "from": "/docs/user/devices/", "to": "/docs/device-agent/introduction" }
  - { "from": "/blog/2023/06/node-explained-split/", "to": "/node-red/core-nodes/split/"}
  - { "from": "/blog/2023/07/node-explained-filter/", "to": "/node-red/core-nodes/rbe/"}
  - { "from": "/blog/2022/12/node-red-exec-explained/", "to": "/node-red/core-nodes/exec/"}
# The "permalink" attribute determines where the output page will be located.
permalink: "{{ redirect.from }}"
# The "redirect" layout just has a small html header with the meta tags that do redirection.
layout: redirect
skipIndex: true
title: "You're being redirected"
---
(the content can be left blank; it's entirely the frontmatter doing the work here.)
