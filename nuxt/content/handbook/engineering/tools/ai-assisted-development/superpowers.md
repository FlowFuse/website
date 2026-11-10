---
title: "Working with superpowers"
---

# Working with superpowers

[Superpowers](https://github.com/obra/superpowers) is a Claude Code plugin made of process skills. It adds no FlowFuse knowledge. It changes how Claude works: ask before building, plan before coding, find the root cause before fixing. This page covers the three skills that have paid off most for us, one FlowFuse scenario each.

Nothing here is mandatory. Superpowers is a suggestion for people who want more structure from Claude. It also burns noticeably more tokens than plain Claude Code: the questions, the subagents, and the reviews between tasks  all cost context. Use it where that structure pays back, and tell Claude to skip it for quick fixes.

It assumes Claude Code is running. Do the [playwright-cli walkthrough](./playwright-cli.md) first, because brainstorming leans on a browser to look at the real UI.

## 1. Install

Inside Claude Code:

```
/plugin install superpowers@claude-plugins-official
```

Restart, then `/skills` shows a `superpowers:` group. From a terminal the same is `claude plugin install superpowers@claude-plugins-official`.

Housekeeping:

- The skills write design documents to `docs/superpowers/specs/`, plans to, and mock-ups to `.superpowers/` inside the repository. None of it belongs in a PR. Add `docs/superpowers/` and `.superpowers/` to `.git/info/exclude` or your global git excludes.
- Some skills end by suggesting a commit. Tell Claude once that it never commits unless asked. Your instructions and CLAUDE.md outrank any skill.

## 2. What changes

You rarely call a skill. Claude picks one up when a request matches and says so, for example "Using brainstorming to work out what the banner should do", and then asks a question instead of writing code. Ask for a skill by name when you want it, or say you want none for this request.

## 3. Brainstorming

Brainstorming makes Claude stop building and start asking. It has two gears, chosen by how much is missing from your request.

**Quick gear.** You ask for a warning banner on the instance settings page when the stack is deprecated. Almost everything is in the request, so Claude asks one question, then offers to look at the real page. With playwright-cli that means logging in to your local platform, taking a snapshot of the settings page, and coming back with a placement and wording. You say yes, it builds. No documents.

**Comprehensive gear.** You want a proper look at the Tables feature's UI to find what is awkward and decide what to improve. Claude asks one question at a time in your words, then does recon: it walks the real Tables pages at desktop width, in dark mode, and at a narrow viewport. When a question is visual it offers a browser tab with mock-ups, served by the skill itself; you click the variant you prefer and the choice comes back as your answer. The outcome need not be code. In this case it was an epic with sub-issues and the mock-ups attached. When it is code, Claude writes a design document, has a fresh subagent read it as a builder and report gaps, then asks whether it captures what you want. Nothing is built until you say so.

**Mock-ups that hold up.**

- Start from a screenshot of the real page. Mock-ups drawn on an imagined frame get the menu and layout wrong, and the first round is spent fixing that.
- Link the real stylesheet so spacing and colours are the ones we ship.
- Have Claude render the mock-up and look at it before discussing it.
- Iterate in place: edit the same file, reload the tab.
- When the companion is overkill, a throwaway HTML file in a git-excluded scratch folder opened in your own browser does the job.

Answer in your own words rather than picking from menus. Treat "ready for a plan?" as a real question; one more round of questions is cheaper than a plan built on a thin description.

## 4. Plans and execution

Once the description is approved, writing-plans produces a dated file under `docs/superpowers/plans/`. Each task lists the files it touches, the steps, and how to verify. Take a new team-type feature flag from our own handbook: migration, a route guarded by `app.needsPermission`, a frontend toggle. The plan splits by layer, forge then frontend, with the unit test for each step before the code.

Claude then asks how to execute. Inline (executing-plans) works through the tasks in the current session. Subagent-driven development hands each task to a fresh subagent with a review between tasks: faster for independent tasks and keeps the conversation readable, at the cost of more tokens. Our scoping rule still applies: a plan larger than a small PR becomes a chain of small PRs, and the plan should say where the cuts are.

## 5. Systematic debugging

The skill that holds up across the whole ecosystem, not only the platform repository. One rule: no fix before the root cause is understood. Four phases: investigate, find the pattern, state one hypothesis and test it, implement.

A report says the device editor tunnel drops a few seconds after a deploy. The tempting fix is a reconnect. With this skill Claude first reads the launcher log on the instance, the device agent output and the forge log around the deploy, and the order of events between them. It reproduces the drop on a throwaway device, states one hypothesis, designs the smallest check that would disprove it, and only writes a change once the check confirms the cause.

The same discipline works for review. Hand it a colleague's PR and ask it to verify the claim the PR makes; it treats the claim as a hypothesis to test, not a summary to write.

Its companion is verification-before-completion: no "tests pass" without the output. If Claude says something works, ask what it ran.

The investigation phase is only as good as the data Claude can reach. Beyond local logs it can be connected to the FlowFuse insights MCP server, which wraps Grafana and Prometheus, to PostHog and to Sentry, and pull the metrics, events and error traces it needs itself. Setting up each of those connections gets its own page in this section.

## 6. The rest, briefly

- **test-driven-development** writes the failing test first. writing-plans assumes it.
- **using-git-worktrees** gives a plan its own checkout.
- **requesting-code-review** and **receiving-code-review** run a review unprompted and make Claude verify feedback rather than agree with it.
- **finishing-a-development-branch** walks through merge, PR, or discard.
- **writing-skills** turns a repeatable chore into a skill of your own.

## Where it rubs against our rules

Superpowers assumes a lone developer who lets Claude commit. We do not work that way: you review, you commit, you open the PR. The skills do not override your instructions, but they will keep suggesting it, so put the rule somewhere durable. Three levels, pick how firm you want it.

**1. Write it down once.** `~/.claude/CLAUDE.md` is read in every repository you open. A short block there beats repeating yourself:

```markdown
# Committing
- Never run git commit or git push unless I ask for it in that message. Finishing a task is not permission.
- Design documents and plans from skills are working files. Never add them to a commit.
- Issues and PRs follow the FlowFuse contributing guide, not a skill's template.
```

**2. Let Claude remember it.** If you would rather not edit files, say it in the conversation: "remember that you never commit unless I ask". Claude stores it in its memory for the project and recalls it at the start of every session. This is softer than CLAUDE.md, since memory is advice Claude reads rather than an instruction it is bound to, but it is enough for most days.

**3. Enforce it with a hook.** A permission rule set to ask is skipped when Claude runs in auto mode. A hook is not, so this is the only option that holds in every mode. Save this as `~/.claude/hooks/git-needs-a-human.sh` and make it executable:

```bash
#!/usr/bin/env bash
# PreToolUse hook on Bash: anything that publishes work gets bounced to a yes/no prompt.
set -uo pipefail
cmd=$(jq -r '.tool_input.command // empty') || exit 0
[[ -z $cmd ]] && exit 0

ask() {
  jq -nc --arg r "$1" '{hookSpecificOutput: {hookEventName: "PreToolUse", permissionDecision: "ask", permissionDecisionReason: $r}}'
  exit 0
}

# one shell command per segment, so grepping a file for "git push" does not trip the rule
mapfile -t segments < <(printf '%s' "$cmd" | sed -E 's/(\|\||&&|[;&|\n]|\$\(|`)/\n/g')
for seg in "${segments[@]}"; do
  [[ $seg =~ (^|[[:space:]])git([[:space:]].*)?[[:space:]](commit|push)([[:space:]]|$) ]] \
    && ask "This publishes work. Ask the user to review it first, or to run it themselves."
  [[ $seg =~ (^|[[:space:]])gh[[:space:]]+(pr|issue|release)[[:space:]]+(create|new)([[:space:]]|$) ]] \
    && ask "This opens something on GitHub other people will see. Ask the user first."
done
exit 0
```

Then register it in `~/.claude/settings.json`:

```json
{
    "hooks": {
        "PreToolUse": [
            {
                "matcher": "Bash",
                "hooks": [{ "type": "command", "command": "/home/you/.claude/hooks/git-needs-a-human.sh" }]
            }
        ]
    }
}
```

From then on every `git commit`, `git push`, `gh pr create` and `gh issue create` that Claude attempts turns into a yes or no prompt for you, whatever mode it runs in, and Claude is told to hand the command back to you instead. It needs `jq` installed. It is a guardrail against carelessness, not a sandbox: a commit hidden behind a script or a variable will not be caught.

Whichever level you choose, the [AI Development and Customer Data Policy](../../../company/security/ai-development-and-customer-data.md) still applies to every brainstorm and debugging session, and issues and PRs still follow the [contributing guide](../../contributing).
