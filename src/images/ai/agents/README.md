# Agent marks for the /ai connector tabs

Each tab in the "connect your own agent" section renders `client.logo` when it is set in
`src/ai.njk`, and falls back to the agent's name as text when it is not.

| File | Tab | Source |
| --- | --- | --- |
| `microsoft-copilot.svg` | Microsoft Copilot | `adoption.microsoft.com/wp-content/uploads/2023/09/icon-copilot.svg`, a Microsoft-owned domain. **Still needs a legal check**: Microsoft's trademark guidelines generally require permission to use its marks in a way that presents a product relationship, and this came from a marketing page rather than a brand kit with usage terms attached. |
| `chatgpt.svg` | ChatGPT | OpenAI brand kit, `OAI_OpenAI-Blossom_Black.svg`, downloaded by hand from `openai.com/brand` because that page blocks automated fetching. This is the OpenAI symbol, which is the icon form their kit provides. |
| `claude.svg` | Claude | Anthropic press kit, `anthropic.com/press-kit`, which redirects to an official CDN zip. File is "Claude Spark - Clay", the icon form intended to sit beside a label. Unmodified, in its own brand colour. |
| `gemini.svg` | Gemini | Google's own CDN, the Gemini sparkle used by Gemini's product surfaces. |
| _(none)_ | Local and Custom Agents | Not a brand mark by design. The repo icon `components/icons/server-stack.svg` is inlined instead of linked as a file, so it inherits `currentColor` and turns white when the tab is active. |

All marks are used unmodified, at their own aspect ratio, in a 16px-tall slot beside the
agent's name. None is altered in colour or proportion.

To add or replace one, drop the file here and set the path on that client:

```yaml
        - id: "claude"
          logo: "/images/ai/agents/claude.svg"
```

Leave `logo` unset until the file exists. Setting it early renders a broken image, whereas
leaving it unset renders the name as text, which is the intended fallback.
