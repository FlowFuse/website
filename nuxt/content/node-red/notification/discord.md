---
title: "Sending and receiving Discord messages with Node-RED"
description: "Learn how to send and receive Discord messages with Node-RED."
---

# {{meta.title}}

This guide explains how to integrate Discord with Node-RED to send and receive messages. You'll learn how to configure a Discord bot, send messages to users and channels, and handle incoming messages.

Discord is commonly used for notifications in IoT applications. This document covers the setup process and includes troubleshooting steps for common integration issues.

For information on integrating other notification services, see the guides on [Email](/node-red/notification/email/) and [Telegram](/node-red/notification/telegram/).

<!--more-->

## Prerequsite

Before proceeding further, make sure you have installed the following node:

- [node-red-contrib-discord-advance](https://flows.nodered.org/node/node-red-contrib-discord-advanced)

## Creating Bot in Discord

1. Navigate to the [Discord developer portal](https://discord.com/developers/applications).
2. Login with your Discord account credentials.
3. To create an application, click on the top-right "Create Application" button.

!["Screenshot showing the 'create application' button"](/node-red-media/notification/images/discord-with-node-red-new-application-button.png "Screenshot showing the 'create application' button")

4. Enter the name for your application and click on the "Create" button.

!["Screenshot showing the 'create' button"](/node-red-media/notification/images/discord-with-node-red-create-app.png "Screenshot showing the 'create' button")

5. After the successful creation of the application, you'll be redirected to that application's setting. Click on the "Bot" option from the left sidebar.

!["Screenshot showing the 'bot' sidebar option and 'reset token' button"](/node-red-media/notification/images/discord-with-node-red-bot-reset-token.png "Screenshot showing the 'bot' sidebar option and 'reset token' button")

6. Click on the "Reset Token" and copy the regenerated bot secret token.
7. Next, you'll need to enable [Privileged Gateway Intents](https://discord.com/developers/docs/topics/gateway#gateway-intents) for your bot.  To do so, navigate to the bot page and enable three intents as seen below.

!["Screenshot showing the 'Privileged Gateway Intents' options"](/node-red-media/notification/images/discord-with-node-red-privillage-itents.png "Screenshot showing the 'Privileged Gateway Intents' options")

*Note:- If your application is verified or if your bot is in more than 100 servers, you'll need to apply for Privileged Gateway Intents to use them.* 

## Adding configuration for the discord nodes

Before proceeding further, make sure you have added the environment variable for your bot's secret token. Using environment variables prevents the configuration token from being exposed in the application flow. For more information refer to the guide on [Using environment variable](/blog/2023/01/environment-variables-in-node-red/).

1. Drag the DiscordMessageManager Node onto the canvas.
2. Double-click on it and then click on the pencil icon next to "Token" input field, and add the environment variable added for the bot token into the Token input field.

## Sending a message to User

To send a message to a user, you will need the ID of that user. Before copying the ID, ensure that you have enabled "Developer Mode" in Discord, which starts displaying IDs for users, channels, and messages. Navigate to the Discord app, go to "Settings" -> "Advanced," and enable the "Developer Mode" option.

!["Screenshot showing the 'Developer mode' option"](/node-red-media/notification/images/discord-with-node-red-developer-mode.png "Screenshot showing the 'Developer mode' option")

1. In the Discord app, click on the user profile you want to send a message to, and click on "Copy User ID" to copy the ID.

!["Screenshot showing 'copy user id' option"](/node-red-media/notification/images/discord-with-node-red-user-id.png "Screenshot showing 'copy user id' option")

2. Drag an Inject node onto the canvas.
3. Set the `msg.payload` to the message you want to send and the `msg.user` to the user ID of the user you want to send the message to.
4. Connect the Inject node's output to the input of the DiscordMessageManager node.

!["Sending messages to Discord users"](/node-red-media/notification/images/discord-with-node-red-sending-msg-to-user.gif "Sending messages to Discord users")

## Sending messages to the Discord server

To send a message to the Discord server, you have to make sure that your bot is a member of that server with appropriate permissions.

### Adding the bot to the Discord server

1. Navigate to the Discord Developer Portal and click on your application, then click on the OAuth2 option from the sidebar.
2. Select "bot" from the OAuth2 URL Generator's scope section and select the permissions you want to give to the bot in the server.
3. At the bottom, you'll find the "Copy" button. Click on it to copy the OAuth2 URL.
4. Paste that URL into the browser field and press Enter.
5. Now, you'll see a Discord popup. Select the server to which you want to add the bot and click on the "Continue" button.

!["Screenshot showing discord popup to add bot into the server"](/node-red-media/notification/images/discord-with-node-red-select-the-server.png "Screenshot showing discord popup to add bot into the server")

6. Next, confirm that you want to give the permissions you selected while generating the OAuth2 URL to the bot on the server and click "Authorize" to add it to the server along with those permissions.

!["Screenshot showing conformation discord popup asking to conform the permission should be given to bot into server"](/node-red-media/notification/images/discord-with-node-red-conform-add-to-server.png "Screenshot showing conformation discord popup asking to conform the permission should be given to bot into server")

### Sending messages to Discord server

1. Drag the Inject node onto the canvas.
2. Set the `msg.payload` to the message you want to send, and set `msg.channel` (you can also set it in the node) to the Channel ID to which you want to send the message. To grab the Channel ID, go to the Discord app, right-click on the server in the sidebar where the channel is located that you want to send the message to, click on the channel, and then click on "Copy Channel ID.

!["Screenshot showing 'copy channel id' option"](/node-red-media/notification/images/discord-with-node-red-channel-id.png "Screenshot showing 'copy channel id' option")

3. Connect the Inject node's output to the input of the DiscordMessageManager node.

!["Sending message to Discord server's channel"](/node-red-media/notification/images/discord-with-node-red-sending-msg-to-server.gif "Sending message to Discord server's channel")

## Receiving messages from Discord

1. Drag the DiscordMessage node onto the canvas.
2. Double-click on it to ensure you have configured your bot correctly.
3. Drag the Debug node onto the canvas, double-click on it, and select the output to "Complete message object".

After deploying the flow, you will start receiving messages sent to your bot. In the debug panel in the sidebar, you will see the message object printed for each message, which contains different objects. Each object shows different details; for example, the author object contains details about the sender, and the channel object includes information of the channel if the message was sent in a channel.

!["Receiving messages from users and server channels"](/node-red-media/notification/images/discord-with-node-red-receiving-messages.gif "Receiving messages from users and server channels")

Below, I have provided the complete flow we built throughout the guide. Make sure to replace the environment variable 'BOT_TOKEN' with your actual bot token.



::render-flow
---
height: 200
flow: "W3siaWQiOiI3YThkZDQ5Zjk2MTQ2MDhlIiwidHlwZSI6ImluamVjdCIsInoiOiI0Njc0ZWQ2Njg2ODVhZGY2IiwibmFtZSI6IlNlbmRpbmcgbWVzYXNnZSB0byBEaXNjb3JkIHNlcnZlciAncyBjaGFubmVsIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJIZWxsbywgIFRoaXMgaXMgZnJvbSBOb2RlLVJFRCIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6NTcwLCJ5Ijo0MjAsIndpcmVzIjpbWyIzOTg0YzIwYTUyZGIwMzNmIl1dfSx7ImlkIjoiMzk4NGMyMGE1MmRiMDMzZiIsInR5cGUiOiJkaXNjb3JkTWVzc2FnZU1hbmFnZXIiLCJ6IjoiNDY3NGVkNjY4Njg1YWRmNiIsIm5hbWUiOiIiLCJjaGFubmVsIjoiNTY0NTQ2NDU2NTc3NjU2NTYiLCJ0b2tlbiI6IiIsIngiOjkzMCwieSI6NDIwLCJ3aXJlcyI6W1siYjk5YWU3NTQyNTA0N2I2YiJdXX0seyJpZCI6ImI5OWFlNzU0MjUwNDdiNmIiLCJ0eXBlIjoiZGVidWciLCJ6IjoiNDY3NGVkNjY4Njg1YWRmNiIsIm5hbWUiOiJkZWJ1ZyAzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjEyMDAsInkiOjQyMCwid2lyZXMiOltdfSx7ImlkIjoiNmFmNzQwZTExYWJhNmNhMiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiNDY3NGVkNjY4Njg1YWRmNiIsIm5hbWUiOiJTZW5kaW5nIG1lc3NhZ2UgdG8gRGlzY29yZCB1c2VyIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoidXNlciIsInYiOiI2NTQ1NDUzNDUzNDM0NTM2NSIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJIZWxsbywgU3VtaXQiLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjU1MCwieSI6MzIwLCJ3aXJlcyI6W1siZjY5MzYzZjM0MWI2MjMzMyJdXX0seyJpZCI6ImY2OTM2M2YzNDFiNjIzMzMiLCJ0eXBlIjoiZGlzY29yZE1lc3NhZ2VNYW5hZ2VyIiwieiI6IjQ2NzRlZDY2ODY4NWFkZjYiLCJuYW1lIjoiIiwiY2hhbm5lbCI6IiIsInRva2VuIjoiIiwieCI6OTMwLCJ5IjozMjAsIndpcmVzIjpbWyJjNTAwMWE3ODM5OTJhZTAxIl1dfSx7ImlkIjoiYzUwMDFhNzgzOTkyYWUwMSIsInR5cGUiOiJkZWJ1ZyIsInoiOiI0Njc0ZWQ2Njg2ODVhZGY2IiwibmFtZSI6ImRlYnVnIDQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTIyMCwieSI6MzIwLCJ3aXJlcyI6W119LHsiaWQiOiI4MjBiNzA4MjY1NDVhNDAxIiwidHlwZSI6ImRlYnVnIiwieiI6IjQ2NzRlZDY2ODY4NWFkZjYiLCJuYW1lIjoiZGVidWcgMiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTAyMCwieSI6NTQwLCJ3aXJlcyI6W119LHsiaWQiOiJmMDQ0ZDM3ODRlZjhjNzRhIiwidHlwZSI6ImRpc2NvcmRNZXNzYWdlIiwieiI6IjQ2NzRlZDY2ODY4NWFkZjYiLCJuYW1lIjoiIiwiY2hhbm5lbElkRmlsdGVyIjoiIiwidG9rZW4iOiIiLCJ4Ijo3MjAsInkiOjU0MCwid2lyZXMiOltbIjgyMGI3MDgyNjU0NWE0MDEiXV19XQ=="
---
::



## Debugging and Troubleshooting

Below are common errors that can occur while integrating Discord with Node-RED, along with troubleshooting tips.

!["User disallowed intent"](/node-red-media/notification/images/discord-with-node-red-error-3.png "User disallowed intent")

If your Discord nodes show a status similar to the image above, you might still need to enable the [Privileged Gateway Intents](https://discord.com/developers/docs/topics/gateway#gateway-intents) option. If you have already enabled it but are still encountering this issue, it could be due to your app bot is verified. A verified app bot is required to apply for the privileged gateway intents. For more information, refer to [Discord support article](https://support-dev.discord.com/hc/en-us/articles/6205754771351-How-do-I-get-Privileged-Intents-for-my-bot).

!["DiscordAPIError:Unknwon channel"](/node-red-media/notification/images/discord-with-node-red-error-2.png "DiscordAPIError:Unknwon channel")

![DiscordAPIError:Unknwon user](/node-red-media/notification/images/discord-with-node-red-error-1.png "DiscordAPIError:Unknwon user")

If you are getting errors similar to the images above, it's likely because the `channelId` or `userId` is invalid. Double-check and correct these identifiers to resolve the errors.
