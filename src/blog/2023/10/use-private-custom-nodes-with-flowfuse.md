---
title: How to Use Private Custom Nodes in FlowFuse?
subtitle: Run your own private Node-RED catalogue and npm repository for custom nodes
description: Learn how to set up a private Node-RED catalog and npm repository with FlowFuse's latest features, allowing you to manage custom nodes securely and efficiently.
date: 2023-10-02
authors: ["marian-demme","ben-hardill"]
image: blog/2023/10/images/tile-blog-private-custom-nodes-tile.png
tags:
    - posts
    - flowfuse
---

With version 1.12 of FlowFuse, it is now possible to use your custom nodes. In this article, we'll explain how to do that. 

<!--more-->

<div class="blog-update-notes">
    <p><strong>UPDATE:</strong> Since this article was published, we've made this even easier on FlowFuse!</p>
    <p>Now, FlowFuse includes a a private registry for all Team and Enterprise-Tier customers, so there is no need to host and manage your own.</p>
    <p>You can view our documentation on this feature <a href="/docs/user/custom-npm-packages/">here</a></p> 
</div>

What do we mean by custom nodes? Typically, Node-RED nodes are hosted publicly on the npmjs registry, making them accessible to everyone for download and contribution. However, there are use cases where you may not want to share your developed nodes publicly. In such scenarios, it becomes necessary to run your own private Node-RED catalog and npm repository. This approach allows you to manage your custom nodes securely and efficiently.

## Step 1 - Setting Up a Private npm Repository

Before you can use custom nodes, you'll need a place to store them.

### Option 1 - Service Provider

Choose a public service provider, like [npmjs](https://www.npmjs.com/), that allows you to host private packages and upload your node module.

### Option 2 - Verdaccio

Another option is to use Verdaccio, a lightweight private npm proxy registry that allows you to run your own registry.

#### Installing Verdaccio
1. Install Verdaccio using npm:
```sh
npm install -g verdaccio
```

2. Run Verdaccio:
```sh
verdaccio
```

This will start Verdaccio on `http://localhost:4873`

#### Configuring Verdaccio
The default configuration supports scoped packages and allows any user to access all packages, although only authenticated users can publish.

If necesarry you can edit the Verdaccio configuration file, usually found at **~/.config/verdaccio/config.yaml**.

Refer to the [documentation](https://verdaccio.org/docs/configuration/) for all configuration options.

It is important that if you intend to use a private NPM registry with FlowFuse Cloud, the registry will need to be publicly exposed to the internet. Please make sure you understand how to secure it appropriately.

#### Publish your package

1. Create a user
```sh
npm adduser --registry http://localhost:4873/
```

2. Publish you package
```sh
npm publish --registry http://localhost:4873/
```

## Step 2 - Creating Your Private Node-RED Catalog

There are several ways to generate your own `catalogue.json`, which is necessary for Node-RED to understand which packages are available where. Below, we'll show you two of the many options to create and host a `catalogue.json`.

### Option 1 - Web App
To create and host a Node-RED catalog, we recommend the package [`node-red-private-catalogue-builder`](https://github.com/hardillb/node-red-private-catalogue-builder).

The container accepts the following environment variables:

- PORT - Which port to listen on (defaults to 3000)
- HOST - Which local IP Address to bind to (defaults to 0.0.0.0)
- REGISTRY - A host and optional port number to connect to the NPM registry (defaults to http:/ registry:4873)
- KEYWORD - The npm keyword to filter on (defaults to node-red)

**It presents 2 HTTP endpoints**

- /update - a POST to this endpoint will trigger a rebuild of the catalogue
- /catalogue.json - a GET request returns the current catalogue

The `/update` endpoint can be used with the Verdaccio [notification](https://verdaccio.org/docs/notifications) events to trigger the catalogue to automatically when nodes are added or updated.

```yaml
notify:
  method: POST
  headers: [{'Content-Type': 'application/json'}]
  endpoint: http://localhost:3000/update
  content: '{"name": "{{name}}", "versions": "{{versions}}", "dist-tags": "{{dist-tags}}"}'
```


### Option 2 - Node-RED
You can also use a FlowFuse Node-RED instance and the [`node-red-contrib-catalogue`](https://flows.nodered.org/node/node-red-contrib-catalogue) package to generate and host your `catalogue.json` file.

<iframe width="100%" height="100%" src="https://flows.nodered.org/flow/1f01a92fdbd4172c75fcb88b44e64954/share" allow="clipboard-read; clipboard-write" style="border: none;"></iframe>


## Step 3 - FlowFuse configuration

Next, you'll need to add all the details to your FlowFuse instance configuration. 

1. Add the Catalog: Go to your **Instance** -> **Settings** -> **Palette**. Here, you'll have the option to add a catalogue.json. You'll need to provide the URL from which the catalogue.json can be accessed.

For example: **https://catalogue.nodered.org/catalogue.json**

It is import to remember that this URL must be accessible from the browser running the Node-RED editor and when used with FlowFuse (or any other Node-RED editor accessed via HTTPS) it must be served with HTTPS.

2. Modify the npmrc File: You'll need to configure where to find the packages from the catalog, possibly specifying a scope.

```
# Set a new registry for a scoped package
@myscope:registry=https://mycustomregistry.example.org
```

If necessary, set authentication-related configurations. See the [documentaion](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc#auth-related-configuration) for details. 

3. Save and Restart Your Node-RED Instance: The new npm modules should now be visible in the Node-RED Palette Manager.

