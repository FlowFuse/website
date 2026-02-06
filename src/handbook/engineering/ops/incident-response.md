---
navTitle: Incident Response
---

# Incident Response

When an issue is identified that impacts the availablity of any part of the production platform,
it is vital we are able to respond effectively, resolve the issue and ensure lessons are learnt
to prevent it happening again.

This page outlines how we should handle these situations.

Any incident involving information security or data privacy must follow our
[Information Security Incident Response policy](../../company/security/incident-response.md).

## Communication

Once an incident has been identified, a thread should be started in `#dept-engineering` in slack
and a huddle started.

The purpose of the huddle is to ensure clear communication between individuals working on the incident
and to co-ordinate any actions taken.

The slack thread should be used to document findings and actions taken.


## Root Cause Analysis

Once the incident has been resolved such that customers are no longer impacted,
the CTO, or nominated individual, will raise an [Incident issue on the CloudProject repo](https://github.com/FlowFuse/CloudProject/issues/new/choose).

This contains three sections:

 - Timeline - reconstructed from the slack thread, this should provide a timeline of events from
   initial detection of the incident, to the point it has been resolved.
 - RCA - the root cause analysis should provide more details on what caused the incident. This
   should include any appropriate technical details, along with how it was resolved.
 - Actions - part of the RCA is to identify any follow-up actions that need to be completed

The issue should remain open until all actions are complete.

## Public Blog Post

Depending on the nature of the incident, we may choose to publish a blog post with details
for our customers. This should be our default response, however we may decide some incidents
are sufficiently localised to not warrent a full write-up.

The blog post should explain the incident in an accessible way - we want to be open with
our customers. This should include links to any relevant follow-up actions to demonstrate
what we learnt from the incident and how we will improve the platform in response.