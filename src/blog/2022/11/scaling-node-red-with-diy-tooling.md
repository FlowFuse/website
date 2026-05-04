---
title: Challenges scaling Node-RED with DIY tooling
subtitle: Node-RED is very easy to get up and running for your first instance but what about your 100th?
description: In this post, I'm going to share some of the challenges customers face when scaling Node-RED with Do-It-Yourself tooling
date: 2022-11-30
authors: ["zeger-jan-van-de-weg"]
tags:
    - posts
    - node-red
    - how-to
---


In this post, I'm going to share some of the challenges customers face when
scaling Node-RED with Do-It-Yourself tooling.
<!--more-->
Specifically, we'll talk about
common threads in their journey building their own tooling around Node-RED, its
flows, and deploying them. Node-RED is a visual programming environment for
wiring together hardware devices, APIs and online services in a single
application. It's great because it's flexible enough to be used by both
beginners and experts alike; however, going from one instance of Node-RED to 100
isn't for the faint-hearted.

### Zero to hero in a few days

If you’re new to Node-RED and are just getting started, the first step is simple:
go to [nodered.org](https://nodered.org), download, install and run. There’s no
need to configure anything or set up credentials or security or alerts. You can
get started with Node-RED straight away by simply running it on your machine.
The guides and scripts provided on Node-RED or are more than enough to get
started. You'll dive right in and start developing your flows.

### Onto the second instance

The next instance is a simple copy of the first. You'll need to make sure that
you are installing the same version on both instances, and that any
configuration files (such as the `settings.js`) are also in sync.

The second instance improves the first equally. Docs are read again,
improvements are made, and copied over. Life's good! Although there's a slight
itch to start automating the setup, it's ignored. Just too many open questions
on how to achieve it: write scripts in bash? Or can we use Node-RED to manage
Node-RED? Automation can wait, there's new flows to implement!

### Wake-up call; how many of them do we have?

There's nothing like a good ol' wake-up call to get you back on track. One of
our team members asked a questions about a buggy flow you've got no recollection
of. During the investigation there's issues left and right; it's running a much
older version, missing standard packages, the settings are out of date, and the
timezone not set to UTC? Adoption of Node-RED is going quite well, it's useful
and effective. Gets the job done without fuss. But now there's toil in
maintaining them; ensure the right tooling is build, properly documented, it
needs dashboards and overviews, lots of work to be done. Not quite business
related, but Node-RED is important for the company, the bosses sure would
approve spending 2 months building these tools!

But then something happened—there was a higher priority project to be picked up.
Some tooling could be written for a couple of hours a month, but not two
dedicated months to get it in tip top shape. Better than nothing! Built a
dashboard in Node-RED to keep track of all devices, there's some scripts and a
few flows that aid in monitoring and maintenance. Scaling further is possible,
but confidence in the tooling isn't sky high.

### Data extraction at scale; now there's over 100

At [FlowFuse](/) we've got regular conversations with customers managing 100s of
devices. Scaling to that many devices and runtimes requires hours of development
each week alongside monitoring, maintenance, and auditing.

As a side effect of investing more time into Node-RED and its ecosystem the
organization has developed a few standards. Standard custom nodes that are
pre-installed (👋 `moment.js`), a style guide published for developing flows,
maybe even flow linting: https://github.com/node-red/nrlint

The security model is fairly decent. One just hopes the
[CISO](https://nl.wikipedia.org/wiki/Chief_Information_Security_Officer) doesn't
inspects them, but it's a fair bet they won't; we're far away from the
headquarters, right?

Many other edge cases itch in the back of our heads, but we can't focus on those right now.

### Conclusion

Node-RED is a great tool, it's got many built-in features that make it easy to
get started with no coding experience necessary. Running it at scale, in a
production environment can require a lot of sys-ops and dev-ops time and we
think [FlowFuse](/) is a great solution to keep that admin and tech debt in check.

If you're running into these challenges we believe we can help, you can adopt
our [free and open source edition](/docs/install/).

Additionally, to get a head start or enhance your current setup, explore our [Beginner's Guide to Professional Node-RED](/ebooks/beginner-guide-to-a-professional-nodered/). This comprehensive ebook offers a clear overview of Node-RED’s capabilities and practical tips for making the most of its features.
