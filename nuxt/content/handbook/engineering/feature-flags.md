---
navTitle: Feature Flags
---

# Enabling Feature Flags in PostHog

We use [PostHog](https://posthog.com/) to manage feature flags, which let us roll changes out to teams without shipping a new release. Follow the steps below to turn a flag on.

## 1️⃣ Confirm the environment you're changing

Set your environment in the top-left corner before you touch anything — the same flag can behave differently across environments, so always double-check you're in the right one.

![Selecting the PostHog environment in the top-left corner](/handbook/engineering/images/confirm-env-posthog.png){data-zoomable width="390px"}

## 2️⃣ Find the flag you want

Browse the [Feature Flags](https://eu.posthog.com/project/2209/feature_flags?tab=overview) page and pick the flag you intend to enable.

## 3️⃣ Edit the flag

1. Click **Edit** in the top left.
2. Scroll down to **Release Conditions**.
3. Click **+ Add condition set**.
4. Set **Target by** to **Teams**.
5. Set **Rollout percentage** to **100%**.

![Configuring the release condition set to target teams at 100%](/handbook/engineering/images/rollout-percentage-posthog.png){data-zoomable width="701px"}

6. Click **Save**. Your condition set should now look like this:

![The saved condition set targeting 100% of teams](/handbook/engineering/images/condition-set-posthog.png){data-zoomable width="746px"}

## 4️⃣ Confirm the change

Head back to the [Feature Flags](https://eu.posthog.com/project/2209/feature_flags?tab=overview) page and verify the Release Condition reads **100% of all teams**.

![The Feature Flags overview showing the release condition at 100% of all teams](/handbook/engineering/images/confirm-change-posthog.png){data-zoomable}

Finally, **hard refresh** in the environment you just enabled to pull the latest flags, and you're good to go!
