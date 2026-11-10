---
title: "Connecting Claude Code to Sentry"
---

# Connecting Claude Code to Sentry

Sentry holds the errors from the platform: the `flowfuse-backend` and `flowfuse-frontend` projects, with stack traces, releases, the request that failed and how often. Connected to Claude Code, Claude can pull the issue you are looking at, find what else broke in the same window, and check whether a fix on your branch matches the trace it is meant to fix.

Sentry is one of the default connectors on the FlowFuse claude.ai organisation. There is no access request. You need a Sentry account in the FlowFuse organisation, which engineering already has.

## 1. Connect it once on claude.ai

1. Open [claude.ai/customize/connectors](https://claude.ai/customize/connectors).
2. Find Sentry in the list and click **Connect**.
3. Sign in to Sentry when asked and approve the access. This is an OAuth sign-in, so Claude never sees your password, and the connection acts as you.

Connectors you authorise on claude.ai are fetched by Claude Code automatically.

## 2. Check it in Claude Code

Run `/mcp`. The claude.ai section should list `claude.ai Sentry` as connected. If it is not, the fixes are the same as for [PostHog](./posthog.md): make sure Claude Code is signed in with your claude.ai account rather than an API key, run `/login` if the connector reports a rejected token, and restart Claude Code if it is simply missing.

The first call in a session may come back asking you to authenticate. Claude will offer the link; open it, approve, and ask again.

## 3. Without the connector

Sentry's plugin from the marketplace we already use connects to the same hosted server and adds Sentry's skills for debugging and SDK setup:

```
claude plugin install sentry
```

The bare alternative is one line at user scope, scoped to our organisation so Claude is not asked which one you mean:

```
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp/flowfuse -s user
```

Do not run both the connector and your own server. The one you add yourself takes precedence and `/mcp` will show the connector as hidden.

## 4. How Claude uses it

The connector exposes a dozen tools. The ones that carry most of the work:

- `search_issues` and `search_errors` take a plain English question and translate it into Sentry's query syntax. Sentry's own search syntax works too, so `is:unresolved firstSeen:-24h` is as good a query as "new issues in the last day".
- `get_sentry_resource` takes a Sentry URL. Paste an issue link and Claude gets the stack trace, tags, breadcrumbs and the latest event.
- `search_traces`, `search_logs`, `search_replays` cover performance and session data for the same time window.
- `analyze_issue_with_seer` asks Sentry's Seer to find the root cause of an issue. It uses the organisation's Seer quota, so ask for it deliberately rather than letting Claude reach for it.
- `update_issue` resolves, assigns or archives an issue. This is the one that writes.
- `search_sentry_tools` and `execute_sentry_tool` reach the less common tools, such as alert rules and monitors.

A question that works:

> Production threw a burst of errors after the 17:50 UTC deploy. In Sentry, what errored in flowfuse-backend between 17:50 and 18:20, grouped by title and transaction with counts? Then open the top one and tell me whether the fix on this branch covers it.

Claude will run `search_errors` with the time window, fetch the top issue with `get_sentry_resource`, read the trace, and compare it against the diff. The useful part is the last step: Claude can hold the stack trace and your code in the same context, which the Sentry UI cannot.

For a review, the same tools go the other way. Give Claude the PR and ask whether any open issue in the last 30 days touches the code it changes. That turns "looks fine" into "this also closes FLOWFUSE-BACKEND-D5, which has fired 40 times since Tuesday".

Rate limits are per sign-in. If Claude fires several searches at once it may get a "Rate Limited" reply with a retry time, and the fix is to let it run them one at a time.

## Rules

Sentry events carry request data, so the [AI Development and Customer Data Policy](../../../company/security/ai-development-and-customer-data.md) applies in full.

- Ask for titles, counts, transactions and releases. Events also carry user emails, IP addresses and user agents, and those do not belong in a chat transcript, an issue or a PR. If you need to know who was affected, look in the Sentry UI yourself.
- Reading is fine, writing is a decision. Resolving, assigning or archiving an issue through Claude changes what the rest of the team sees. Say "read only" at the start of a session and review any `update_issue` call before approving it.
- Quote the issue, not the paraphrase. A finding in a PR should name the Sentry issue ID and the time window it came from, so the reviewer can open the same thing.
