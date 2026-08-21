### Connecting the Device to FlowFuse

The installer asks whether you are registering a new instance or connecting with a One-Time
Code.

**Registering a new instance.** Choose this if the device is not yet on your FlowFuse
platform. The installer gives you a URL to open in your browser. Complete the registration
there, keep the tab open, and switch back to the terminal. If you do not have a FlowFuse
account yet, you can create one at this point.

**Connecting with a One-Time Code.** Choose this if you already added the Remote Instance in
FlowFuse and it gave you a One-Time Code. Enter the code when the installer asks for it.

For more detail on both paths, see [Register your Remote Instance](/docs/device-agent/register/).

### Checking the Service

The installer creates a system service named after the port the agent uses, so the default is
`flowfuse-device-agent-1880`:

```bash
sudo systemctl status flowfuse-device-agent-1880
```

The device should now show as **running** in the FlowFuse platform.
