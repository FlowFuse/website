---
title: The benefits and drawbacks of using Node-RED function nodes
subtitle: In this blog post, I will discuss some of the benefits and drawbacks of using Function nodes in your next Node-RED project.
description: Explore the benefits and drawbacks of Function nodes in Node-RED projects, balancing customizability with simplicity for optimal flow design.
date: 2023-03-20
authors: ["rob-marcer"]
image: /blog/2023/03/images/function-nodes.png
tags:
    - posts
    - node-red
    - how-to
---

Function nodes are an essential part of Node-RED. They allow you to write custom JavaScript functions that can be used in your Node-RED flows. In this blog post, I will discuss some of the benefits and drawbacks of using Function nodes in your next project.

<!--more-->

 ## 5 Benefits of using Function Nodes: ##

 ![Example showing how to use the function node](./images/function-example.gif "Example showing how to use the function node")

1. **Customisation:** Function nodes allow you to write custom JavaScript functions that can be tailored to your specific needs. You can create complex functions that perform a variety of tasks, the only limit is your programming skills.

2. **Reusability:** Function nodes can be reused in multiple flows, saving you time and effort. You can create a library of custom functions that can be easily accessed and reused in different flows.

3. **Debugging:** Function nodes provide an easy way to debug your code. You can use console.log statements to output debug information to the Node-RED debug panel, making it easier to identify and fix issues.

4. **Performance:** Function nodes can be more performant than using multiple nodes to achieve the same result. By combining multiple tasks into a single function, you can improve performance, assuming your code is efficient.

5. **Flexibility:** Function nodes provide a high degree of flexibility. You can use them to perform tasks that are not possible using a single, standard Node-RED node, such as complex data manipulation.

## 5 Benefits of avoiding Function Nodes:

![Example showing how to not use the function node](./images/no-function-example.gif "Example showing how to not use the function node")

1. **Simplicity:** Not using function nodes can make your flows simpler and easier to understand. By using standard Node-RED nodes, you can create flows that are easy to follow and maintain for both you and your team.

2. **Ease of Use:** Standard Node-RED nodes are easy to use and require no programming knowledge. This makes it easier for non-technical users to create and maintain flows.

3. **Modularity:** By using standard Node-RED nodes, you can create modular flows that can be easily modified and extended. This makes it easier to add new functionality to your flows as your needs change.

4. **Community Support:** Standard Node-RED nodes have a large and active community, providing support and resources for users. This can make it easier to find solutions to common problems and share knowledge with others.

5. **Compatibility:** Standard Node-RED nodes are usually compatible with all versions of Node-RED, making it easier to migrate flows between different environments.

## Conclusion:

Function nodes are particularly useful for users with programming experience who need to perform complex tasks in their flows. They offer a wide range of possibilities, from data manipulation to integration with external APIs. Additionally, function nodes can be more performant than using multiple nodes to achieve the same result, which can be beneficial for users who need to optimise their flows for speed.

On the other hand, standard Node-RED nodes offer a simpler and more accessible approach to flow creation. They are easy to use and require no programming knowledge, making them ideal for non-technical users. Standard nodes also provide modularity, allowing users to create modular flows that can be easily modified and extended. Additionally, standard nodes have a large and active community, providing support and resources for users.

Ultimately, the decision to use function nodes or not will depend on your specific needs and preferences. If you require a high degree of customisation and flexibility, function nodes may be the best choice for you. However, if you prefer simplicity and ease of use, standard Node-RED nodes may be a better fit. 
