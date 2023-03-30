---
originalPath: install/first-run.md
updated: 2023-03-28 11:00:09 +0000
version: 1.5.0
---
# First-run Setup

Following a successful install, you will be able to access the platform to go
through the initial setup.


## 1. Start setup

### - LocalFS
Open FlowForge in your browser [http://localhost:3000](http://localhost:3000).  

### - Docker or Kubernetes
Open FlowForge in your browser [http://forge.example.com](http://forge.example.com) (Change `.example.com` to match the domain you set up in DNS)


Click the **START SETUP** button

<img src="images/setup-01.png" width=500 />

## 2. Create an Administrator

The first user you create will be an Administrator. They will have full access
to the platform, be able to set platform-wide configuration and manage users and teams.

**Note**: with the 0.3 release, it is possible to reset your password *if* you have email
configured and enabled the `user:reset-password` option in Admin settings. Otherwise,
make sure you make a note of the password you set. We will provide tools to manage passwords
outside of the platform in a future release.

<img src="images/setup-02-user.png" width=500 />

## 3. Upload a license

FlowForge Community Edition is Open Source and can be used freely without a license.

If you have a FlowForge Enterprise Edition license you can upload it here.

<img src="images/setup-03-license.png" width=500 />

## 4. Platform Options

There are some runtime configuration options that can be configured at this stage.

<img src="images/setup-04-options.png" width=500 />

### Anonymous usage statistics

To help us understand how the project is being used, we gather high level
anonymous usage information from running instances.

The Administrator can opt-out of this feature.

## 5. Finish setup

Once you complete the setup, you will be able to log in as the Administrator
user you created and start using the platform. You can setup your Team and
create your first Node-RED instance.

More information about using the FlowForge platform is available in the
main [user guide](../user/).