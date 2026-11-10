---
title: "Connecting Claude Code to insights"
---

# Connecting Claude Code to insights

[insights.flowfuse.com](https://insights.flowfuse.com) is the Grafana in front of the platform's Prometheus metrics and Loki logs. Connected to Claude Code, Claude can check whether a deploy moved a metric, dig through the forge logs for the error you are chasing, or pull the numbers behind a dashboard panel without you hand-writing the PromQL.

Unlike [PostHog](./posthog.md) and [Sentry](./sentry.md) there is no claude.ai connector for it. You run Grafana's own MCP server on your machine with a read-only token, and the token is the part you have to ask for.

## 1. Ask for a read-only service account

Open an issue in [FlowFuse/CloudProject](https://github.com/FlowFuse/CloudProject/issues) asking for a Grafana service account on insights.flowfuse.com with the **Viewer** role, plus a token for it. [This issue](https://github.com/FlowFuse/CloudProject/issues/1584) is the one to copy: what you want to do with it, that it needs to query the Prometheus and Loki datasources and not only read dashboard JSON, and that it must have no write access anywhere.

A Grafana admin creates the account, named after you, and hands you the token privately. Treat it like a password. Only Grafana admins can change or revoke the account, so the same issue is where you ask for that later.

## 2. Install mcp-grafana

Grafana ships the server as a single binary. Download the one for your platform from the [releases page](https://github.com/grafana/mcp-grafana/releases), put it on your `PATH` as `mcp-grafana`, and check it:

```
mcp-grafana --version
```

If you have Go, `go install github.com/grafana/mcp-grafana/v2/cmd/mcp-grafana@latest` does the same. There is also a Docker image, `grafana/mcp-grafana`, run with `-i` and `-t stdio`, if you would rather not keep a binary around.

## 3. Keep the token out of the MCP config

Claude Code stores MCP server definitions, environment included, in `~/.claude.json`. Putting the token there works, but it is one more plain-text file with a credential in it. The tidier way is a wrapper script that sources an env file and starts the server.

Create `~/.config/flowfuse-monitoring/claude-grafana.env`, readable by you only:

```
GRAFANA_URL=https://insights.flowfuse.com
GRAFANA_SERVICE_ACCOUNT_TOKEN=glsa_...
```

```
chmod 600 ~/.config/flowfuse-monitoring/claude-grafana.env
```

Then `~/.config/flowfuse-monitoring/mcp-grafana-wrapper.sh`, made executable:

```bash
#!/usr/bin/env bash
set -euo pipefail
set -a
source "$HOME/.config/flowfuse-monitoring/claude-grafana.env"
set +a
exec mcp-grafana \
  -disable-write \
  -disable-oncall \
  -disable-incident \
  -disable-sift \
  -disable-asserts \
  -disable-pyroscope \
  "$@"
```

`-disable-write` drops every tool that creates or changes something, which the Viewer token would refuse anyway, and the other flags remove tool groups for Grafana Cloud products insights does not run. Fewer tools means less of Claude's context spent on tool descriptions.

On Windows without WSL there is no bash to run the wrapper, so pass the two variables with `-e` on the `claude mcp add` line below instead, and accept that they land in `~/.claude.json`.

## 4. Register it in Claude Code

One line, at user scope so it follows you across FlowFuse repositories:

```
claude mcp add flowfuse-insights -s user -- ~/.config/flowfuse-monitoring/mcp-grafana-wrapper.sh
```

Restart Claude Code and run `/mcp`. `flowfuse-insights` should be connected. Then ask the two questions that prove the token works end to end:

> Using insights, list the datasources. Then query Loki for the last 5 forge log lines.

The first answer should be two datasources, Loki and Prometheus. The second is the one that matters. On some Grafana setups datasources carry their own permissions on top of the org role, and a Viewer token can list dashboards fine while every query comes back empty or forbidden. If that happens, go back to your CloudProject issue and ask for the service account to be added to the datasource permissions.

## 5. How Claude uses it

The server exposes search, dashboard, Prometheus, Loki and alerting tools. The ones you will see most:

- `query_loki_logs` and `query_prometheus` run LogQL and PromQL. Claude writes the query; you read it before trusting the number.
- `list_loki_label_names`, `list_loki_label_values` and `list_prometheus_metric_names` are how Claude discovers what exists instead of guessing stream selectors and metric names.
- `search_dashboards` and `get_dashboard_panel_queries` pull the real query behind a panel, so "the numbers behind the instances dashboard" means the dashboard's own PromQL, not a reinvention of it.
- `query_loki_patterns` and `query_loki_stats` size a search before running it.

Things worth telling Claude once, or putting in your memory, because they are true of our setup and not discoverable:

- Forge logs are the `{app="flowforge"}` stream. They are pino JSON, so `| json | __error__=""` unlocks fields such as `res_statusCode`, `res_request_url`, `res_request_method` and `res_request_user`. The error guard matters: the stream also carries plain text lines, and without it a metric query fails on the first one.
- The ingress is Traefik and its access logs are `{container="traefik"}`. That is where to look for what clients saw at the edge, such as 502s during a rollout.
- Every merge to `main` rolls production. A burst of errors that lines up with a merge is usually the rollout, not the change.
- The MCP returns timestamps in UTC. The Grafana UI shows your local time. Give Claude ranges in UTC and do not mix the two.

A question that works:

> Using insights, between 17:50 and 18:20 UTC today, how many forge requests returned a 5xx, grouped by route? Show me the LogQL you used.

Claude will check the labels, run something like `sum by (res_request_url) (count_over_time({app="flowforge"} | json | __error__="" | res_statusCode >= 500 [30m]))`, and give you the breakdown with the query under it. Rerun the query in Explore when it matters.

## Rules

The logs carry usernames, team IDs and client IPs, so the [AI Development and Customer Data Policy](../../../company/security/ai-development-and-customer-data.md) applies in full.

- Ask for counts and patterns, not raw lines with users in them. If you need to see who hit an endpoint, open Explore yourself.
- Request URLs in the logs sometimes carry tokens in the query string. Group by route where you can, and never paste a URL with a token in it into an issue or PR.
- The token is yours. Do not share it, paste it into a chat, or commit the env file. If it leaks, ask for it to be revoked in the same CloudProject issue.
- Keep `-disable-write` in the wrapper. The Viewer role is the real guard, but the flag means Claude never even sees a tool it should not call.
