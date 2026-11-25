---
title: "Browser automation with playwright-cli"
---

# Browser automation with playwright-cli

This walkthrough gets Claude Code driving a real browser against your local FlowFuse platform. When it is done, you can ask Claude things like "log in, open the first instance and tell me why the Settings tab shows a warning" and watch it happen in a browser window on your machine.

It assumes you already have Claude Code running and the [dev environment](https://github.com/FlowFuse/dev-env) serving the platform on `http://localhost:3000`.

## Why the CLI and a skill, not the Playwright MCP server

Playwright ships two ways to hand a browser to an AI agent: an MCP server and `playwright-cli`. We use the CLI plus its skill:

- Nothing long-running to register in Claude's MCP settings. The CLI is a normal command Claude runs in the terminal, and a small background process keeps the browser alive between commands.
- After each action the CLI saves the page snapshot to disk and returns a link to it, instead of pushing the whole page tree into the conversation at every step. Claude asks for a snapshot when it needs one.
- Behaviour is pinned in a config file on your machine, not in a prompt. The localhost restriction and the credentials handling below apply no matter what Claude is asked to do.
- The skill is a markdown file that teaches Claude the commands. You can read it, and you can add house rules to it.

## 1. Install the CLI

You need Node.js 18 or newer. Then, in any terminal:

```
npm install -g @playwright/cli@latest
playwright-cli --version
```

Platform notes:

- **macOS and Linux**: if you manage Node with `nvm`, `volta` or `fnm`, the global install belongs to the Node version that was active. Switching Node later means installing again.
- **Windows**: works from PowerShell and `cmd.exe`. The one catch is `&` in URLs, which both shells treat as a command separator. The skill already tells Claude how to escape it, so you only need to know about it when you type a URL yourself.
- **WSL**: a visible browser window needs a display. WSLg on Windows 11 provides one out of the box. Without it the browser can only run headless, which still works but you cannot watch it.

When a newer version is out the CLI prints a banner on every run telling you so. Re-run the install command above to update.

## 2. Install a browser

From the folder of a FlowFuse repository you work in, for example `dev-env/packages/flowfuse`:

```
playwright-cli install
```

This creates a `.playwright/` folder in that repository and picks a browser: it uses Chrome if you have it installed, otherwise it downloads a Chromium build. On Linux you may also need the system libraries the browser depends on:

```
playwright-cli install-browser chromium --with-deps
```

That one asks for `sudo`. Run it once, it covers every repository.

## 3. Install the skill for Claude Code

```
playwright-cli install --skills --global
```

This copies the skill to `~/.claude/skills/playwright-cli/` (`%USERPROFILE%\.claude\skills\playwright-cli\` on Windows), so it is available in every repository you open with Claude Code. We install it at user level on purpose: the `.claude/` folders in our product repositories are not tracked, so nothing you set up here ends up in a PR by accident.

Restart Claude Code, run `/skills`, and `playwright-cli` should be in the list.

The skill is tied to the CLI version. After you update the CLI it prints a banner saying the installed skill no longer matches. Re-run the command above to refresh it, then re-apply the house rule from step 7.

## 4. Restrict the browser to localhost

**We strongly encourage this.** By default the browser Claude drives can open anything: production, a customer's deployment, a third party site, or a form that posts somewhere you did not intend. Locking it to your own machine removes a whole class of accidents.

Create `~/.playwright/cli.config.json` (`%USERPROFILE%\.playwright\cli.config.json` on Windows):

```json
{
    "browser": {
        "launchOptions": { "headless": false }
    },
    "network": {
        "allowedOrigins": ["http://localhost:*", "http://127.0.0.1:*"]
    }
}
```

What this does:

- Every request to an origin not on the list fails inside the browser with `net::ERR_BLOCKED_BY_CLIENT`. Claude sees the error and cannot get past it. The `:*` covers the platform on port 3000 and the Node-RED instances the dev environment starts on other local ports.
- `headless: false` makes the browser visible by default so you can see what Claude is doing. You can still pass `--headless` on a given `open` if you prefer.
- `file://` URLs are blocked out of the box. Nothing to add for that.

Where the CLI looks for configuration, every time, with no flags:

1. `~/.playwright/cli.config.json` in your home folder. This is the one above, and it applies in every repository. Put the localhost lock here.
2. `.playwright/cli.config.json` inside the repository you run the command from. Optional. `playwright-cli install` from step 2 creates this folder, and the file is where repository-specific settings go, for example `"testIdAttribute": "data-el"` so Claude can target our `data-el` attributes in the FlowFuse frontend.

When both exist they are merged key by key and the repository file wins. That merge is per top-level key, so a `network` block in the repository file replaces the whole `network` block from your home file rather than adding to it. Keep the allowlist in one place.

Two honest caveats. Playwright documents the origin list as a guardrail, not a security boundary, and it does not apply to redirects. It stops the agent from wandering, which is the problem we care about. It is not protection against someone actively trying to get around it. Second, if a task genuinely needs another origin, for example reading the FlowFuse docs site, add it to the list deliberately for that task and take it out afterwards.

## 5. Give Claude a login without putting it in the conversation

Claude will need to sign in to your local platform. Three rules first:

- Never paste a password into the Claude Code conversation. It ends up in the session transcript on disk.
- Use a dedicated local user, not the account you use anywhere else. Your local dev platform is the only place these credentials should work.
- These are local dev credentials and nothing else. Do not reuse them and do not store anything from a shared or production environment this way.

Then pick how much you want stored, from least to most convenient:

**Type it yourself.** Keep the browser visible and, when Claude reaches the login page, ask it to wait while you type the password into the window. Nothing is stored anywhere and Claude never sees the value. This is the right choice if you only need the browser now and then.

**Named secrets in the config.** The CLI can substitute values for names when Claude fills a field. Add a `secrets` block to `~/.playwright/cli.config.json`, the home-level file from step 4, next to the `browser` and `network` blocks:

```json
{
    "secrets": {
        "FF_USERNAME": "claude-dev",
        "FF_PASSWORD": "the-local-dev-password"
    }
}
```

If you would rather scope them to one repository, the `secrets` block can go in that repository's `.playwright/cli.config.json` instead. Either way there is no separate secrets file for this option, the values live in the config itself.

**A separate dotenv file.** Same substitution, but the values live wherever you already keep secrets. Point the CLI at the file through an environment variable in the shell you start Claude Code from:

```
export PLAYWRIGHT_MCP_SECRETS_FILE=~/.config/flowfuse-dev/claude-secrets.env
```

with the file containing plain `FF_USERNAME=...` and `FF_PASSWORD=...` lines. Nothing about credentials is then in the Playwright config, and you can load the variable from a password manager or a tool like `direnv` so it only exists while that shell is open.

Whichever you choose, the first login can be saved with `playwright-cli state-save .playwright/auth.json` and restored later with `state-load .playwright/auth.json`. The path is relative to the repository you run the command from. That file holds the session cookie, so treat it like the password and keep it out of git. The cookie expires with the platform session, so an old file silently stops working and Claude lands on the login page again.

## 6. Smoke test

In Claude Code, from a FlowFuse repository folder, ask:

> Using the playwright-cli skill, open http://localhost:3000, log in as FF_USERNAME, take a snapshot of the page you land on and tell me which teams I belong to. Then list and close the browsers you opened.

You should see a browser window open, the login happen, and Claude report back from the snapshot. Finish by checking nothing is left behind:

```
playwright-cli list
```

If you want to confirm the localhost lock without Claude, ask it to open `https://example.com` instead. It should report `ERR_BLOCKED_BY_CLIENT`.

## 7. The FlowFuse house rule: always close your browsers

Every browser Claude opens stays running after the task unless something closes it, and a forgotten visible browser can keep a CPU core busy for hours. We add one section to the top of the installed skill so Claude treats closing as part of the job.

Open `~/.claude/skills/playwright-cli/SKILL.md` and paste this straight after the frontmatter, before the first heading:

```markdown
## Always close your browsers

Every browser you open keeps running after your task ends, and a forgotten headed browser can keep a CPU core busy for hours. Closing them is part of the task, not optional cleanup.

* Before you report a task as done (and before handing control back mid-task if you won't need the browser again soon), run `playwright-cli list` and then `playwright-cli close-all`.
* Sessions are tracked per working directory. Run `list` and `close-all` from the same directory you ran `open` from, or they won't see your browsers.
* If `close-all` leaves a browser behind, use `playwright-cli kill-all`.
* Never close browsers you didn't open (other sessions may be using them). If you spot leftovers from elsewhere, mention them to the user instead.
```

Also extend the `description` line in the frontmatter with `Always close every browser you opened when the task is done.` so the rule is visible before the skill is even loaded.

Re-installing the skill after a CLI update overwrites this file, so paste it back in afterwards.

## Going further: end-to-end checks and prototyping

Once the basics work, the same setup carries real end-to-end checks against Node-RED and the platform.

**Put the harness in the flow.** Write the flow as a `flows.json` file before starting Node-RED, and add probe endpoints built from `http in`, `function` and `http response` nodes next to the nodes under test. Injecting an event is then a `curl` against a probe, or Node-RED's `POST /inject/<nodeId>` for an inject node. Nothing is clicked together by hand, so the run is repeatable.

**Read the page, do not guess at it.** `playwright-cli --raw eval "<expression>"` returns page state as a bare value and can be polled from a shell loop. `console` shows markers and errors after the fact, `find "<text>"` checks a value rendered, and `requests --filter "<regexp>"` confirms a click fired the API call you expected. A ui-template node that sets a marker on `window` when it mounts gives Claude something concrete to wait for.

**Intercept and mock with routes.** `playwright-cli route "<url pattern>" --body '<json>' --content-type application/json` replaces a response before the page sees it, whether that is an API endpoint or a third party script. For anything the route command cannot express, `run-code "async page => { ... }"` runs arbitrary Playwright against the live page.

**Rapid prototyping and mocking.** The route command is also the quickest way to try a UI idea before the backend exists. Mock the endpoint the new component would call, let Claude build the component against the mocked shape, and iterate on the real page in the browser you are watching. The playwright-cli skill covers the mechanics. Pair it with a process skill that keeps the exploration honest, for example the brainstorming and test-driven development skills from superpowers, which we will cover in the next walkthrough, so a prototype that works against a mock does not quietly become the implementation without tests.

**Throwaway Node-RED when the platform is in the way.** For checking a node or plugin PR you often do not need a platform instance at all. Start a standalone Node-RED from a scratch user directory on a spare port, symlink the PR checkout into its `node_modules`, and point Claude at that port. Kill it by port owner afterwards; Node-RED renames its process, so `pkill -f` misses it.

## Housekeeping

- The CLI writes snapshots and logs to a `.playwright-cli/` folder in the directory you run it from, next to the `.playwright/` folder from step 2. Neither belongs in a PR. Add both to your global git excludes (`git config --global core.excludesFile`) or to `.git/info/exclude` in each repository.
- A leftover browser you did not open may belong to another Claude session. `playwright-cli list` shows them all, `close-all` closes every one from the current directory, `kill-all` is the hammer for stuck processes.

## Troubleshooting

- **`/skills` does not list playwright-cli**: check the folder from step 3 exists and restart Claude Code. The skill only loads on start.
- **Banner about the skill not matching the tool version**: re-run `playwright-cli install --skills --global`, then re-apply step 7.
- **`ERR_BLOCKED_BY_CLIENT` on your own platform**: the allowlist is missing the host or port you are using. `localhost` and `127.0.0.1` are different origins, which is why the example lists both.
- **Browser opens but nothing is visible**: the session is headless. Set `headless: false` in the config as in step 4, or pass `--headed` on `open`. On WSL check you have a display.
- **Claude typed the secret name literally**: the name was not found, so the CLI treated it as plain text. Check the spelling in `cli.config.json` or that `PLAYWRIGHT_MCP_SECRETS_FILE` is set in the shell Claude Code runs in.
