---
title: "Why Manufacturing Needs GitOps"
subtitle: "Bringing the same change management discipline manufacturers apply to machines to the software running alongside them"
description: "Manufacturing has always managed change on the factory floor with discipline. Learn how GitOps and FlowFuse DevOps Pipelines bring that same rigor to industrial software deployments."
date: 2026-07-03
authors: ["sumit-shinde"]
image: /blog/2026/07/images/why-manufacturing-need-gitops-tile.png
tags:
  - flowfuse
meta:
  howto:
    name: "Set Up a GitOps Workflow for Industrial Applications with FlowFuse"
    description: "Use FlowFuse DevOps Pipelines to push approved application versions to your organization's Git repository, review changes through your existing Git workflow, and deploy them consistently to production edge devices."
    tool:
      - "FlowFuse"
      - "FlowFuse DevOps Pipelines"
      - "Git Repository (GitLab, Bitbucket, Gitea, or any HTTPS-accessible Git server)"
      - "Personal Access Token"
    steps:
      - name: "Develop and test the application"
        text: "An engineer develops and tests a new application version in a FlowFuse development instance."
        url: "bringing-gitops-to-the-factory-floor"
      - name: "Push the version to Git"
        text: "Create a DevOps Pipeline starting with the development instance as the source snapshot, add a staging instance stage if required, then add a Git Repository stage connected via a Personal Access Token to push the application snapshot to the organization's Git repository."
        url: "supporting-the-git-infrastructure-you-already-use"
      - name: "Review and approve the change"
        text: "The change is reviewed and approved using the team's existing Git workflow, such as a pull request, before it's considered ready for production."
        url: "supporting-the-git-infrastructure-you-already-use"
      - name: "Deploy the approved version"
        text: "Create a second DevOps Pipeline starting with the Git Repository stage as the source, and deploy the reviewed version to the target Hosted instance, Edge Device, or Edge Group."
        url: "supporting-the-git-infrastructure-you-already-use"
  faq:
    - question: "What is GitOps, and how does it apply to manufacturing?"
      answer: "GitOps is a workflow where a Git repository acts as the source of truth for what should be running in production. Changes are made in a development environment, reviewed, and promoted through a controlled process rather than edited directly on live systems. For manufacturers, it extends the same change-management discipline already used for machines and processes to the software running alongside them."
    - question: "Does FlowFuse support self-hosted Git servers?"
      answer: "Yes. As of FlowFuse 2.32, DevOps Pipelines support any Git server accessible over HTTPS, including self-hosted platforms like GitLab, Bitbucket, or Gitea, not just cloud-hosted services."
    - question: "Can FlowFuse connect to a Git server using a private certificate authority?"
      answer: "Yes. Organizations using a private certificate authority can configure their certificates in FlowFuse so it can communicate securely with internal Git servers."
    - question: "How do I connect a Git repository to a FlowFuse DevOps Pipeline?"
      answer: "Create a pipeline, add a Git Repository stage, connect it using a Personal Access Token, and choose your repository and branches. From there you can push snapshots to Git for review or deploy reviewed versions to your target instances or edge devices."
    - question: "What can a Git Repository stage deploy to?"
      answer: "A reviewed version stored in a Git Repository stage can be deployed to a Hosted instance, an Edge Device, or an Edge Group, whether that's a handful of gateways on one line or thousands of devices across multiple facilities."
cta:
  type: contact
  title: "Bring GitOps to Your Industrial Applications"
  description: "See how FlowFuse helps you build, deploy, and manage industrial applications with a GitOps workflow that scales from a single production line to fleets of edge devices."
tldr: "As software becomes core to manufacturing operations, it needs the same change management discipline manufacturers already apply to machines and processes. GitOps brings that discipline to industrial software, and FlowFuse DevOps Pipelines now support any Git server, including self-hosted ones, so manufacturers can adopt GitOps without changing their existing Git infrastructure."
---

Manufacturing has always been good at managing change.

<!--more-->

If a machine is modified, a production process is updated, or a new recipe is introduced, there's usually a clear process to follow. The change is reviewed, documented, approved, and recorded before it reaches production. That discipline exists because every change can affect quality, uptime, and safety.

Software is now part of that same production process.

A modern factory doesn't just rely on PLCs anymore. Industrial gateways connect machines to business systems, edge applications process production data close to the source, dashboards give operators real-time visibility, and integrations move information between OT systems, MES, ERP, and cloud platforms. These applications are updated regularly as production requirements evolve and operations improve.

The challenge isn't that software changes. It's managing those changes consistently across the factory.

A maintenance engineer updates an application on one gateway to resolve an issue. A new production line needs an additional machine connection, so another device gets a slightly different configuration. An operator requests a dashboard improvement, and the change is made directly on the running system because production can't wait.

Each change solves an immediate problem. Over time, though, those small updates create a bigger one: one production line starts behaving differently from another, even though they're supposed to be identical. A gateway runs a different application version than the rest of the fleet. During troubleshooting, nobody is completely certain which version is running where, or whether every site received the latest update.

