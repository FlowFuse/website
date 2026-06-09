---
navTitle: Feature Flags
---

# Feature Flags in PostHog

We use [PostHog](https://posthog.com/) to manage feature flags, which let us roll features out to teams without shipping a new release. This page covers how to **create** a new flag, how to **enable** an existing one, and how to **use** flags in code. The create and enable flows both control which teams a flag applies to using [release conditions](#release-conditions).

## Creating a feature flag

Create the flag once, then make sure it exists in every project before you enable it.

### 1️⃣ Start a new flag

Open the [Feature Flags](https://eu.posthog.com/project/2209/feature_flags?tab=overview) page and click **+ New**.

### 2️⃣ Add a unique key

Give the flag a unique key in **ALL_CAPS** to match our naming conventions — for example, `EXPERT_COMMS_BETA_ENABLED`. This key is what the application checks against, so make sure it doesn't clash with an existing flag.

### 3️⃣ Add a description

Add a description explaining what the flag is for and what it gates. This makes it easy for anyone browsing the flag list to tell at a glance what the flag does.

### 4️⃣ Set the release conditions

Choose who the flag applies to by adding a *release condition set* — see [Release conditions](#release-conditions).

### 5️⃣ Create the flag

Click **Save** to create the flag.

### 6️⃣ Copy the flag to all projects

PostHog organizes flags, events, and other data into separate **projects**, and FlowFuse has more than one. A flag is created in a single project, so you need to copy it across the rest. Open the **Projects** tab on the flag and copy it to every other project so it's available everywhere.

![Copying a feature flag to another project from the Projects tab](/handbook/engineering/images/feature-flag-copy.png){data-zoomable}

> **Note:** If your release conditions target a **specific team**, the `teamId` differs per project. After copying the flag, open it in each project and update the `teamId` so you target the right team everywhere.

## Release conditions

A *release condition set* controls who a flag is enabled for. Both creating and enabling a flag use the same options — configure the set for either **all teams** or a **specific team**.

### All teams

Use this when you want everyone on the platform to get the feature.

1. Set **Target by** to **Teams**.
2. Set **Rollout percentage** to **100%**.

![Configuring the release condition set to target teams at 100%](/handbook/engineering/images/rollout-percentage-posthog.png){data-zoomable width="701px"}

A finished all-teams condition set looks like this:

![The saved condition set targeting 100% of teams](/handbook/engineering/images/condition-set-posthog.png){data-zoomable width="746px"}

### A specific team

Use this when you want to roll the feature out to a single team — for example, to test it with one customer before going wider.

1. Set **Target by** to **team-id** as the property to match.
2. Enter the **teamId** of the team you want to target as the match value.
3. Set **Rollout percentage** to **100%**.

![Targeting a specific team by matching its team-id](/handbook/engineering/images/team-id-posthog.png){data-zoomable width="701px"}

## Enabling a feature flag

Once the flag exists in every project, follow these steps to turn it on.

### 1️⃣ Confirm the environment you're changing

Set your environment in the top-left corner before you touch anything — the same flag can behave differently across environments, so always double-check you're in the right one.

![Selecting the PostHog environment in the top-left corner](/handbook/engineering/images/confirm-env-posthog.png){data-zoomable width="390px"}

### 2️⃣ Find the flag you want

Browse the [Feature Flags](https://eu.posthog.com/project/2209/feature_flags?tab=overview) page and pick the flag you intend to enable.

### 3️⃣ Edit the release conditions

1. Click **Edit** in the top left.
2. Scroll down to **Release Conditions**.
3. Click **+ Add condition set** and configure it — see [Release conditions](#release-conditions).
4. Click **Save**.

### 4️⃣ Confirm the change

Head back to the [Feature Flags](https://eu.posthog.com/project/2209/feature_flags?tab=overview) page and verify the Release Condition. For an all-teams rollout it reads **100% of all teams**; for a specific team it shows the **team-id** you matched on or **Multiple Groups**.

![The Feature Flags overview showing the release condition at 100% of all teams](/handbook/engineering/images/confirm-change-posthog.png){data-zoomable}

Finally, **hard refresh** in the environment you just enabled to pull the latest flags, and you're good to go!

## Using feature flags in code

The FlowFuse frontend wires PostHog flags through the `account-settings` store (`frontend/src/stores/account-settings.js`).

**Where to add the flag** — register its key in the `POSTHOG_FLAGS` constant, then expose a boolean check in the `featuresCheck` getter:

```js
export const POSTHOG_FLAGS = {
    EXPERT_COMMS_BETA_ENABLED: 'EXPERT_COMMS_BETA_ENABLED'
}

// in featuresCheck:
checks.isExpertCommsBetaEnabled = !!state.posthogFlags[POSTHOG_FLAGS.EXPERT_COMMS_BETA_ENABLED]
```

**How to use it** — read the check from the resolved `featuresCheck` object wherever you need it. In a component template:

```html
<template v-if="featuresCheck?.isExpertCommsBetaEnabled"> … </template>
```

Or in script/logic — gate a method, computed property, route guard, etc:

```js
if (featuresCheck?.isExpertCommsBetaEnabled) {
    // run the gated behaviour
}
```
