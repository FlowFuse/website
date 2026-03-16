---
navTitle: Changelog Posts
---

# Writing Changelog Posts

The [FlowFuse Changelog](/changelog/) is where users go to see what has shipped. It is a place to communicate product updates clearly and directly to FlowFuse users.

A changelog post is not a PR description or a release note. It is a short, focused announcement written for a FlowFuse user, someone who is busy and wants to quickly understand what changed and whether it affects them.

## When to write one

Write a changelog post when you ship something a user would notice or benefit from. This includes new features, meaningful improvements to existing functionality, behaviour changes users need to be aware of, and breaking changes that require user action.

Do not write changelog posts for internal tooling changes with no user-visible impact, routine dependency bumps, minor bug fixes the average user would never encounter, or changes behind a feature flag that are not yet generally available.

If you are unsure, ask: *would a user who opens FlowFuse tomorrow notice or benefit from this?* If not, skip it.


## Creating the file

Posts live in the [website repository](https://github.com/FlowFuse/website/tree/main/src/changelog). Navigate to the correct year and month folder for when the feature shipped, and create a new `.md` file. If the folder for that month does not exist yet, create it.

```
src/changelog/YYYY/MM/your-post-slug.md
```

The slug should be short, lowercase, and hyphen-separated, describing the feature being announced.


## Frontmatter

Every post requires the following fields at the top of the file:

| Field | Notes |
|---|---|
| `title` | The name of the feature or change. Title case. Keep it short. |
| `description` | One sentence summarising the change. This appears in link previews and search results, so it should make sense without any surrounding context. |
| `date` | The date the feature shipped, in `YYYY-MM-DD` format. |
| `authors` | Your handle from `src/_data/team`. Leave it out if there is no single clear author. |
| `tags` | Always include `changelog`. |
| `issues` | A list of related GitHub issue URLs. Link any issues that tracked the work being announced. |


## Writing the post

There is no fixed template - the right length and shape depends on the change. A small improvement might be two sentences and a screenshot. A complex feature might need steps, multiple screenshots, and an availability note. Use your judgement.

That said, every post should answer three questions:

**What changed?** State it plainly in the opening. Do not make the user read three paragraphs before they find out what the post is about.

**Why does it matter?** Explain the benefit or the problem it solves. This is the difference between a changelog post and a bare release note. Without it, users have no reason to care.

**What do they need to do?** If the feature requires setup or user action, explain how to get started. If it just works, you do not need this.

### Screenshots

Include a screenshot for any visual change. Reference images from `src/img/` like this:

```markdown
![Alt text](./images/image.png)
*Caption describing what is shown*
```

Always add a caption in italics directly below the image. The caption should describe what is shown in context, not just repeat the alt text.

### Availability

If a feature is only available on certain plans or from a specific version, say so. Put this at the end of the post, or immediately after the main announcement if it affects whether the user can access it at all.

### Breaking changes

If a change could break an existing user setup or requires action before upgrading, say so in the first paragraph. Do not bury it.


## Writing style

Write for the user, not the engineer. Every changelog entry can tell two stories - what changed in the code, and what improved for the user. Always tell the second one.

| Instead of this | Write this |
|---|---|
| Updated authentication API response handling | Logging in is noticeably faster |
| Refactored snapshot restore logic for dev mode instances | You can now restore snapshots without leaving developer mode |
| Restart sequencing updated for HA instances | HA instances now restart one at a time, so there is no downtime during updates |

Be specific. Vague entries are useless. Compare:

**Weak:** Minor improvements to the Expert

**Strong:** The Expert now has Palette Awareness - ask it about your installed nodes, available updates, or which packages are disabled, without leaving the chat interface.

Keep it short. A changelog post is not a blog post. If the feature needs more depth, link to documentation rather than expanding the post.

Avoid jargon unless it is standard FlowFuse or Node-RED vocabulary. If a technical term is unavoidable, give enough context that a non-expert can follow.

Do not paste PR titles or commit messages. They are written for engineers. Rewrite them from the user's perspective.


## Examples

### A small but useful improvement

> As of today, you can now duplicate a hosted instance into a different application within your team.
>
> It is a small (but important) improvement that just makes things that little bit easier.

*Source: [Duplicate Instances Across Different Applications](https://flowfuse.com/changelog/2025/10/duplicate-instances-across-applications/)*

Short, honest about the size of the change, and gets straight to the point.


### Showing what is now possible

> You can now ask the Expert about your installed nodes, versions, and available updates without leaving the chat interface. For example:
>
> - Do I have any nodes installed that can send emails?
> - Are my palette nodes up to date?
> - Are any nodes on my palette disabled?
> - Can you suggest a node package that would replace this complex function code?

*Source: [FlowFuse Expert: Palette Queries](https://flowfuse.com/changelog/2026/01/ff-expert-palette-queries/)*

Instead of describing the feature abstractly, this shows exactly how a user will interact with it. Use this approach whenever a feature is best explained through concrete examples of what the user can now say or do.


### Translating a technical change into a user benefit

> Any action that triggers a restart of the Node-RED instance will now restart them in sequence rather than in parallel. This means there should be no downtime for this instance.
>
> This feature is available to Enterprise Licensed Self Hosted users and Enterprise tier users of FlowFuse Cloud.

*Source: [HA Hosted Instance Rolling Restart](https://flowfuse.com/changelog/2026/02/ha-instance-rolling-restart/)*

The technical detail is there, but the sentence that follows immediately translates it into what the user actually cares about. Always pair the *what* with the *so what*.


### A breaking change

> **FlowFuse v2.24.0 requires Node.js v20 or higher.** If you are running an older version, you will need to upgrade Node.js before updating FlowFuse.
>
> Node.js v18 reached end of life in April 2025 and no longer receives security updates. This change ensures FlowFuse continues to run on a supported and secure runtime.
>
> To check your current version, run `node --version`.

*Source: [Node.js v20 Minimum Version Requirement](https://flowfuse.com/changelog/2025/11/minimum-nodejs-version/)*

State what is changing and who it affects in the first sentence. Then explain why. Then tell the user exactly what to do. A user who needs to act should have everything they need without leaving the page.


## Raising a PR

Follow the standard [Git workflow](/handbook/company/guides/git/) to raise a PR against the website repository. Changelog posts should be reviewed by at least one other team member before merging.
