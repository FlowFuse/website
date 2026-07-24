---
title: "OPC UA Security: How Threat Actors Exploit Industrial Protocol Vulnerabilities"
subtitle: "The attacks that work in the field aren't broken cryptography, they're security that was never switched on"
description: "Most OPC UA breaches don't crack the protocol's encryption. They walk through disabled trust lists, anonymous logins, stale ciphers, and servers left on the open internet. This post breaks down how attackers actually exploit OPC UA, vector by vector, drawing on research from Claroty, Bitsight, CISPA, Secura, and Kaspersky."
date: 2026-05-29
authors: ["sumit-shinde"]
image: /blog/2026/05/images/opcua-security-blog.png
tags:
    - posts
    - flowfuse
    - opcua
cta:
  type: contact
  title: "Connect your plant without opening it up"
  description: "FlowFuse helps you move industrial data off exposed, internet-facing servers and into a managed, secure architecture. Talk to our team about your OT connectivity."
tldr: "OPC UA ships with real authentication, signing, and encryption, but attackers rarely touch it. They exploit the gap between 'built in' and 'turned on': anonymous access, trust lists that don't enforce certificates, deprecated ciphers nobody removed, and internet-exposed servers Shodan finds for free. The protocol gives you the tools to close every vector. The question is whether they're switched on."
---

Threat actors don't break OPC UA's cryptography. They walk through the security it left switched off. The attacks that work in the field are disabled trust lists, anonymous logins left on, dead ciphers nobody removed, and servers sitting on the open internet. This post breaks down how attackers actually exploit OPC UA, vector by vector.

<!--more-->

That's the irony. Unlike most industrial protocols, OPC UA ships with real security: authentication, signing, and encryption built into the spec. It's what finally let your Siemens PLC, your Allen-Bradley controller, and your SCADA system speak the same language. But "built in" and "turned on" are different things, and attackers live in that gap.

## Why attackers target OPC UA

The OPC server sits at a dangerous spot in the stack. It talks to PLCs, HMIs, and robotic arms, then exposes everything through one interface. For an attacker, that's the appeal: compromise the server and you don't get one device, you get the read-and-write path to the physical process.

That changes the attacker's goal. In IT, the aim is usually to take over the machine. In OT, the more alarming prospect is the physical one: because the OPC server issues the commands that run the plant, blinding the operator or freezing the server can create a safety problem, not just a data breach.

