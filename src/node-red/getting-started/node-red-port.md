---
eleventyNavigation:
  key: Port Configuration
  order: 2
  parent: Getting Started
meta:
  title: Node-RED Port
  description: Learn how to configure Node-RED ports, change default settings, secure your installation, and set up remote access with FlowFuse.
  keywords: Node-RED port, port 1880, change Node-RED port, Node-RED security, remote access, FlowFuse, port configuration
---

# {{ meta.title }}

Node-RED runs on **port 1880** by default. This is the network port where Node-RED listens for connections. When you start Node-RED, you access the editor by opening `http://localhost:1880` in your browser. All your HTTP endpoints and the Node-RED interface are served through this port.

## Changing the Default Port

There are times when you need to change the default port - perhaps 1880 is already in use by another application, or you're running multiple Node-RED instances, or you simply prefer a different port number.

### Temporary Port Change

For a one-time port change, start Node-RED with the `--port` flag:

```bash
node-red --port 8080
```

Now access Node-RED at `http://localhost:8080`. This change only lasts for the current session.

### Permanent Port Change

To make the port change permanent, edit your Node-RED settings file (`settings.js`) located in the Node-RED user directory (commonly `~/.node-red/settings.js` on Linux/macOS; on Windows it’s typically under your user profile at `.node-red\settings.js`).

```javascript
uiPort: process.env.PORT || 8080,
```

Save the file and restart Node-RED. The new port setting will persist across all future sessions.

## Securing Your Node-RED Installation

**Critical Security Note:** By default, Node-RED has no authentication or authorization. Anyone with network access to this port can view and modify your flows, access your data, and control your connected devices. Always secure Node-RED before exposing it to any network beyond your local development machine.

### Enable Authentication

Add user authentication by editing your `settings.js` file:

```javascript
adminAuth: {
    type: "credentials",
    users: [{
        username: "admin",
        password: "$2b$08$...",  // Generate with: node-red admin hash-pw
        permissions: "*"
    }]
}
```

Generate a secure password hash by running:

```bash
node-red admin hash-pw
```

Enter your desired password when prompted, then copy the generated hash into your settings file.

> **Note**: adminAuth secures the editor/admin UI (and admin API), but it doesn’t protect http in endpoints by default.

### Firewall Protection

Restrict network access using a firewall. For Linux users, this example allows only devices on your local network (192.168.1.x) to access Node-RED:

```bash
sudo ufw allow from 192.168.1.0/24 to any port 1880
```

Adjust the IP range to match your network configuration.

## Accessing Node-RED Remotely

When you want to access your Node-RED instance from outside your local network. The manual approach is complex and requires ongoing maintenance. You would need 

- Configure port forwarding on your router

- Set up and maintain SSL/TLS certificates for HTTPS

- Configure proper authentication and authorization

- Implement rate limiting and DDoS protection

- Keep security patches up to date

- Monitor suspicious access attempts

- Manage firewall rules and security patches

- And much more

### The Easy Way

FlowFuse makes Node-RED production-ready with secure remote access built in.

Access your instances from anywhere through HTTPS without router configuration or certificate management. The platform handles SSL certificates automatically, provides role-based access control, and maintains enterprise-grade security through encrypted communications and comprehensive audit logging.

Device Agents connect your Node-RED instances to FlowFuse, enabling secure remote access immediately after registration. Your team connects from any location while FlowFuse manages infrastructure, security updates, and system reliability.

Remote access works without port forwarding, certificate renewals, or manual security configuration. FlowFuse handles the complexity so you can focus on building flows.

Learn more about [setting up FlowFuse for production Node-RED deployments](/blog/2025/09/installing-node-red/).

## Troubleshooting Port Issues

### Port Already in Use

If Node-RED fails to start with an error message like:

```
Error: listen EADDRINUSE: address already in use :::1880
```

This means another application is already using port 1880. Either stop the application that's using the port, or run Node-RED on a different port.
