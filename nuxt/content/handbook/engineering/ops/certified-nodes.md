---
title: "Certified Nodes"
---

# Certified Nodes

FlowFuse Certified Nodes are a collection of Node-RED nodes maintained and updated by FlowFuse providing trusted implementations of selected capabilities.

Nodes are grouped into two categories

- Hub: Nodes used to carry out more IT related tasks e.g. connect to Databases
- Edge: Nodes used to connect to physical devices to collect data e.g. Modbus

## Enroll Customers

1. Customer works with Sales team
2. Sales Team opens an Issue on [CloudProject](https://github.com/FlowFuse/CloudProject/issues/new?template=certified-nodes-request.yml) with all required details
    - Self Hosted or FFC Team
    - Which Catalogues of Nodes to enable (Edge, Hub, or Both)
3. Engineering member will be assigned the ticket
4. Download the "certified-nodes-token-generator" from the [engineering](https://github.com/FlowFuse/engineering) repo
5. Engineering will use the information from the Issue to run the tool and create the required tokens and/or configuration
    - Make required changes ff-certified-nodes instance
    - For Self Hosted customer provide token to Sales to pass to the customer
    - For Teams on FFC go to Team Settings -> Danger -> Edit Usage limits, tick Certifed nodes and add the required catalogue URLS to the box at bottom


## Adding New Nodes

1. Evaluate all existing Node-RED Comunity nodes
2. Select one of above or create new from scratch
3. Create a new private GitHub repository with the name `ffcn-` prefix
4. If using an exisitng node, create copy of GitHub respository as follows
    - `git clone --bare <url of existing repo>`
    - cd into the created directory
    - `git push --mirror git@github.com:FlowFuse/ffcn-<repo-name>.git`
5. Complete the new repository check [list](https://github.com/FlowFuse/admin/issues/new?template=new-repo.md)
6. Make changes to the `package.json` to update
    - The name and scope to be `@flowfuse-certified-nodes/<name>`, where name should be shortest sensible name 
    - The `homepage` link to FlowFuse documentation for the node
    - Add .github/workflows/release-publish.yml` and the matching `CERTIFIED_NODES_PUBLISH_TOKEN` secret from 1Password.
