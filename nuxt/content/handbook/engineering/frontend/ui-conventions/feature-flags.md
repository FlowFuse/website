---
title: "Feature Flags"
---

# Feature Flags

Every gated capability in the platform UI resolves through one place: the
`FEATURE_CONFIGS` array in `frontend/src/composables/FeatureChecks.ts`. You
declare a flag there once, and `buildFeatureChecks()` turns that declaration
into the booleans components read off the `featuresCheck` getter of the
`account-settings` store.

Declare the flag in `FEATURE_CONFIGS` rather than reading platform settings or
team properties directly in a component. Everything below (combining the
platform and team answers, defaults, dependencies, PostHog) is handled for you
once the entry exists.

This page covers defining a flag in code. For creating the PostHog flag itself
and rolling it out to teams, see
[Feature Flags in PostHog](/handbook/engineering/feature-flags/).

## The three checks

A flag answers two separate questions, so each entry produces up to three
booleans, all named from its `output`:

| Check | Question it answers |
|---|---|
| `{output}ForPlatform` | Is the feature available on this installation at all? Driven by license and configuration. Only produced when `platformKey` is set. |
| `{output}ForTeam` | Is the feature included in the current team's team type? Only produced when `teamKey` is set. |
| `{output}` | The combined answer. |

Name the `output` `is{Feature}FeatureEnabled`.

## Defining a flag

Add one entry to `FEATURE_CONFIGS`:

```ts
{ output: 'isTablesFeatureEnabled', platformKey: 'tables', teamKey: 'tables' }
```

The available fields:

