### Installing FlowFuse Device Agent

 Before starting the installation, it is recommended to update your system to ensure that all your packages are up to date. You can use groov manage, which acts as the command central for your groov RIO devices. For detailed instructions on how to update the system, [watch this video](https://www.opto22.com/support/resources-tools/videos/playlist-what-is-groov-epic?wchannelid=61lkudfc8c&wmediaid=mxzzp2kudx).

 To install the FlowFuse Device Agent and run Node-RED, Node.js is required. Opto 22 devices typically come with Node.js v14 preinstalled. You can verify the installed version by running:

 ```bash
 node -v
 ```

 The result will show the currently installed Nodejs version. For example:

 ```bash
 v14.20.0
 ```

 The latest versions of the FlowFuse Device Agent require Node.js v18 or later. However, if your device only supports Node.js v14 or v16, you can install Device Agent version [2.8](https://www.npmjs.com/package/@flowfuse/device-agent/v/2.8.0), which is compatible with those versions.

 In this guide, we will proceed with installing Device Agent v2.8:

 ```bash
 sudo npm install -g @flowfuse/device-agent@2.8
 ```