Flow Forge Packaging Guidelines

## Github projects 

### Naming

- Flow Forge Components should start with `flowforge-`
- If a Node-RED plugin/node should start with `flowforge-nr-`

### Content

All Git Repositories must contain the following files:

 - README.md
 - LICENSE


## NPM packages

### Naming

- All packages should be scoped to `@flowforge`

Node-RED plugins should start with `nr-` e.g. 
 - @flowforge/nr-storage
 - @flowforge/nr-auth

Flow Forge plugins should start with `forge-` e.g.

 - @flowforge/forge-driver-localfs
 - @flowforge/forge-driver-docker
 - @flowforge/forge-driver-k8s

### Content

The `package.json` must contain the following keys

 - description
 - repository
     ```
     "repository": {
        "type": "git",
        "url": "git+https://github.com/flowforge/flowforge.git"
    },
    ```
 - homepage
    ```
    "homepage": "https://github.com/flowforge/flowforge#readme",
    ```
 - bugs
    ```
    "bugs": {
        "url": "https://github.com/flowforge/flowforge/issues"
    },
    ```
 - license
   - Apache-2.0
   - SEE LICENSE IN ./LICENSE
 - author
    ```
    "author": {
        "name": "FlowFlow Inc."
    },
    ```
 