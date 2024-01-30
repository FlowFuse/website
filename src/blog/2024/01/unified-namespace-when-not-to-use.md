---
title: "Unified Namespace: When to Use It, and When to Choose Something Else"
subtitle: Data isn't created equal, some data doesn't fit the UNS 
description: Data isn't created equal, some data doesn't fit the UNS
date: 2024-01-31
authors: ["zeger-jan-van-de-weg"]
image: # TODO and update the UNS pillar page link image
tags:
    - posts
    - flowfuse
    - unified-namespace
---

At FlowFuse, we're convinced of the Unified Namespace (UNS) architecture for IoT cases. It's a powerful tool that can make information much more readily available and easy to consume. However, as with any architecture, there are times when it's not the best choice. In this blog post, we'll discuss when to use the UNS and when to consider other options.

<!--more-->

### Latency sensitivity

When automating tasks, performing tasks with requirements on latency aren’t too common in a digital environment. Requesting APIs from another server, normalizing data, and sending it towards another service takes very little time, though it hardly matters if you’re 100ms later than usual. In industrial automation or other cases where physical safety is safeguarded, there’s a requirement for low latency to ensure that data is transmitted and processed quickly enough to maintain real-time control of processes.

Extending this beyond the UNS – For control use-cases, use specialized software and do not rely on third parties to broker the information correctly.

However, while control was used as an example here, the general case here is not the UNS for real-time, low-latency communication.


### Large files or binary data

Sending large blobs of binary data for example pictures, archives, etc through UNS is not recommended because it has several drawbacks. First, UNS is optimized for small, mostly text-based communication, and sending binary data through it can significantly increase message size and processing overhead. As sender of the data there’s also generally no control over the amount of receivers of the data, so if you send a large file to the broker once, it might need to be copied many times for each and every receiver.

To overcome these limitations, it is more efficient and practical to store binary data elsewhere, such as on a shared storage location or a cloud service. Once the data is stored externally, a reference to its location can be sent through UNS.


### Data security and data access

The UNS becomes more useful the more hubs are connected, and it stands to reason that better business outcomes are achieved when everything is connected. Not just the sensor data (Level 1 of the [automation pyramid](/blog/2023/08/isa-95-automation-pyramid-to-unified-namespace/#automation-pyramid---visualization) _except actuators_), but also the customer facing systems like your ERP (Level 4 or the automation pyramid), and even your CRM. This would allow better insight and communication with the customer when, for example, their car is done with production and will be shipped to them. The CRM-system, Customer relationship management, contains personal details about the customer though. Publishing what customer ordered products might thus disclose personal identifiable information (PII).

Connecting a CRM is certainly possible, and could streamline the supply chain, but PII shouldn’t be published. Consider if there’s a unique ID for the customer instead to use. Does your CRM for example keep a customer ID? If not, mask the information instead. Use strong hashing algorithms like SHA-512 to hash their email addresses. This way other systems can cross reference messages received in the UNS, without ever knowing the customer PII. Another venue to explore is topic based authentication for data receivers, which most data brokers provide. However, stripping and masking PII is still highly recommended either way.

### In Conclusion

The Unified Namespace is a powerful architecture that can make IoT data more accessible and easier to consume. However, it's not always the best choice for all applications. When considering whether to use the UNS, be sure to weigh the benefits against the potential risks. If you need low latency, strong data security, or fine-grained control over data access, you may need to adjust your  architecture pattern, or instantiate point to point connections through REST or other interfaces.