Those aren't software development problems anymore. They're operational problems. As industrial software becomes a bigger part of manufacturing, it needs the same level of change management that manufacturers have applied to machines and processes for decades.

## Applying Change Management to Software

Managing software on a single gateway is straightforward. Managing it across dozens of production lines, multiple factories, or hundreds of edge devices is a very different challenge.

Without a consistent deployment process, software gradually drifts apart. A configuration is changed during troubleshooting but never documented. An engineer fixes an issue directly on a production device because it's the quickest way to restore operations. Each change makes sense in isolation, but over time identical production lines no longer run identical applications, and proving what was deployed, and when, means piecing together information from multiple systems or relying on people's memory.

Software engineering teams faced these same challenges years ago. Rather than treating running systems as the source of truth, they moved to a process where every change is made in a development environment, stored in a Git repository, reviewed before deployment, and promoted into production through a controlled workflow.

This approach is commonly known as GitOps. Despite the name, GitOps isn't really about Git. It's about making software deployments predictable, repeatable, and traceable. The Git repository becomes the record of the application versions that should be running. Every change has a history, every deployment follows the same approval process, and every production environment receives the version that was reviewed, not whatever happened to be changed directly on a device.

For manufacturers, GitOps extends the same principles they've always applied to physical process changes to the software running alongside them.

## Bringing GitOps to the Factory Floor

GitOps provides the process, but manufacturers also need a platform that can apply it to industrial edge infrastructure. That's where FlowFuse fits.

FlowFuse is an industrial application platform that helps manufacturers build, deploy, monitor, and manage applications running across industrial edge devices, centrally rather than gateway by gateway.

DevOps Pipelines extend that platform by bringing a GitOps workflow to industrial applications.

![FlowFuse DevOps Pipeline showing a development stage, staging stage, and Git stage for pushing changes, and a second pipeline with a Git stage pushing deployments through multiple edge device groups across different regions."](./images/gitops-pipeline.png)
_FlowFuse DevOps Pipeline showing a development stage, staging stage, and Git stage for pushing changes, and a second pipeline with a Git stage pushing deployments through multiple edge device groups across different regions."_

Rather than making changes directly on production devices, engineers develop new application versions in a development environment and push them to their organization's Git repository, where changes can be reviewed using the team's existing approval process before deployment.

The Git repository becomes the source of truth for application deployments, while FlowFuse delivers those approved versions to the right devices consistently, whether updating a small pilot line or rolling out a new version across multiple factories.

## Supporting the Git Infrastructure You Already Use

Until now, adopting a GitOps workflow on the factory floor often meant compromising on Git infrastructure. Many manufacturers already host Git internally using platforms such as GitLab, Bitbucket, or Gitea, often for cybersecurity, compliance, or network-architecture reasons. Moving repositories to a cloud-hosted service just to support a deployment workflow isn't practical for many organizations.

[FlowFuse 2.32](/blog/2026/07/flowfuse-release-2-32/#pipelines-connect-to-any-git-server) removes that limitation. DevOps Pipelines now support any Git server accessible over HTTPS, cloud-hosted or self-hosted, and organizations using a private certificate authority can configure their certificates so FlowFuse can communicate securely with internal Git servers.

Getting started is straightforward: create a pipeline, add a Git Repository stage, connect it using a Personal Access Token, choose your repository and branches, and you're ready to deploy through Git. See the [DevOps Pipelines documentation](/docs/user/devops-pipelines/) for step-by-step instructions.

A typical deployment process looks like this:

1. An engineer develops and tests a new application version in a FlowFuse development instance.
2. They create a DevOps Pipeline, starting with the development instance as the source snapshot. Additional stages, such as a staging instance, can be added if required.
3. A Git Repository stage is added to push the application snapshot to the organization's Git repository.
4. The change is reviewed and approved using the team's existing Git workflow (for example, through a pull request).
5. For deployment, another DevOps Pipeline starts with the Git Repository stage as the source and deploys the approved version to the target Hosted instance, Edge Device, or Edge Group.

Every deployment comes from a reviewed version stored in Git, whether that's a handful of gateways on one production line or thousands of edge devices across multiple facilities.

## Software Change Management Is Becoming an Operational Requirement

Modern manufacturing depends on more software than ever before. Every new gateway, edge application, dashboard, and system integration adds another application that needs to be deployed, updated, and maintained throughout its lifecycle. Managing that through manual updates may work for a handful of devices, but it becomes increasingly difficult as deployments scale across production lines, factories, and distributed sites.

GitOps provides a practical way to bring manufacturing's existing discipline around change management to industrial software, by making deployments consistent, changes traceable, and application versions easy to manage.

FlowFuse builds on those principles by helping manufacturers manage industrial applications across fleets of edge devices while integrating with the Git infrastructure they already use, moving from manually updating individual devices to deploying reviewed application versions through a repeatable workflow.

As industrial software continues to grow in importance, knowing exactly which version is running across every production line is no longer just a software engineering concern. It's part of running a modern manufacturing operation.