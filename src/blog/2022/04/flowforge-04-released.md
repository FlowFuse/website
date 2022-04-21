---
title: FlowForge 0.4 released
subtitle: Getting ready for Node-RED 3.0
description: Getting ready for Node-RED 3.0
date: 2022-04-14 12:00:00.0
authors: ["sam-machin"]
---

This release of the FlowForge adds a seemingly small, but significant new feature.

<!--more-->

With [Node-RED 3.0 fast approaching](https://nodered.org/about/releases/) we've been making sure we are ready to support this.

### Upgrading Node-RED

The goal of FlowForge is to be the best way to run Node-RED at any scale, whether that's many users or many instances. Node-RED is a constantly developing as a platform and therefore part of running Node-RED is also upgrading the version you are running.

With the 0.4 release today we've made that super simple in FlowForge. Last month we introduced the concept of [Project Stacks](https://flowforge.com/docs/user/concepts/#project-stack). One of the key elements of a Stack was the version of Node-RED in use. Initially this may have seemed fairly basic, when you create a new project you usually want to use the latest version of Node-RED. However what happens when a new version is released and you have an existing project?
Now you can change the stack that a project is running on, which in turn will change the version of Node-RED. This is a simple process from the project settings, it only requires a short period of downtime while the project restarts on the new stack, typically around 10-15 seconds.

Our driver to get this feature into the 0.4 release is the approaching release of Node-RED 3.0, now we know that we can be ready to offer our users Node-RED 3.0 as soon as it is released.

We will also be making available the Beta's of Node-RED 3.0 within FlowForge Cloud,  this becomes a great way to test out the new features without having to touch your own environments.

 - [Story #288 - Change Stacks](https://github.com/flowforge/flowforge/issues/288)
 - [Docs](https://flowforge.com/docs/user/changestack/)

### Environment Variables

Another key new feature we are introducing is the ability to set and manage environment variables within your projects.
Environment Variables are a key tool when building applications as they allow you to to separate the configuration of your system from the logic in the code. Even in Low-Code platforms this is an important design pattern. Environment variables are fully integrated into [Templates](https://flowforge.com/docs/user/concepts/#project-template) that we introduced last month so they can be set both at the platform level or on an individual project.
Our plans for the next release will make these even more useful as we introduce the ability to [duplicate a project](https://github.com/flowforge/flowforge/issues/271) and then modify those variables for the new project.

 - [Story #225 - Project Environment Variables](https://github.com/flowforge/flowforge/issues/225)
 - [Docs](https://flowforge.com/docs/user/envvar/)

### There's more

There are many more improvements in this release, such as the ability to [Set the timezone](https://github.com/flowforge/flowforge/issues/239) your project is running in, we've also been iterating on our billing experience as we've welcomed the first paying customers to FlowForge Cloud.

Finally we're very happy that we've had our first external contribution to the code base, as an Open Core company we believe strongly that Open Source lives at the heart of everything we do. 
We would like to say a big thank-you to [Fakorede Damilola Idris](https://fakocodes.netlify.app/) for his work on fixing a [bug](https://github.com/flowforge/flowforge/issues/424) in the UI.


### Getting started with FlowForge

The documentation provides a guide for [installing FlowForge on a local server](http://flowforge.com/docs/install/).

If you haven't played with FlowForge yet, here's a more complete walk-through
of the platform:

<iframe width="560" height="315" src="https://www.youtube.com/embed/YYZDx8n17Ys" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Upgrading FlowForge

If you installed a previous version of FlowForge  and want to upgrade, our documentation provides a
guide for [upgrading FlowForge on a local server](http://flowforge.com/docs/install#upgrade).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).

That also includes if you have any feedback or feature requests.

We also have a `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

### What's next?

Our regular release cycle puts the next release on Thursday 12th May.
We will be building on features in the last few releases around managing your projects and using templates, we're also  setting the foundations of our work to [manage Node-RED on your own devices running at the Edge](https://github.com/flowforge/flowforge/issues/446).


Our first users have already been creating projects on FlowForge, you can too if you enter your email below to join the waitlist.

For more information, check out the [announcement blog post](https://flowforge.com/blog/announcing-flowforge-cloud/), or join the waiting
list here:

<div class="mt-4 flex flex-col">
    <form
        action="https://buttondown.email/api/emails/embed-subscribe/flowforge-waitlist"
        method="post"
        target="popupwindow"
        onsubmit="window.open('https://buttondown.email/flowforge-waitlist', 'popupwindow')"
        class="embeddable-buttondown-form p-1 my-1 ">
    <div class="flex flex-col md:flex-row">
        <input type="email" name="email" id="bd-email" placeholder="Enter your email" class="lg:w-80 md:w-60 py-2 px-4 rounded border-blue-hero border-2 focus:border-blue-hero-darker  focus:outline-none" />
        <input type="hidden" value="1" name="embed" />
        <input type="submit" value="Sign Up" class="ff-btn ff-btn--secondary cursor-pointer mt-2 md:mt-0 md:ml-3 py-2 px-4 text-white font-semibold rounded bg-blue-hero border-2 border-blue-hero hover:bg-blue-hero-darker hover:border-blue-hero-darker"/>
    </div>
</form>
</div>


You can also sign up to our general mailing list below if you want to hear more
about the work we're doing.
