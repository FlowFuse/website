# Agent marks for the /ai connector tabs

Each tab in the "connect your own agent" section renders `client.logo` when it is set in
`nuxt/components/content/AgentSetupTabs.vue`, and falls back to the agent's name as text when it is
not. That component is the single source for every surface that shows the tabs: the `/ai` page, the
changelog entry, the blog post and the third-party-agents docs page.

| File | Tab | Source |
| --- | --- | --- |
| `microsoft-copilot.svg` | Microsoft Copilot | `adoption.microsoft.com/wp-content/uploads/2023/09/icon-copilot.svg`, a Microsoft-owned domain. **Still needs a legal check**: Microsoft's trademark guidelines generally require permission to use its marks in a way that presents a product relationship, and this came from a marketing page rather than a brand kit with usage terms attached. |
| `chatgpt.svg` | ChatGPT | OpenAI brand kit, `OAI_OpenAI-Blossom_Black.svg`, downloaded by hand from `openai.com/brand` because that page blocks automated fetching. This is the OpenAI symbol, which is the icon form their kit provides. |
| `claude.svg` | Claude | Anthropic press kit, `anthropic.com/press-kit`, which redirects to an official CDN zip. File is "Claude Spark - Clay", the icon form intended to sit beside a label. Unmodified, in its own brand colour. |
| `gemini.svg` | Gemini | Google's own CDN, the Gemini sparkle used by Gemini's product surfaces. |
| `claude.svg` | Claude Code | The same Anthropic mark as the Claude tab. Same vendor, so one file serves both and there is no second provenance to track. |
| `chatgpt.svg` | Codex | The same OpenAI mark as the ChatGPT tab, for the same reason. |
| _(none)_ | Local and Custom Agents | Not a brand mark by design. The repo icon `components/icons/server-stack.svg` is inlined instead of linked as a file, so it inherits `currentColor` and turns white when the tab is active. |

All marks sit in a 16px-tall slot beside the agent's name, at their own aspect ratio. None is
altered in colour or proportion.

One has had its canvas cropped. `chatgpt.svg` came out of the brand kit with the symbol inset in
the middle 50% of a 716x716 canvas, which is clear space meant for standalone use. Inline beside a
label that padding reads as a shrunken logo: the artwork filled half the slot while every other
mark filled 84% to 100% of it. Its `viewBox` is now `179 179 357 357`, a square crop to the ink.
The artwork itself is untouched, in its own colour and proportion; only the empty margin is gone.

Check this before adding a mark, because nothing in the CSS reveals it. Render the file and
measure the ink against the canvas:

    rsvg-convert -w 200 -h 200 -b none <file>.svg -o /tmp/m.png
    magick /tmp/m.png -alpha extract -threshold 5% -format "%@\n" info:

A result much smaller than 200x200 means the file carries clear space that has to be cropped.

To add or replace one, drop the file here and set the path on that client:

```js
    {
        id: 'claude',
        logo: '/images/ai/agents/claude.svg',
```

Leave `logo` unset until the file exists. Setting it early renders a broken image, whereas
leaving it unset renders the name as text, which is the intended fallback.
