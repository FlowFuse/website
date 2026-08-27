---
title: "Weekly Sales Digest"
---

# Weekly Sales Digest
 
The Weekly Sales Digest is a weekly summary of client and prospect calls, posted to the team in Slack. It covers product feedback customers raised and testimonials we can share more widely.
 
It exists so the team gets these updates without joining the Monday sales meeting. The digest is built from Fathom call recordings and drafted with Claude.


## Set up the automation
 
Run the prompt below in Claude as a recurring weekly task. Claude pulls the week's calls from Fathom, drafts the digest, and posts it as a subtask of the recurring Asana task in the **BizOps Departmental Project** under **Action Items**, titled [*Weekly Summary of Client calls and Prospects*](https://app.asana.com/1/1213818720452348/project/1213831710817565/task/1215982156234887?focus=true).
 
BizOps members review the draft on Friday, and the approved digest goes to Slack on Monday.
 
```text
Every Friday at 12:00 PM EST, build the weekly sales digest.
 
1. Pull all external calls from Fathom from the last seven days: customer,
   prospect, and partner conversations. Skip internal syncs and 1:1s. Use each
   call's AI summary; open the full transcript only when the summary is thin or
   the call mattered to a deal.
 
2. Answer both of these questions for each weekly digest:
   - Is there product feedback? Feature requests, friction, workarounds
     customers described.
   - Are there customer testimonials we can share more broadly? Direct quotes,
     outcomes, results Marketing can use.
 
3. Draft the digest with these sections, in this order:
   - Pipeline movement — what changed on each account, the next step, the owner
   - Product feedback — the account, and the request or friction in the
     customer's words
   - Testimonials and quotes — the account, the quote, and who said it
 
4. Post the draft as a subtask of the Asana task "[Weekly Summary of Client calls
   and Prospects](https://app.asana.com/1/1213818720452348/project/1213831710817565/task/1215982156234887?focus=true)" in the BizOps Departmental Project, Action Items section. Name
   the subtask with the week's date range and put the digest in the subtask
   description.
 
Rules: name the account behind every point. Quote only what the customer
actually said on the call. Keep it short and plain, no filler.
```
 
## Slack Message Digest template
 
```markdown
**Weekly Sales Digest — week of [date]**
 
**Pipeline movement**
- [Account] — [what changed, next step, owner]
 
**Product feedback**
- [Account] — [request or friction, in the customer's words]
 
**Testimonials and quotes**
- [Account] — "[quote]" — [name, title]
```
 
