---
navTitle: Hardware Security Policy
---

As an all-remote company, good security practices are required of all FlowFuse employees.

The following guide details requirements for personal computer security; these are in support of our broader [security policies](/handbook/company/security/).

We use the Vanta Agent to monitor a set of these requirements, but it does not cover them all. At this time, we rely on self-managed compliance.


### Encrypted Hard Drive

_Monitored by Vanta_

Ensure your hard drive is encrypted to prevent unauthorized access. This is a built-in feature of all operating systems and must be enabled.

### Anti-Virus

_Monitored by Vanta_

System-level anti-virus must be enabled.

 - Windows: use the built-in Windows Defender Antivirus
 - MacOS: Enable Gatekeeper/XProtect
 - Linux: _guidance tbd_

### Use of a Password Manager

_Monitored by Vanta_

To encourage secure password usage, FlowFuse provides 1Password to all employees.

### Screenlock Enabled

_Monitored by Vanta_

Devices must have a screenlock configured to enable after a short period of idle time (maximum 15 minutes).

### Firewall

Enable a firewall to prevent external access to your device.

  - Windows: use the built-in Windows Defender firewall
 <details>
<summary><strong>- MacOS: use the built-in firewall service</strong></summary>

1. Open **System Settings**  
2. Go to **Network**  
3. Select **Firewall** on the sidebar  
4. Click **Turn On Firewall** if it's not already enabled

</details> 
  - Linux: use the appropriate tool for your distribution, eg `ufw`/`firewalld`/`shorewall`

### Disable guest/auto-login

Disable any guest accounts on the device and do not allow auto-login of any account.

### Keep software up to date

All software, from the Operating System to the Browser, must be kept up to date. Where possible enable auto-updates and actively ensure they are applied.

### Secure Browsing

As so much of our work is done in the browser, it is a crucial tool to keep secure. The following guidelines should be followed; specific details will vary depending on the browser being used.

 - Keep the browser up to date
 - Only install trusted extensions and keep them up to date
 - Enable the 1Password extension to provide secure password management
 - Chrome: enable [Enhanced protection](https://support.google.com/chrome/answer/9890866) browsing protection level

### Secure log retention

Operating system logs should be retained and stored securely. As long as hard drive encryption is enabled, no immediate additional action is currently required.

### Intrusion Detection and Prevention

For users with privileged access to production systems, additional controls will be required. This have not yet been fully defined, but will require
solutions around Intrusion Detection and Prevention (IDPS).

A lot of the controls outlined above play a part in this; firewalls, malware detection, anti-virus etc.

Each operating system has its own tools available for full Intrusion Detection; this guide will be updated with details as our requirements mature.



