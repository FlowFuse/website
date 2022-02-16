---
title: FlowForge 0.2 released
subtitle: Making the first release of the platform and transitioning to open development
description: Making the first release of the platform and transitioning to open development
date: 2022-02-17 12:00:00.0
authors: ["zeger-jan-van-de-weg"]
---

Four weeks have passed since our initial release of FlowForge, and we're happy
to release v0.2 today with many improvements!

- Announce we're launching a SaaS soon?
- Stability improvements
- Deployment to managed k8s
- #flowforge on the Node-RED slack

<!--more-->

TODO: For each log dump, check if we need to write something about it.

### docker-compose changes:

fc38f83 (tag: v0.2.0, origin/main) Merge pull request #4 from flowforge/readme-update
52542e4 Merge pull request #3 from flowforge/project-automation
add498e Merge pull request #2 from flowforge/dns-readme

### Helm chart changes

0bbff63 (tag: v0.2.0, origin/main) Merge pull request #5 from flowforge/aws-deploy
76a8aaa Merge pull request #4 from flowforge/ses-email
d98511e Merge pull request #3 from flowforge/alb-updates
80666ff Merge pull request #2 from flowforge/project-automation
c9bdeb0 Merge pull request #1 from flowforge/optional-postgres

### audit logger

6fae8b6 (tag: v0.2.0, origin/main) Merge pull request #6 from flowforge/lint
ed5b829 Merge pull request #5 from flowforge/project-automation

### NR audit


057e5a5 (tag: v0.2.0, origin/main) Merge pull request #7 from flowforge/lint
a5519cd Merge pull request #8 from flowforge/update-deps
a1f1cc1 Merge pull request #6 from flowforge/project-automation

## NR launcher

41240e8 (tag: v0.2.0, origin/main) Merge pull request #15 from flowforge/215-set-editor-to-monaco
0492aa4 Merge pull request #14 from flowforge/project-automation

## NR storage

3f25bbc (tag: v0.2.0, origin/main) Merge pull request #5 from flowforge/lint
3d65eca Merge pull request #4 from flowforge/project-automation

## Driver docker

513675d (tag: v0.2.0, origin/main) Merge pull request #10 from flowforge/update-deps
d75203f Merge pull request #9 from flowforge/shutdown
6ca151c Merge pull request #8 from flowforge/http-vs-https
9bc79f9 Merge branch 'linter-pr' into main
9a281c3 Merge pull request #6 from flowforge/project-automation

## Driver k8s

286538d (tag: v0.2.0, origin/main) Merge pull request #13 from flowforge/upgrade-components
f9f091f Merge pull request #11 from flowforge/shutdown
5aa781b Merge pull request #10 from flowforge/resource-limts
82ffc84 Merge pull request #9 from flowforge/http-vs-https
e0f0b1e Merge pull request #8 from flowforge/alb-groups
ffa11f7 (tag: v0.1.1) Merge pull request #7 from flowforge/release-0.1.1
767e258 Merge pull request #6 from flowforge/linter
418c485 Merge pull request #5 from flowforge/project-automation

## Local FS

6161167 (tag: v0.2.0, origin/main) Merge pull request #24 from flowforge/shutdown
75d0436 Merge pull request #22 from flowforge/lint
803a7ff Merge pull request #20 from flowforge/project-automation

## Installer

58350d5 (tag: v0.2.0, tag: v0.1.1, origin/main) Merge pull request #26 from flowforge/release-0.1.1
0c2b4c2 Merge pull request #24 from Steve-Mcl/windows-info-readme
7835763 Merge pull request #23 from flowforge/release-0.1.1
2a1efb1 Merge pull request #22 from flowforge/project-automation
1ec7b34 Merge pull request #21 from flowforge/windows-fixes
8571785 Merge pull request #19 from flowforge/fix-gh-action
22f168d Merge pull request #18 from flowforge/fix-gh-action
a4f8d2a Merge pull request #17 from flowforge/fix-gh-action
ff70c40 Merge pull request #16 from flowforge/fix-gh-action
cb7c33f Merge pull request #15 from flowforge/fix-gh-action
7372a7f Merge pull request #14 from flowforge/hardillb-patch-2
8846317 Merge pull request #13 from flowforge/hardillb-patch-1


### FlowForge itself:

4eefb90 (tag: v0.2.0, origin/main) Merge pull request #303 from flowforge/telemetry-docs
a23d46e Merge pull request #302 from flowforge/fix-team-admin
0c6558c Merge pull request #293 from flowforge/0.2.0-doc-update
2b54ffb Merge pull request #297 from flowforge/admin-view-all-teams
67353ce Merge pull request #301 from flowforge/fix-add-to-team
b5888ef Merge pull request #284 from flowforge/sammachin-teams_slug
2c0f806 Merge pull request #292 from flowforge/project-create-premision
0879b8f Merge pull request #290 from flowforge/docker-docs
ea1426d Merge pull request #265 from flowforge/docker-docs
3b9b46f Merge pull request #276 from flowforge/hardillb-patch-4
4b5586e Merge pull request #283 from flowforge/fix-tests-again
68661e2 Merge pull request #281 from flowforge/driver-shutdown-hook
177b105 Merge pull request #282 from flowforge/fix-tests
27cdbc9 Merge pull request #274 from flowforge/telemetry
cbfb915 Merge pull request #267 from flowforge/fix-startup
0651f93 Merge pull request #263 from flowforge/migration-the-third
738d051 Merge pull request #262 from flowforge/hardillb-patch-5
9bf8c9f Merge pull request #261 from flowforge/postgres-audit
5e42793 Merge pull request #259 from flowforge/hardillb-patch-3
a259808 Merge pull request #258 from flowforge/update-deps
1c90672 Merge pull request #257 from flowforge/knolleary-patch-2
f3f41de Merge pull request #255 from flowforge/test-it
85fb972 Merge pull request #256 from flowforge/postoffice-ses
fb27870 Merge pull request #254 from flowforge/postoffice-ses
af475e9 Merge pull request #249 from flowforge/seed-cookie
cf2d755 Merge pull request #248 from flowforge/move-stub
6f56967 Merge pull request #244 from flowforge/eslint-the-things
0e24943 Merge pull request #243 from flowforge/check-versions
1305b53 Merge pull request #228 from flowforge/update-readme
ab73f40 Merge pull request #230 from flowforge/project-automation
b459c5f Merge pull request #206 from flowforge/issue-templates
d3a239f Merge pull request #201 from flowforge/hardillb-patch-2
c2934ca (tag: v0.1.1) Merge pull request #200 from flowforge/release-0.1.1

### Upgrading FlowForge

TODO

### CTA

- mailing list subscribe
- Link getting started docs https://github.com/flowforge/flowforge/tree/main/docs

# Staying up to date:

- Mailing list CTA
- Join #flowforge on the Node-RED Slack