| Field | Purpose |
|---|---|
| `output` | Required. Name of the resulting check. |
| `platformKey` | Key to look up in the platform features object. |
| `teamKey` | Key to look up in the team type's `properties.features`. |
| `optOut` | Flips the team check's default from off to on. See [Opt-in and opt-out](#opt-in-and-opt-out). |
| `platformSource` | Set to `'settingsRoot'` to read a top-level settings key instead of a platform feature. |
| `platformDefault` | Value to use for a platform-only check when the key is absent. |
| `dependsOn` | The `output` of another entry that must be enabled. |
| `dependsOnPlatform` | A platform key that must be enabled. |
| `dependsOnTeam` | A team key that must be enabled. |
| `dependsOnTeamOptOut` | Applies `optOut` semantics to the `dependsOnTeam` check. |
| `posthogKey` | Hands the decision to a PostHog flag. See [PostHog flags](#posthog-flags). |

At least one of `platformKey` or `teamKey` is required.

## Where the keys come from

`platformKey` and `teamKey` are two independent registries that both live in the
backend. The names do not have to match, and sometimes they don't:
`isHTTPBearerTokensFeatureEnabled` uses the platform key `httpBearerTokens` and
the team key `teamHttpSecurity`.

### Platform keys

Register the key on the backend with `app.config.features.register(name, value, isPublic)`.
Most platform features are registered in `forge/ee/lib/index.js` behind the
relevant license check:

```js
app.config.features.register('tables', true, true)
```

The registry itself is `forge/config/features.js`, and `GET /api/v1/settings`
returns the result as the `features` object that the frontend reads.

### Team keys

Team keys are properties of a team type. To add one, put the key in
`featureList` and a human-readable label in `featureNames`, both in
`forge/lib/features.js`:

```js
const featureList = [
    // ...
    'tables'
]

const featureNames = {
    // ...
    tables: 'Tables'
}
```

That file is imported directly by the admin Team Type edit dialog
(`frontend/src/pages/admin/TeamTypes/dialogs/TeamTypeEditDialog.vue`), which
renders one checkbox per entry. A team key that isn't in `featureList` won't
appear there, so an admin will have no way to toggle it.

## How the checks combine

The base rule follows from which keys you set:

- `platformKey` and `teamKey` both set: platform **AND** team
- `platformKey` only: the platform answer
- `teamKey` only: the team answer

### Opt-in and opt-out

The team check defaults to off. The team type has to explicitly enable the
feature, or be marked `enableAllFeatures: true`:

```ts
{ output: 'isTablesFeatureEnabled', platformKey: 'tables', teamKey: 'tables' }
```

Setting `optOut: true` reverses that default. The feature counts as enabled
unless the team type explicitly sets it to `false`, so a team type that has
never heard of the key still gets the feature:

```ts
{ output: 'isSharedLibraryFeatureEnabled', platformKey: 'shared-library', teamKey: 'shared-library', optOut: true }
```

Use `optOut` for capabilities every team should have unless deliberately taken
away. Leave it off for anything sold as part of a specific tier.

### Platform defaults

For a platform-only check, `platformDefault` covers the case where the key is
missing altogether, which is the mirror image of `optOut`:

```ts
{ output: 'isRemoteInstanceFeatureEnabled', platformKey: 'remoteInstances', platformDefault: true }
```

### Reading from the settings root

A few flags are plain settings values rather than registered features. Point
`platformSource` at `'settingsRoot'` to read them from the top level of the
settings response:

```ts
{ output: 'isTelemetryEnabled', platformKey: 'telemetry:enabled', platformSource: 'settingsRoot' }
```

### Dependencies

When a feature only makes sense alongside another, gate it with a `dependsOn*`
field. Any failing dependency forces the combined check to `false`.

```ts
{
    output: 'isExpertAssistantFeatureEnabled',
    platformKey: 'expertAssistant',
    teamKey: 'expertAssistant',
    optOut: true,
    dependsOnPlatform: 'ai',
    dependsOnTeam: 'ai',
    dependsOnTeamOptOut: true
}
```

`dependsOnPlatform` and `dependsOnTeam` take raw keys, so the feature they point
at needs no entry of its own. `dependsOn` takes another entry's `output`, and
that entry **must appear earlier in the array** so it has already been computed.

## PostHog flags

Adding a `posthogKey` ties the check to a PostHog feature flag:

```ts
{
    output: 'isMcpThirdPartyFeatureEnabled',
    platformKey: 'mcpThirdParty',
    teamKey: 'mcpThirdParty',
    optOut: true,
    posthogKey: 'MCP_THIRD_PARTY'
}
```

Once PostHog is loaded, its flag decides the check. It replaces the platform and
team answer rather than adding a condition on top of it, so reach for
`posthogKey` when you want PostHog to own the rollout, which is the usual case
for a beta you're enabling team by team. When a flag has a `posthogKey`, gate
your UI on the combined `{output}` so the PostHog decision is respected.

Flag keys are `ALL_CAPS`. Create the flag and copy it to every PostHog project
before you rely on it, as described in
[Feature Flags in PostHog](/handbook/engineering/feature-flags/).

## Reading a check in the UI

Map the getter in and read the check off it. In a component:

```js
import { mapState } from 'pinia'

import { useAccountSettingsStore } from '@/stores/account-settings.js'

export default {
    computed: {
        ...mapState(useAccountSettingsStore, ['featuresCheck'])
    }
}
```

```html
<template v-if="featuresCheck.isTablesFeatureEnabled">
    ...
</template>
```

Outside a component, such as in a route guard or another store, read the getter
off the store directly:

```js
const features = useAccountSettingsStore().featuresCheck

if (features.isTablesFeatureEnabled) {
    // ...
}
```

### Telling the user why something is unavailable

Don't just hide a gated feature. Use the split checks to show the right banner,
so the user knows what to do about it:

```html
<template v-if="!featuresCheck.isTablesFeatureEnabled">
    <FeatureUnavailable v-if="!featuresCheck.isTablesFeatureEnabledForPlatform" />
    <FeatureUnavailableToTeam v-else-if="!featuresCheck.isTablesFeatureEnabledForTeam" />
</template>
```

`FeatureUnavailable` (`components/banners/FeatureUnavailable.vue`) points at the
upgrade documentation. `FeatureUnavailableToTeam`
(`components/banners/FeatureUnavailableToTeam.vue`) links to the team's
change-type page. Both accept a custom message.

## Testing a flag

Add a case to `test/unit/frontend/composables/FeatureChecks.spec.js`. It calls
`buildFeatureChecks()` directly with a plain state and team object, so there's
no store to set up:

```js
const checks = buildFeatureChecks(
    { features: { tables: true }, settings: { features: {} }, posthogFlags: {} },
    { type: { properties: { features: { tables: true }, enableAllFeatures: false } } }
)

expect(checks.isTablesFeatureEnabled).toBe(true)
expect(checks.isTablesFeatureEnabledForPlatform).toBe(true)
expect(checks.isTablesFeatureEnabledForTeam).toBe(true)
```

Cover the interesting combination for your flag: both sides on, each side off,
and any default or dependency you declared.

## Adding a flag, end to end

1. Register the `platformKey` in `forge/`, if the feature is license or config gated.
2. Add the `teamKey` to `featureList` and `featureNames` in `forge/lib/features.js`, if it varies by team type.
3. Add the `FEATURE_CONFIGS` entry in `FeatureChecks.ts`.
4. If PostHog owns the rollout, create the flag, copy it to every project, and add `posthogKey`.
5. Gate the UI on the combined check, and add the unavailable banners.
6. Add a case to `FeatureChecks.spec.js`.
