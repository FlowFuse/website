---
title: Bearer Token Authentication for Node-RED Instances
description: FlowFuse now supports Bearer Token authentication for Node-RED instances, ensuring secure access to HTTP endpoints.
date: 2024-03-14 10:00:00.0
authors: ["marian-demme", "ben-hardill"]
tags:
    - changelog
---
Bearer Token Authentication for Node-RED Instances, allows FlowFuse users to securely access their Node-RED HTTP endpoints, ensuring enhanced security and ease of implementation. Now, you can confidently manage your HTTP endpoints with the assurance that your connections are protected using FlowFuse's robust authentication mechanism. 

![Screenshot Instance Setting Bearer Token](./images/bearer-token-authentication.png)

![Screenshot of New Bearer Token](./images/bearer-token-exampe.png)

```bash
$ curl -H "Authorization: Bearer ffhttp_FKc_S4qlTBV1H411hmhneHcSJ6F_FGNQLPYbnoD3-B0" https://healthy-rook-4329.flowforge.cloud/test
HelloWorld
$
```

This feature is available for our Teams and Enterprise Tier customers. You can find the configuration under the Security tab in your instance settings.