The scale is real. [Claroty's Team82](https://claroty.com/team82/research/opc-ua-deep-dive-a-complete-guide-to-the-opc-ua-attack-surface) has disclosed more than two dozen OPC UA vulnerabilities since 2020, and its exploit framework has helped find close to 50 across clients, servers, and gateways.

## The exposure problem

Before any clever exploit, there's the basic question of who can reach the server. [Bitsight's TRACE research team](https://www.bitsight.com/blog/opc-ua-server-internet-device-exposures-in-2025), in a year-long scan through June 2025, found 14,220 internet-exposed OPC UA devices across 99 countries. Over half (51.74%) allowed unauthenticated access. Among the devices that reported their supported security modes, 80.26% supported an unencrypted "None" mode that transmits data in plaintext. Most anonymously accessible servers also had auditing disabled, so an attacker connects, reads the plant, and leaves no trail.

None of this is a flaw in OPC UA itself. The protocol offers strong authentication and encryption; these are deployment and configuration choices made by asset owners.

Anonymous access, as Bitsight senior security research scientist Vasco Pinto frames it, is what makes the exposure dangerous:

> This configuration represents a significant security risk, as it allows anyone to access server information and potentially read operational data without authentication.

[Bitsight TRACE](https://www.bitsight.com/blog/opc-ua-server-internet-device-exposures-in-2025)

Major OT vendors, including Siemens, Schneider Electric, and Rockwell Automation, all explicitly advise against putting these servers on the open internet. Thousands remain there anyway.

The lesson from OT researchers is blunt: attackers often don't need an exploit. Unauthenticated, internet-facing servers are the entry point, and Shodan does the recon for free.

## Anonymous and weak authentication

If anonymous login is enabled, the server simply doesn't authenticate the user, and combined with internet exposure, there's no attack to speak of. The attacker just connects.

There's a trap here too. OPC UA separates *application* authentication (does the server trust this client's certificate?) from *user* authentication (who is the user?). Anonymous user access is far less risky when application authentication is enforced, but dangerous when it isn't. Many deployments disable the wrong layer and assume they're still covered.

## Broken certificate validation

This one's the worst, because the servers *look* secure. They advertise certificate-based authentication. They just don't enforce it.

[CISPA researchers Alessandro Erba, Anne Müller, and Nils Ole Tippenhauer](https://arxiv.org/abs/2104.06051) systematically tested 48 OPC UA products and libraries. They found 38 of the 48 carried one or more security issues, and 7 didn't support the protocol's security features at all. The failures cluster around certificate and trust list handling: missing trust list support, trust lists disabled by default, and insecure trust list configuration. The researchers were careful to locate the problem in implementations and configuration rather than the protocol's design, though they argued the standard contributes by permitting these insecure options in the first place.

What does that buy an attacker? A machine-in-the-middle position. A third party inserts itself between two legitimate entities, intercepting and tampering with data while neither side notices, blinding maintenance staff to the real state of the plant. The operator's screen says everything is normal. It isn't. The researchers proved it: their attack framework, which implements Rogue Server, Rogue Client, and Middleperson modes against real implementations, could steal exchanged credentials, eavesdrop on process data, and manipulate the physical process through sensor and actuator values.

## Weak legacy crypto left switched on

OPC UA didn't build on TLS. It implemented its own cryptographic transport layer, which is exactly why Secura's Tom Tervoort, the researcher behind Zerologon, went after it [at DEF CON 33 in 2025](https://www.darkreading.com/vulnerabilities-threats/utilities-factories-encryption-holes-industrial-protocol):

> That makes it an interesting research target for me, especially because they're not relying on an existing standard protocol like TLS. They implemented their own cryptographic protocol.

Tom Tervoort, Secura

His work produced three CVEs, all credited to him in the vendor advisories, and by his own account at the talk the underlying issues affected at least seven products. [CVE-2024-42513](https://files.opcfoundation.org/SecurityBulletins/OPC%20Foundation%20Security%20Bulletin%20CVE-2024-42513.pdf) lets an unauthorized attacker bypass application authentication in the OPC UA .NET Standard Stack when HTTPS endpoints are enabled with a security policy other than None, which the OPC Foundation classifies as CWE-305 and rates medium severity. [CVE-2024-42512](https://files.opcfoundation.org/SecurityBulletins/OPC%20Foundation%20Security%20Bulletin%20CVE-2024-42512.pdf) targets the deprecated Basic128Rsa15 policy, which uses RSA with PKCS#1 v1.5 padding. The OPC Foundation classifies it as an observable timing discrepancy (CWE-208) with confidentiality impact and rates it medium severity, noting that Basic128Rsa15 is disabled by default, so most users are unaffected. CODESYS, assessing the same weakness in its own server as [CVE-2025-1468](https://certvde.com/en/advisories/VDE-2025-022/), describes the consequence more bluntly: an unauthenticated attacker exploiting the Bleichenbacher padding oracle (a decades-old attack that recovers RSA-encrypted secrets by watching how a server responds to malformed padding) could compromise the server certificate's private key, then bypass application authentication or decrypt traffic. The common thread is old, known-weak crypto that should have been retired but lingers in non-default configurations.

## Denial of service against the process

Not every attack reads or steals. Some just stop the plant. Flooding or crashing the OPC server kills the SCADA workstation's real-time view and command path.

This is where OPC UA research began. In 2018, [Kaspersky ICS CERT](https://ics-cert.kaspersky.com/publications/reports/2018/05/10/opc-ua-security-analysis/) reported 17 zero-day vulnerabilities in the OPC Foundation's products, spanning denial of service and remote code execution, plus several flaws in commercial applications built on the stack. All were reported and fixed by the end of March 2018. It's worth noting the OPC Foundation's own response: it reviewed the findings and pointed out that eight of the 17 sat in an ANSI-C *sample server application* shipped as example code on GitHub rather than in the production stack, and that many third-party flaws came from developers misusing the stack's API. The researchers also pinned down the realistic threat model in interviews: exploitation usually needs local network access, and they said they had never seen a configuration allowing direct internet attacks. The broader lesson holds regardless: because a single flaw in a shared OPC UA library or sample can propagate into every product built on it, one bug scales across the supply chain.

## Client and gateway exploitation

Servers aren't the only target. The client trusts the server, and that trust is exploitable. [Team82 demonstrated client-side remote code execution](https://claroty.com/team82/research/opc-ua-deep-dive-series-part-8-gaining-client-side-remote-code-execution) by exploiting the client's trust in data it receives from the server. Stand up a rogue server and you can reach back into the clients connecting to it.

Integration servers, the gateways stitching multiple OPC UA systems together, are richer still, because vulnerabilities chain. [In the Softing Secure Integration Server](https://claroty.com/team82/research/opc-ua-deep-dive-series-part-9-chaining-vulnerabilities-to-exploit-softing-opc-ua-integration-server), researchers chained four new bugs with a fifth to reach full remote code execution. No single flaw was catastrophic; strung together, they owned the box.

## The pattern

The vulnerabilities threat actors exploit in OPC UA are rarely clever zero days. They're disabled trust lists, anonymous logins, stale ciphers, exposed servers, and trusted clients fed bad data. The protocol gives you the tools to close every one. The question is whether they're switched on.

That's an architecture problem, and it's where we're headed next. In the follow-up, *How to Establish a Defensible OPC UA Security Architecture*, we'll turn these attack vectors into a concrete blueprint for building OPC UA deployments that hold up.
