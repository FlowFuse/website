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
  - { "from": "/roadmap/", "to": "/changelog/" }
  - { "from": "/product/roadmap/", "to": "/changelog/" }
  - { "from": "/handbook/development/release/", "to": "/handbook/development/releases/" }
  - { "from": "/blog/2023/06/Flowforge-as-a-No-Code-Ethernet_IP-to-Profinet-Protocol-Converter/", "to": "/blog/2023/06/node-red-as-a-no-code-ethernet_ip-to-s7-protocol-converter/" }
  - { "from": "/docs/user/devices/", "to": "/docs/device-agent/introduction" }
  - { "from": "/blog/2023/06/node-explained-split/", "to": "/node-red/core-nodes/split/"}
  - { "from": "/blog/2023/07/node-explained-filter/", "to": "/node-red/core-nodes/rbe/"}
  - { "from": "/blog/2022/12/node-red-exec-explained/", "to": "/node-red/core-nodes/exec/"}
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
  - { "from": "/product/", "to": "/product/features/" }
  - { "from": "/product/why-flowfuse/", "to": "/product/features/" }
  - { "from": "/features/", "to": "/product/features/" }
  - { "from": "/node-red/core-nodes/rbe/", "to": "/node-red/core-nodes/filter/" }
  - { "from": "/webinars/2024/deploy-flowfuse-on-industrial-iiot-with-ncd-io/", "to": "/webinars/2024/deploy-flowfuse-on-industrial-iot-with-ncd-io/" }
  - { "from": "/blog/2024/02/postgresql-with-node-red/", "to": "/node-red/database/postgresql/" }
  - { "from": "/blog/2024/04/using-mongodb-with-node-red/", "to": "/node-red/database/mongodb/" }
  - { "from": "/blog/2024/04/integrate-dynamodb-with-node-red/", "to": "/node-red/database/dynamodb/" }
  - { "from": "/blog/2023/07/connect-node-red-to-influxdb/", "to": "/node-red/database/influxdb/" }
  - { "from": "/blog/2023/09/dashboard-chart-for-rest-api-data/", "to": "/node-red/integration-technologies/rest" }
  - { "from": "/blog/2024/04/using-webhook-with-node-red/", "to": "/node-red/integration-technologies/webhook/" }
  - { "from": "/blog/2023/07/how-to-build-a-secure-opc-ua-server-for-plcs-in-node-red/", "to": "/node-red/protocol/opa-ua/" }
  - { "from": "/blog/2023/06/connect-to-hivemq-in-flowforge/", "to": "/node-red/protocol/mqtt/" }
  - { "from": "/blog/2023/11/raspberry-pi-5-flowfuse-edge-agent/", "to": "/node-red/hardware/raspberry-pi-5/" }
  - { "from": "/blog/2024/03/flowfuse-on-siemens-iot2050/", "to": "/node-red/hardware/siemens-iot-2050/" }
  - { "from": "/blog/2024/04/sending-and-receiving-telegram-messages-with-node-red/", "to": "/node-red/notification/telegram/" }
  - { "from": "/blog/2024/04/how-to-send-and-receive-emails-using-node-red/", "to": "/node-red/notification/email/" }
  - { "from": "/blog/2024/01/barcode-scanner-into-nodered/", "to": "/node-red/peripheral/barcodescanner/" }
  - { "from": "/blog/2024/03/using_webcam_with_node-red/", "to": "/node-red/peripheral/webcam/" }
  - { "from": "/blog/2023/05/visualize-production-data-via-modbus-in-node-red/", "to": "/node-red/protocol/modbus/" }
  - { "from": "/blog/flowforge/", "to": "/blog/flowfuse/" }
  - { "from": "/node-red/core-nodes/httpin/", "to": "/node-red/core-nodes/http-in/" }
  - { "from": "/node-red/core-nodes/httprequest/", "to": "/node-red/core-nodes/http-request/" }
  - { "from": "/node-red/core-nodes/file/", "to": "/node-red/core-nodes/write-file/" }
  - { "from": "/node-red/core-nodes/watch/", "to": "/node-red/core-nodes/read-file/" }
  - { "from": "/node-red/core-nodes/tcpin/", "to": "/node-red/core-nodes/tcp-in/" }
  - { "from": "/node-red/core-nodes/httpproxy/", "to": "/node-red/core-nodes/http-proxy/" }
  - { "from": "/blueprints/manufacturing/manfacturing-support-request-blueprint/", "to": "/blueprints/manufacturing/manufacturing-support-request/" }
  - { "from": "/blog/2024/06/filtering-mapping-sorting-reducing-with-node-red/", "to": "/node-red/getting-started/programming/data-tranformation/" }
  - { "from": "/blog/2024/09/node-red-if-else-logic-guide/", "to": "/node-red/getting-started/programming/if-else/" }

# The "permalink" attribute determines where the output page will be located.
permalink: "{{ redirect.from }}"
# The "redirect" layout just has a small html header with the meta tags that do redirection.
layout: redirect
skipIndex: true
title: "You're being redirected"
---
(the content can be left blank; it's entirely the frontmatter doing the work here.)
