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
  - { "from": "/blog/2023/06/Flowforge-as-a-No-Code-Ethernet_IP-to-Profinet-Protocol-Converter/", "to": "/blog/2023/06/node-red-as-a-no-code-ethernet_ip-to-s7-protocol-converter/" }
  - { "from": "/docs/user/devices/", "to": "/docs/device-agent/introduction" }
  - { "from": "/blog/2023/06/node-explained-split/", "to": "/node-red/learning-resources/core-nodes/split/"}
  - { "from": "/blog/2023/07/node-explained-filter/", "to": "/node-red/learning-resources/core-nodes/filter/"}
  - { "from": "/blog/2022/12/node-red-exec-explained/", "to": "/node-red/learning-resources/core-nodes/exec/"}
  - { "from": "/blog/2023/05/Integrating Modbus with Node-RED", "to": "/blog/2023/05/integrating-modbus-with-node-red/"}
  - { "from": "/handbook/development/observability/", "to": "/handbook/development/ops/observability/" }
  - { "from": "/handbook/development/staging/", "to": "/handbook/development/ops/staging/" }
  - { "from": "/handbook/development/how-we-work/staging/", "to": "/handbook/development/ops/staging/" }
  - { "from": "/handbook/development/how-we-work/security/", "to": "/handbook/development/security/" }
  - { "from": "/handbook/development/how-we-work/packaging/", "to": "/handbook/development/packaging/" }
  - { "from": "/handbook/development/how-we-work/contributing/", "to": "/handbook/development/contributing/" }
  - { "from": "/handbook/development/how-we-work/", "to": "/handbook/development/" }
  - { "from": "/handbook/development/git-how-to/", "to": "/handbook/company/guides/git/" }
  - { "from": "/handbook/development/guides/git/", "to": "/handbook/company/guides/git/" }
  - { "from": "/handbook/development/markdown-how-to/", "to": "/handbook/company/guides/markdown/" }
  - { "from": "/handbook/development/guides/markdown", "to": "/handbook/company/guides/markdown/" }
  - { "from": "/handbook/development/guides/", "to": "/handbook/company/guides/" }
  - { "from": "/blog/2023/08/uns-article/", "to": "/blog/2023/08/isa-95-automation-pyramid-to-unified-namespace/" }
  - { "from": "/blog/2023/08/UNS-article/", "to": "/blog/2023/08/isa-95-automation-pyramid-to-unified-namespace/" }
  - { "from": "/blog/2023/02/3-quick-node-red-tips-1/", "to": "/node-red/learning-resources/quick-tips/node-red-tips-1/" }
  - { "from": "/blog/2023/02/3-quick-node-red-tips-2/", "to": "/node-red/learning-resources/quick-tips/node-red-tips-2/" }
  - { "from": "/blog/2023/03/3-quick-node-red-tips-3/", "to": "/node-red/learning-resources/quick-tips/node-red-tips-3/" }
  - { "from": "/blog/2023/03/3-quick-node-red-tips-4/", "to": "/node-red/learning-resources/quick-tips/node-red-tips-4/" }
  - { "from": "/blog/2023/03/3-quick-node-red-tips-5/", "to": "/node-red/learning-resources/quick-tips/node-red-tips-5/" }
  - { "from": "/blog/2023/04/3-quick-node-red-tips-6/", "to": "/node-red/learning-resources/quick-tips/node-red-tips-6/" }
  - { "from": "/blog/2024/05/understanding-node-flow-global-environment-variables-in-node-red/", "to": "/node-red/learning-resources/variables/" }
  - { "from": "/product/", "to": "/product/features/" }
  - { "from": "/product/why-flowfuse/", "to": "/product/features/" }
  - { "from": "/features/", "to": "/product/features/" }
  - { "from": "/webinars/2024/deploy-flowfuse-on-industrial-iiot-with-ncd-io/", "to": "/webinars/2024/deploy-flowfuse-on-industrial-iot-with-ncd-io/" }

# The "permalink" attribute determines where the output page will be located.
permalink: "{{ redirect.from }}"
# The "redirect" layout just has a small html header with the meta tags that do redirection.
layout: redirect
skipIndex: true
title: "You're being redirected"
---
(the content can be left blank; it's entirely the frontmatter doing the work here.)
