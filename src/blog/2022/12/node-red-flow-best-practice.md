---
title: Format your Node-RED flows for better team collaboration
subtitle: From formatting your flows for readability to providing clear comments on nodes and groups, a little bit of effort upfront can save your team a lot of headaches down the road
description: Learn best practices for formatting Node-RED flows to enhance team collaboration. From descriptive group names to clear switch explanations, optimize your flows for readability and efficiency.
date: 2022-12-05
authors: ["rob-marcer"]
tags:
    - posts
    - node-red
    - how-to
---


When it comes to working on Node-RED flows as part of a team, there are a few best practices that can make things go more smoothly.
<!--more-->
From formatting your flows for readability to providing clear comments on nodes and groups, a little bit of effort upfront can save your team a lot of headaches down the road. In this post, we'll cover some of the main things to keep in mind when working on Node-RED flows as part of a team.

### Give your groups descriptive names

Let’s start with [grouping your flows](https://nodered.org/docs/user-guide/editor/workspace/groups) and giving each group a clear explanation of what it does. Compare the first to the second example below and consider how much more quickly you can understand what the flow is doing.

#### This is not helpful, 'Time' doesn't tell you enough to understand the flow's purpose.
!["Screenshot showing the example of flow having the bad group name"](./images/name-bad.png "Screenshot showing the example of flow having the bad group name")

#### This is much better, we know what the flow is doing without inspecting the nodes.
!["Screenshot showing the example of flow having the good group name"](./images/name-good.png "Screenshot showing the example of flow having the good group name")

### Explain what your switches do

Try to make it obvious what each switch does without having to open the node editor. Ask a question in the switch's name and make a positive answer the top connection out.

#### This is not easy to understand, what does the switch do?
!["Screenshot showing the example of flow having the switch with bad name"](./images/switch-bad.png "Screenshot showing the example of flow having the switch with bad name")

#### This is a lot better, we can see that the top debug should be triggered.
!["Screenshot showing the example of flow having the switch with good name"](./images/switch-good.png "Screenshot showing the example of flow having the switch with good name")

### Where possible your flows should work down the canvas

It makes it so much easier to understand what happens and in which order if your flows start at the top of the canvas and work down to the bottom.

#### This is almost unreadable, it's very hard to work out the order of the groups.
!["Screenshot showing an example of flow that doesn't work down the canvas"](./images/flowdown-bad.png "Screenshot showing an example of flow that doesn't work down the canvas")

#### Where as this is so much easier to understand.
!["Screenshot showing an example of flow that works down the canvas"](./images/flowdown-good.png "Screenshot showing an example of flow that works down the canvas")

### Use link nodes rather than wires to join groups

Groups should not be joined using wires, it just looks untidy and quickly reduces readability of your flows.

#### The wire is blocking the title, it only gets worse as you add more wires.
!["Screenshot showing an example of flow with wires blocking group titles"](./images/link-bad.png "Screenshot showing an example of flow with wires blocking group titles")

#### You can see the group titles easily now.
!["Screenshot showing an example of flow with link nodes improving readability"](./images/link-good.png "Screenshot showing an example of flow with link nodes improving readability")

### Keep your groups compact

Keeping your groups compact will save time when reading the flow. This is especially helpful if when viewed on a smaller screen.

#### Consider how hard a flow made of groups spaced out like this would be to read on a smaller laptop screen.
!["Screenshot showing an example of flow with widely spaced groups"](./images/compact-bad.png "Screenshot showing an example of flow with widely spaced groups")

#### This now takes up less space and is arguably easier to read on any screen size.
!["Screenshot showing an example of flow with compact groups"](./images/compact-good.png "Screenshot showing an example of flow with compact groups")

### Don’t cross ~~beams~~ wires
Crossed wires are not only hard to read, they can lead to misinterpretation of what a flow actually does. Where possible don’t cross your wires, where you can’t avoid it try to make sure it’s easy for the reader to understand where wires cross as rather than join.

#### This is confusing, which change node does the top switch output link to?
!["Screenshot showing an example of the flow with nodes having crossed beams/wires"](./images/wires-bad.png "Screenshot showing an example of the flow with nodes having crossed beams/wires")

#### This is better, much less chance of confusing the change nodes.
!["Screenshot showing an example of the flow with nodes having correctly linked beams/wires"](./images/wires-good.png "Screenshot showing an example of the flow with nodes having correctly linked beams/wires")

### Don’t use link nodes in groups where avoidable

Excessive link nodes within groups can make a flow much harder to understand, where possible use wires to join nodes within a group.

#### This is hard to read and you will end up checking the link nodes again and again.
!["Screenshot showing the example of flow having the uneccessary link nodes"](./images/groupwires-bad.png "Screenshot showing the example of flow having the uneccessary link nodes")

#### Functionally identical to the example above, it should only take a few seconds to understand this flow now.
!["Screenshot showing an example of the flow with the avoided link nodes"](./images/groupwires-good.png "Screenshot showing an example of the flow with the avoided link nodes")

### Boost Collaboration with FlowFuse

[FlowFuse](/) is a cloud-based platform that makes working together on Node-RED projects easier and more efficient. It’s trusted by industries like manufacturing and smart building management, as well as textiles, to improve their systems. For more information, refer to our [customer stories](/customer-stories/).

With FlowFuse, you can quickly [set up and manage teams](/docs/user/team/), giving each member the right level of access. It keeps all your [Node-RED instances organized in one place](https://www.youtube.com/watch?v=KOnQnR7yfT0&list=PLpcyqc7kNgp3nRacWBJ9JUVUJqtTjXdvh&index=2), so your team can collaborate seamlessly. Plus, it features [snapshots](https://www.youtube.com/watch?v=m2Onip4Lf4w), which let you restore previous versions of your flows if something goes wrong. FlowFuse simplifies team collaboration, making it easier to manage and work on Node-RED projects.

**[Sign up]({{ site.onboardingURL }}) now for a free trial and experience FlowFuse's powerful collaboration tools!**

### Conclusion

Working on Node-RED flows as part of a team doesn't have to be a headache. By following some simple best practices you can make collaboration smooth sailing for everyone involved. So next time you're starting work on a new Node-RED flow, remember these tips and make life easier for yourself and your teammates.