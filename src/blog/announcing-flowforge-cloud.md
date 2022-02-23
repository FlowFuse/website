---
title: Announcing FlowForge Cloud
subtitle: Hosting your Node-RED, so you don't have to.
description: Join the wait list for our cloud offering.
date: 2022-02-23 19:44:00.0
authors: ["zeger-jan-van-de-weg"]
---

As an open core company, anyone is open to [download and install][install-docs]
our [latest release][release-v02]. In many cases this is a great solution, it
allows for custom setups in your own environment. This isn't for everyone
however, many use-cases are will not need custom firewall configuration, or want
to maintain and monitor a bespoke solution for managing their Node-RED instances.

We're excited to announce that soon, you won't have to! FlowForge will offer a
Node-RED as a service for which today we open the wait list.

[install-docs]: https://github.com/flowforge/flowforge/tree/9219e81399eaf52fb0ee5573707a52f5520fbfdd/docs/install
[release-v02]: https://github.com/flowforge/flowforge/releases/tag/v0.2.0

<!--more-->
 
Our wait list records your email, and we'll reach out to you on the registered
email once your account is created.

#### Joining the wait list

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
        <input type="submit" value="Subscribe" class="cursor-pointer mt-2 md:mt-0 md:ml-3 py-2 px-4 text-white font-semibold rounded bg-blue-hero border-2 border-blue-hero hover:bg-blue-hero-darker hover:border-blue-hero-darker"/>
    </div>
</form>
</div>

### Starting operations

After having release v0.2 recently, we're now working on v0.3 that will include
a user flow for [billing](https://github.com/flowforge/flowforge/issues/224).
When that work has been done and deployed the wait list will slowly be drained.
Currently that's scheduled on April 1st, no joke, though it could happen both earlier
and later.

Once you are accepted you will be able to create Node-RED instances hosted on
flowforge.cloud. Team members to collaborate with can be invited into the teams
created, and need not to join the wait list.
