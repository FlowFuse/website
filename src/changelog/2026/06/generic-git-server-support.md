---
title: Connect Pipelines to Any Git Server
description: DevOps Pipeline Git stages now push and pull snapshots to any HTTPS Git server — GitLab, Bitbucket, Gitea, or self-hosted — including servers behind a private certificate authority.
date: 2026-06-29 12:00:00
authors: ['noley-holland']
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/flowfuse/issues/5294
---

DevOps Pipeline Git Repository stages now connect to **any Git server that speaks HTTPS** — GitLab, Bitbucket, Gitea, or a self-hosted instance — not just GitHub and Azure DevOps.

Previously, Git integration only worked with those two providers. If your team backs up flows to a self-hosted GitLab or an on-prem Bitbucket, you were stuck. Now you can point a pipeline at any HTTPS Git repository to back up and deploy your flows.

For servers that use a private certificate authority, you can paste in a CA certificate so FlowFuse trusts the connection — no infrastructure changes required.

To get started:

1. Go to **Team Settings → Integrations → Add Token**.
2. Choose **Other**, then enter the repository **username** and a personal access token (or app password).
3. If your server uses a private CA, paste its certificate into the **CA Certificate** field.
4. Add a **Git Repository** stage to a pipeline, select your token, and enter the repository URL.

![The Add Git Token dialog showing the GitHub, Azure DevOps, and Other provider options, with the Other option selected and the username and CA certificate fields visible](./images/generic-git-provider.png)
*Creating a generic Git token for a self-hosted server.*

This feature is available to Team and Enterprise tier users of FlowFuse Cloud and Enterprise Licensed Self Hosted users from v2.33.
