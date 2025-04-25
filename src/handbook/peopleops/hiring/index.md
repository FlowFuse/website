---
navTitle: Hiring
---

# Hiring

When hiring a new role, the process is generally as follows:
* Write a job description and add it to the handbook to get it approved by any necessary people
* Add the role to [Greenhouse](/handbook/peopleops/hiring/#greenhouse)
* Create a private slack channel for key people on the interview loop called #hiring-role (e.g. #hiring-ae for hiring an account executive)

## Advertising a Role

When advertising for a role on Social Media, engagement is improved (and therefore,
we reach a higher audience) with custom social tiles.

We can add URLs to our site that provide a nice tile, whilst then redirecting to
the job advert on Greenhouse. This was introduced [here](https://github.com/FlowFuse/website/pull/728).

### Adding a new role to the website

1. Add the job as a redirect in `src/_data/site.json` under "openings"
1. Add a new `<job-short-title>.njk` file to the `/src/jobs` directory (use an existing job as a template)
1. Update the redirect URL in the `njk` file to match that added in Step 1.
1. Open an [Art Request](/handbook/design/art-requests/) to have a new Social Tile designed & attach it to the relevant page

#### Otta Integration

We have an automated integration setup with [Otta](https://hire.otta.com). When a job is posted to our Greenhouse account, it _should_ appear on Otta within 24 hours. If it does not, raise a support ticket with them, and it should be addressed an made public very soon after.

### Referrals

To participate in FlowFuse's employee referral program, kindly send all referral resumes to the People Ops Manager. If your recommended candidate gets hired and successfully completes 3 months, you will receive a $100 reward. Alternatively, you can choose a charitable foundation of your liking, and we will double the referral amount donated to that organization.

### Sharing an Existing Role

The URLs for the existing roles we have on the website are any files found in [here](https://github.com/FlowFuse/website/tree/main/src/jobs).
The URL will be structured accordingly: `/jobs/<job-short-title>`

## Interviews

Hiring plans are role specific and should be included in the job posting. 

### Screening Interview

All candidates will experience a [Screening Call](/handbook/peopleops/hiring/screening-call/) as the first stage in the interview.

### STAR interviews

All candidates will experience a [STAR Interview](/handbook/peopleops/hiring/star-questions/) at some point in the interview process.

## Extending an offer

When a candidate goes through the full hiring process an offer might be extended
to them. At such a time it's good to understand that the offer at that time is
conditional on background checks. If the offer includes an equity component,
this part is conditional on board approval of such a grant. Be sure to be
explicit about these conditions.

Please use [this template](https://docs.google.com/document/d/1rY0gLLpkOPBVGlMy7PVhnVjmRF53MhkeDET4TkfPJIs){rel="nofollow"} to stage an email.

## After an offer is accepted

Onboarding on our EOR provider, Deel, takes at least 1 to 3 weeks. The start
date for a new employee should be at least 7 working days out. When a
[conditional offer](#extending-an-offer) has been accepted you should immediately:

1. [Create an onboarding issue](https://github.com/FlowFuse/admin/issues/new/choose){rel="nofollow"} on the admin GitHub project
2. Create the contract in Deel, and purchase the [background check](/handbook/company/security/human-resources/#screening).
1. Invite the prospective employee to join Deel, assign them to their designated department, and deliver their offer letters through the Deel platform.
1. Add their stock options to the stock option request spreadsheets
   * Copy or create a new monthly request sheet from [this template](https://docs.google.com/spreadsheets/d/1AG75qONjObto3g2oJH_SC4gjgRsYJmKUI3fjrZuktm0/edit#gid=1970623412){rel="nofollow"}

### Background Screening

FlowFuse will utilize Deel to conduct background checks on individuals in the United States. These checks are essential for compliance purposes, particularly for employees located in the US.

### Tax Residency
During the onboarding process on our EOR provider platform, candidates must either be citizens of the country where they will be working or possess a valid visa. Any requests for changes in tax residency should be communicated to the HR department and CEO at least 2 months in advance. This includes changing States within the US.

## Onboarding

Just before your first day of work at FlowFuse, you will receive an email requesting your GitHub username
and preferred company email address. An issue will be created on our [internal issue tracker](https://github.com/FlowFuse/admin/issues/new/choose){rel="nofollow"} with steps for you and
the team to complete once you start.

On the day you start, a message will be sent to your personal email address to grant you access to your FlowFuse email address.
This process ensures that all new joiners receive access either on their first day or up to 24 hours before their official start date.

Upon setting up your password, it is essential to [turn on the 2-Step Verification](https://support.google.com/accounts/answer/185839?hl=en&co=GENIE.Platform%3DDesktop). Failure to do so may result in being locked out of your account after a few days, requiring assistance from an admin to regain access.

Once your FlowFuse email is set up, you will have access to invitations to other services and platforms, including 1Password. [Set this up](https://support.1password.com/explore/team-member/) as soon as possible to add a security layer to all your FlowFuse accounts.

On your first day, once your email and 1Password accounts are set up, it is important to prioritize
gaining access to Slack, the FlowFuse GitHub organization, and completing your onboarding issue.
Additionally, your manager will assign tasks for you to begin working on during your first week. Further details on Onboarding will be available in your Onboarding issue. 

## Greenhouse

### Opening a Job

When opening a job post, you'll need a couple of things:

1. A Job Description
2. Verifying the availability of the approved role.
3. Set up the role within Greenhouse. The CEO will provide support in case any custom alterations to the job post are required.

### Pipeline design

A pipeline needs to be designed, meaning; you'll need to define all stages of the hiring process.
For each stage of the hiring pipeline scoresheets **must** be filled out. Each scorecard
**must** include all values and job requirements.

#### Accepting applications

When you open the role on Greenhouse to accept applications, please [follow the advertisement instructions](/handbook/peopleops/hiring/#advertising-a-role).

Applicants for a job are required to submit their resume, and it is optional for them to include a cover letter.
Additionally, it is recommended to include one or two acceptance questions that are relevant to the specific position.
These questions should be thought-provoking, yet not overly time-consuming, and they should allow skilled candidates to provide a response within a minute or two. For example, for a developer position, a question could be: "What happens if someone types 'https://flowfuse.com' in their browser and presses enter?" The intention is to engage candidates and assess their problem-solving skills.

#### Initial Review

The initial review will check the aforementioned question for validity, the resume, and the cover letter.
Check for:
1. Alignment to [Values](../../company/values.md)
1. Capabilities align with the requirements for the role
1. Previous retention at companies
   - We'd like people to join the company for the long term, if their previous roles suggest the candidate will not join for the long term please reject them

For each candidate we'd like to move forward with, a scorecard needs to be filled
out based on the available information so the interviewer for the next stage can
prepare and focus if the strengths are indeed strong, and the same for weaknesses or uncertainties.

The resume review should reject **over 50%** of all candidates.

#### Skills assessment

For each role a skills assessment will be performed. This stage will be different for most roles. This is the main stage to asses the capabilities.

This round will again result in a scorecard, but also an indication what level this candidate would suit in.
For example `intermediate` vs `senior` for developers.

When in doubt, reject the candidate.

#### Offer stage

First, read about [extending offers](#extending-an-offer).

At the offer stage all scorecards will be re-evaluated to understand what the candidate strengths and challenges are.
Before the peopleops team extends an offer, explicit approval is required from:
1. A peopleops manager
   - Check we hire in their location
   - Notice period aligns with internal processes
   - Total compensation is in FlowFuse's range
1. The new manager of the candidate
1. CEO

When a candidate accepts an offer, proceed to [onboard them](#after-an-offer-is-accepted).

### Closing a job

As soon as there's a pipeline that would support at least three strong candidates
for the open position, take the job posting offline. Candidates applying for a job
that's no longer available is a waste of their time, a bad experience with
FlowFuse, and hurts our reputation.

## Offboarding

The purpose of the offboarding section in the handbook is to provide a clear and structured framework for employees at FlowFuse to follow during the offboarding process. The offboarding process is managed by the People Ops Manager in close collaboration with the CEO, Reporting Managers, and Deel for Payroll at FlowFuse.

When a team member or contractor decides to leave FlowFuse, they will receive a detailed email before their final date of employment. The email will include information regarding the impact on benefits coverage, stocks, final pay, and the process for returning any company assets.

### Voluntary Resignation

If a team member decides to leave FlowFuse, they're expected to continue working to facilitate a smooth handover and enable us to find a suitable replacement. Please note that we generally expect the team member to work for the entire notice period.

If you are considering resigning from your position at FlowFuse, we highly recommend discussing your reasons with your manager or the People Ops manager. We are always open to improving and making changes that benefit our team members. While we understand that sometimes leaving is the best option, we encourage you to explore all possible solutions before making a final decision.

Once you have discussed your concerns with your manager and the People Ops team and determined that resigning from FlowFuse is the only option, please notify both your manager and the People Ops team of your intention to resign via email. Afterward, we will commence a discussion to establish the steps required to ensure a seamless handover.

### Involuntary Resignation

When a team member is being let go, it is usually due to either performance issues or a change in the company's needs that no longer justifies their role. If the decision is due to performance issues, we will have already provided feedback and given the team member an opportunity to improve. Unfortunately, if the issues cannot be resolved, termination of employment may be necessary. In most cases, we will ask the team member to stop working immediately. The final payment will be made according to the terms of their employment contract.

### Communicating Departures

When a team member voluntarily departs, we may ask if they would like to share their plans with the team. If the departure is involuntary, reasons of the departure will be at the sole discretion of the FlowFuse management.

## Offboarding process

We will send an email to the departing employee covering the following points:

1. Final payment
1. Return of company property
1. Reimbursement of business expenses

At FlowFuse, we conduct Exit Interviews for employees who choose to leave the company voluntarily. This provides us with valuable feedback on their experience, reasons for leaving, and areas for improvement. Their manager schedules these interviews during the employee's last week to ensure they have an opportunity to share their insights. Our aim is to use this feedback to enhance our workplace culture and practices. Please follow the [predefined questions](https://docs.google.com/document/d/1az9PddrvVk1TH1TPXJGXmavxBpo9OpcWbylN4gQBoe8/edit){rel="nofollow"} to guide the conversation.

### Offboarding Issue

The People Ops manager will create a new off boarding issue for each instance of a team member leaving. The template maintained on GitHub, create a new issue though [this link](https://github.com/FlowFuse/admin/issues/new/choose).

### Final Pay

Final pay consists of the statutory minimal payment dictated by our payroll provider Deel, and an optional extra severance package. Such a package might be dependent on on business requirements, standing of the employee, among other factors.

### Business expense

We will reimburse any outstanding expenses that comply with our handbook's reimbursement section.

## Contractors

All new contractors are to be employed through Deel to standardize contracts and aid with providing a consistent experience for all contractors. Either milestone based payments
or being paid for month is supported.
