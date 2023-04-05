---
title: Securing Node-RED in production environments
subtitle: In this blog post, I will cover some of the key steps to securing your Node-RED projects.
description: In this blog post, I will cover some of the key steps to securing your Node-RED projects.
date: 2023-04-05
authors: ["rob-marcer"]
image: /blog/2023/04/images/security-header.png
tags:
    - posts
---

Node-RED is very easy to get up and running. Whether you run it locally, in Docker, on a Raspberry Pi or on a great cloud service such as our own FlowForge Cloud you can have a project up and running in minutes.

<!--more-->

One thing that can get overlooked is the security of Node-RED. From personal experience, the first few times I installed Node-RED I was more focussed on the possibilities of what I could do with this new tool that I was keeping my flows secure. This becomes an even more important consideration when wanting to use Node-RED in a commercial environment. In this article I’m going to look at some of the security points you should consider when using Node-RED, even if you are using it on your home or lab network. I’ve ordered these in what I consider to be easiest to hardest to put in place so new users should work their way down this list.

## Anyone on your LAN (local area network) can access your Node-RED interface

Once you have an instance of Node-RED running it can usually be accessed by pointing a web browser to the IP address and port of where it’s running.

```http://192.168.0.3:1880```

With a URL similar to the one above (depending on your specific network and Node-RED configuration) anyone on your LAN can view but more importantly edit your flows. This can be really useful when you are first learning about Node-RED but it’s always a good idea to get into the habit of locking down access to the editor, even if you trust everyone who can access your LAN.

One of the easiest ways to protect your flows is to add a username and password to your Node-RED instance.

The first step is to find your Node-RED settings.js file, it's not always in the same place but on a default Linux installation it can be found in this directory.

```cd ~/.node-red```

If you list that directory you should now see something like:

![Where your settings.js should show](./images/ls.png "Where your settings.js should show")

We now need to edit settings.js, I'm going to use (Nano)[https://www.nano-editor.org/] to do that.

```nano settings.js```

We now need to find and edit the following section of the settings file:

```
    /** To password protect the Node-RED editor and admin API, the following
     * property can be used. See http://nodered.org/docs/security.html for details.
     */
    //adminAuth: {
    //    type: "credentials",
    //    users: [{
    //        username: "admin",
    //        password: "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
    //        permissions: "*"
    //    }]
    //},
```

For this example, I'm just going to add a password and uncomment the section, you could also change the username for additional security.

To create the password we need to use a command line tool which in included in Node-RED. Open a second terminal then run this command:

```node-red admin hash-pw```

Put in your new password, I'll use the password flowforge in this example. The tool returns your password in a hashed format.

![The Node-RED tool outputs the hashed password](./images/password.png "The Node-RED tool outputs the hashed password")

We can now return to the other terminal window, uncomment the section then paste in the new password, this is how it looks for me:

```
    /** To password protect the Node-RED editor and admin API, the following
     * property can be used. See http://nodered.org/docs/security.html for details.
     */
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "$2b$08$pVd7SPN0Q5jI.VyFiVoZIOg10AWkmbLKFezpBxp.rYnwcN4FLtswe",
            permissions: "*"
        }]
    },
```

You can now save and exit out of your file.

The last step is to restart Node-RED, I'm using Debian so the command is:

```node-red-restart```

Now, when you try to access Node-RED you will need to provide a username and password.

![Using the username and password to login to Node-RED](./images/login.gif "Using the username and password to login to Node-RED")

You might also want to consider turning off the editor interface once you are happy with your flows. This can make it a little harder to make changes to your project but it also gives you peace of mind that nobody has accidentally or deliberately edited anything. You can turn off the editor interface as follows:

Edit your settings.js file as explained above, look for the following section:

```
    /** The following property can be used to disable the editor. The admin API
     * is not affected by this option. To disable both the editor and the admin
     * API, use either the httpRoot or httpAdminRoot properties
     */
    //disableEditor: false,
```

All you need to do is uncomment the bottom line then change the value from false to true, once done it should look something like this:

```
    /** The following property can be used to disable the editor. The admin API
     * is not affected by this option. To disable both the editor and the admin
     * API, use either the httpRoot or httpAdminRoot properties
     */
    disableEditor: true,
```
Now restart Node-RED as covered above then try accessing your Node-RED instance again, hopefully you will no longer be able to edit or view your flows.

Using these two features, you now have much better control over who can access your design interface for Node-RED.

## All traffic to your Node-RED instance is over HTTP which can be intercepted

Hopefully we all know the importance of using HTTPS (usually represented as a padlock in your browser), we check for it when accessing our banking, email etc. Setting up https for your own systems takes a little work but it’s really worth it, especially if you are accessing your Node-RED instances over a LAN with many other users or the internet.

This guide works on Debian (well actually, Raspbian running on a Pi4), you will probably find this approach might not work if you are working on a different OS or hardware.



We’ve now secured all traffic between you and your Node-RED project so nobody can intercept it.

## Updating the Default Credentials

When you first install Node-RED, it creates a default user account with the username admin and a blank password. This is obviously not secure and should be changed immediately.

To update the default credentials, you can follow these steps:

1. Open the Node-RED editor in your web browser.
2. Click on the hamburger menu icon in the top right corner and select "Settings".
3. Click on the "Admin Auth" tab.
4. Click on the pencil icon next to the "Users" field to edit the list of users.
5. Delete the default admin user and add a new user with a strong password.
6. Click "Done" to save the changes.

Now, when you try to access the Node-RED editor, you will be prompted to enter your new credentials.

## Securing your Dashboards

A very common use case for Node-RED is to create a dashboard where users can view graphs and data. It’s important you consider who can access these resources, if you are running Node-RED on a LAN is it OK that anyone else on that network can access your dashboard? If not, let’s look at how to protect them.

EXPLAIN HOW TO PROTECT DASHBOARDS HERE

You can now run a dashboard with confidence that users will need to provide credentials to view the content.

## Securing your APIs

In a similar vein to dashboards, you should consider how you can protect APIs you create. 

EXPLAIN HOW TO PROTECT APIs

## Conclusion

If you follow these steps you should be on the right path to running a more secure Node-RED instance. There is a lot more you can do and I recommend you read the article on the Node-RED website to gain some more ideas https://nodered.org/docs/user-guide/runtime/securing-node-red