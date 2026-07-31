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
6. Sales provide the token to Self Hosted cutsomers. The token is to be entered on the Admin Settings -> FlowFuse Nodes page. **NOTE:** the cusomer **MUST** be running FlowFue 2.32.0 or newer before applying the token and they will need to restart Instances to pick up the new catalogues.

![Screenshot of Certified Nodes token](../../engineering/images/certified-nodes-token.png)
_Screnshot of where to enter Certfied Nodes Token_


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
    - The `publishConfig.registry` to point to the FlowFuse registry (`https://registry.flowfuse.com`)
    - Add .github/workflows/release-publish.yml` and the matching `CERTIFIED_NODES_PUBLISH_TOKEN` secret from 1Password.
7. Publish the node to the FlowFuse registry.

## Updating the Catalog

Once a node is published, it must be registered in the `ff-certified-nodes` Node-RED instance before it appears in customer instances or on the [Integrations page](https://flowfuse.com/integrations). This instance lives in the `Internal Tools` Application on FlowFuse Cloud (`ff-certified-nodes.flowfuse.cloud`) and its editor has three flow tabs: **Authentication**, **catalog generator**, and **Usage**.

Two things are generated from this instance and both must be updated when adding a node:

- **Catalogs** — the `ff-it.json` / `ff-ot.json` files that are served to the end user's Node-RED instance.
- **Authentication data** — sent to the backend plugin in the npm registry so packages can be mapped to the correct collection.

Nodes are split by product, and the flow uses `IT`/`OT` to refer to them:

- **Hub** = **IT** nodes
- **Edge** = **OT** nodes

### 1. Add the node to the build catalog

1. Open the `ff-certified-nodes` editor and go to the **catalog generator** tab.
2. Open the **Build catalogues** function node and select the **On Message** tab.
3. Add the package name (e.g. `"@flowfuse-certified-nodes/<name>"`) to the correct const array:
    - `ITNodes` for **Hub** nodes
    - `OTNodes` for **Edge** nodes
4. Deploy.

These arrays feed `certNodesITCat` ("FlowFuse Hub Certified Nodes") and `certNodesOTCat` ("FlowFuse Edge Certified Nodes"), which build the catalog files delivered to customers' Node-RED instances.

### 2. Add the node to the authentication collections

1. In the same editor, go to the **Authentication** tab.
2. Open the `template` node wired to the `/collections` endpoint (under the _Auth handler for certified nodes registry_ comment). It holds a JSON object with a `collections` array and a `lookup` map.
3. Add the package to the correct group in the `collections` array (`it` for Hub, `ot` for Edge), and add a matching entry to the `lookup` object mapping the package to its group:

    ```json
    "collections": [
      { "name": "ot", "packages": ["@flowfuse-certified-nodes/opcua", "@flowfuse-certified-nodes/rtsp"] },
      { "name": "it", "packages": ["@flowfuse-certified-nodes/redis", "@flowfuse-certified-nodes/<name>"] },
      { "name": "user", "packages": ["@flowfuse-nodes@nr-mcp-server-nodes"] }
    ],
    "lookup": {
      "@flowfuse-certified-nodes/redis": ["it"],
      "@flowfuse-certified-nodes/<name>": ["it"]
    }
    ```

4. Deploy.

The **Authentication** tab is also where customer instances/users (tokens) are managed — see [Generating Tokens for Access to Certified Nodes Registry](../contributing/certified-nodes.md#generating-tokens-for-access-to-certified-nodes-registry).

### Result

Once both tabs are updated and deployed, the node is included in the generated catalogs served to Node-RED instances and mapped in the registry. The website's [Integrations page](https://flowfuse.com/integrations) then picks it up automatically — it fetches `ff-it.json` and `ff-ot.json` from `ff-certified-nodes.flowfuse.cloud` directly.
