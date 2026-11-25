---
title: "Connecting Claude Code to PostHog"
---

# Connecting Claude Code to PostHog

PostHog holds the product analytics for the platform: page views, Expert sessions, MCP tool calls, onboarding steps and the rest. Connected to Claude Code, Claude can discover what we actually record and query it with SQL, so "how many teams used Expert on self-hosted last month" is a question you ask rather than an insight you build.

PostHog is one of the default connectors on the FlowFuse claude.ai organisation. There is no access request. You need a PostHog account that can see the FlowFuse project, which most of engineering already has.

## 1. Connect it once on claude.ai

1. Open [claude.ai/customize/connectors](https://claude.ai/customize/connectors).
2. Find PostHog in the list and click **Connect**.
3. Sign in to PostHog when asked. This is an OAuth sign-in, so Claude never sees your password, and the connection is yours alone.

That is the whole setup. Connectors you authorise on claude.ai are fetched by Claude Code automatically.

## 2. Check it in Claude Code

Run `/mcp`. The list has a claude.ai section, and `claude.ai PostHog` should be in it and connected. If it is not:

- Connectors only load when Claude Code is signed in with your claude.ai account. Run `/status` and check the authentication method. If an API key or token is active, unset it and run `/login`.
- If the connector shows `session token rejected`, run `/login`, then reconnect it from `/mcp`.
- If it is simply missing, restart Claude Code. The list is fetched at start.

You can switch the connector off for one repository from `/mcp`, which is handy when a project has nothing to do with analytics and you want fewer tools in context.

## 3. Without the connector

If you work without the organisation connector, for example on a personal plan, PostHog's own plugin does the same job from the marketplace we already use:

```
claude plugin install posthog
```

Run `/mcp` once and follow the browser sign-in. The plugin also adds slash commands such as `/posthog:insights` and `/posthog:errors`. The bare alternative is one line at user scope:

```
claude mcp add --transport http posthog https://mcp.posthog.com/mcp -s user
```

Do not run both. A server you add yourself takes precedence over the connector at the same address, and `/mcp` will show the connector as hidden.

## 4. How Claude uses it

The connector exposes a single tool, `exec`, which fronts about a hundred PostHog commands: `read-data-schema`, `execute-sql`, `insight`, `feature-flag`, `error-tracking`, `session-recording` and so on. Claude asks for a command's schema with `info <command>` and runs one with `call <command> {json}`.

The pattern that works is schema first, SQL second. Event and property names are only knowable from the data, so a good first question looks like:

> Using PostHog, which events track Expert usage, and for the main one show distinct users per deployment type over the last 30 days.

Claude will list the events with `read-data-schema`, read the properties of `expert-session`, then run something like:

```sql
SELECT properties.deployment AS deployment, count() AS sessions, uniq(person_id) AS users
FROM events
WHERE event = 'expert-session' AND timestamp > now() - INTERVAL 30 DAY
GROUP BY deployment
ORDER BY sessions DESC
```

If Claude guesses a property name instead of reading the schema, send it back to the schema. PostHog's own tool description says the same thing.

Limits are generous but real: 480 requests a minute and 4,800 an hour per sign-in, with session setup and tool listing counted. Calling the MCP is free. The data a query reads still counts as PostHog usage, and the AI-powered commands, such as session summaries, are billed as PostHog AI spend and only work if AI data processing is enabled for the organisation.

## Rules

PostHog is customer usage data, so the [AI Development and Customer Data Policy](../../../company/security/ai-development-and-customer-data.md) applies in full.

- Ask for aggregates. Counts, distinct users and breakdowns by property answer almost every product question. Person-level rows, distinct ids and emails do not belong in a chat transcript, an issue or a PR.
- Treat the connection as read-only unless you are deliberately doing otherwise. `exec` can also create annotations, change feature flags and edit insights. Say "only read" when you start, and review any tool call that writes before approving it.
- Numbers in an issue or PR should say where they came from: the event, the filter and the date range, so the next person can rerun the query.
