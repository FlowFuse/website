---
navTitle: Hiring
---

# Hiring

When hiring a new role, the process is generally as follows:
* Write a job description and add it to the handbook to get it approved by any necessary people
* The hiring manager is expected to source 20 profiles that we can do outreach to that fit the profile of the candidates we would want to hire
* Add the role to [Greenhouse](/handbook/peopleops/hiring/#greenhouse)
* Create a private slack channel for key people on the interview loop called #hiring-role (e.g. #hiring-ae for hiring an account executive)

For information about working with external recruiters, see [Working with Recruiters](/handbook/peopleops/hiring/recruiters/).

## Greenhouse

### Opening a Job

When opening a job post, you'll need a couple of things:

1. The Job Description that is already merged into the handbook [with all of the requisite parts](/handbook/peopleops/job-descriptions/)
2. Access to the handbook
3. Access to Greenhouse (our ATS)

The process in Greenhouse is as-follows:
* On the main screen, in the top nav, select "Add", then "Create a Job".
* Then, "Copy an Existing Job"
* Then select, "FlowFuse Sample Job"
* Add the internal and external job names, and then move to the next screen (Create job and continue on bottom right)
* Add the key people for the role- hiring managers especially
* Skip sending the email to the hiring manager for the job kickoff as that process is already done in the process of completing the full job description
* Pull the Skills & Qualifications for the Candidate Scorecard from the Job Description
* There is a default interview plan of three calls: Screening call, Hiring Manager Interview, and STAR Interview. If you need to add more, you can do so in the upper right with the "Add Stage" button. Note: DO NOT name multiple stages the same thing. It will break other functionality in the app. Don't do it.
* On the job post, make sure to change the location type of the role to Remote. Enter the post description (from the handbook) and any additional custom application questions. The handbook question does a really good job of screening out AI applications. If you're obligated to select a location, we usually use "Remote, Oregon, US"
* Select the default notifications and "Finish" the role.

Now that you've created the job, you must actually post the role. 
* From the job page, on the left sidebar, select "Job Setup".
* Go to the "Job Posts" box, and hit "Edit"
* Turn on the toggle to see the role on the careers page.

#### Accepting applications

When you open the role on Greenhouse to accept applications, please [follow the advertisement instructions](/handbook/peopleops/hiring/#advertising-a-role).

Applicants for a job are required to submit their resume, and it is optional for them to include a cover letter.
Additionally, it is recommended to include one or two acceptance questions that are relevant to the specific position.
These questions should be thought-provoking, yet not overly time-consuming, and they should allow skilled candidates to provide a response within a minute or two. For example, for a developer position, a question could be: "What happens if someone types 'https://flowfuse.com' in their browser and presses enter?" The intention is to engage candidates and assess their problem-solving skills.

#### Rejecting Candidates

We will interview candidates at every stage of the interviewing process. When we reject candidates, there are three kinds of rejections: 
* pre-interview
* post-screen
* after candidates have done multiple interviews

Pre-interview, we use the template in Greenhouse to reject candidates. We want candidates to know that we are not moving forward with them. 
Note: Some candidates who apply through LinkedIn do not attach valid emails to their application, in which case we reject without emailing, but otherwise we always try to let them know. 

Post-screen, we use a different template in Greenhouse to reject candidates. This template recognizes that candidates have spent time with us. 

After candidates have done multiple interviews, we may want to write a more personal email letting them move on. This is up to hiring manager's discretion. In this case, we should make sure to reject via Greenhouse but not send emails. 

##### Candidate Feedback

At times candidates may request feedback on why we are not moving forward with their candidacy. By default, we do not provide feedback, but in some circumstances a hiring manager may be open to discussing further with the candidate.

### Closing a job

As soon as there's a pipeline that would support at least three strong candidates
for the open position, take the job posting offline. Candidates applying for a job
that's no longer available is a waste of their time, a bad experience with
FlowFuse, and hurts our reputation.

## Internal Communication of the job

Once a new headcount request has been approved, it must be announced in the company’s Slack channel [#announcements](https://flowforgeworkspace.slack.com/archives/C06EQCXUGA3) so that the entire team is aware of the open position and our current hiring needs. This ensures transparency and encourages involvement in the hiring process.
Team members are invited to share the job posting within their personal networks if they know someone who matches the role’s requirements and embodies the FlowFuse culture. Referrals are highly encouraged and, if the recommended candidate is hired and successfully completes three months in the role, the referring employee [will earn a bonus](/handbook/peopleops/hiring/#referrals). 

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

#### Welcome to the Jungle Integration

We have an automated integration setup with [Welcome to the Jungle](https://hire.welcometothejungle.com). When a job is posted to our Greenhouse account, it _should_ appear on Welcome to the Jungle within 24 hours. We have to pay to actually post the role. We will only consider paying to post Individual Contributor Eng roles.

### Referrals

To participate in FlowFuse's employee referral program, kindly send all referral
resumes to the People Ops Manager. If your recommended candidate gets hired and
successfully completes 3 months, you will receive a $1000 reward. Alternatively,
you can choose a charitable foundation of your liking, and we will double the
referral amount donated to that organization.

### Sharing an Existing Role

The URLs for the existing roles we have on the website are any files found in [here](https://github.com/FlowFuse/website/tree/main/src/jobs).
The URL will be structured accordingly: `/jobs/<job-short-title>`

## Interviews

Hiring plans are role specific and should be included in the job posting. 

### Screening Interview

All candidates will experience a [Screening Call](/handbook/peopleops/hiring/screening-call/) as the first stage in the interview.

### STAR interviews

All candidates will experience a [STAR Interview](/handbook/peopleops/hiring/star-questions/) at some point in the interview process.

#### Skills assessment

For each role a skills assessment will be performed. This stage will be different for most roles. This is the main stage to asses the capabilities.

This round will again result in a scorecard, but also an indication what level this candidate would suit in.
For example `intermediate` vs `senior` for developers.

When in doubt, reject the candidate.

#### Offer stage

Read about [extending offers](#extending-an-offer).

## Extending an offer

Before extending any offer, note that any offer when the total compensation package
exceeds $250000 per annum requires the board to be informed, and approval from the
majority to be obtained.

When a candidate goes through the full hiring process an offer might be extended
to them. At such a time it's good to understand that the offer at that time is
conditional on [background checks](/handbook/peopleops/hiring/#background-screening).
The offer might include an [equity component](/handbook/peopleops/compensation/#equity).
This part is conditional on board approval of such a grant. Be sure to be
explicit about these conditions.

At the offer stage all scorecards will be re-evaluated to understand what the
candidate strengths and challenges are. Before the hiring manager extends an offer,
explicit approval is required from the CEO to:
- Check we hire in their location
- Confirm candidate is seeking full-time employment (FlowFuse only offers full-time positions)
- Notice period aligns with internal processes
- Total compensation is in FlowFuse's range
- The new manager of the candidate agrees with extending this offer to the candidate

Please use [this template](https://docs.google.com/document/d/1rY0gLLpkOPBVGlMy7PVhnVjmRF53MhkeDET4TkfPJIs){rel="nofollow"} to stage an email.
Equity in the company is offered to some roles, the CEO has access to [the calculator](https://docs.google.com/spreadsheets/d/1iFf7D-_6lzyYiC0_e3BKxzn3TGjyHMIiG3bZ-jChgoE/){rel="nofollow"}
determining how many options to offer.

## After an offer is accepted

Onboarding on our EOR provider, Deel, takes up to 3 weeks. For contractors or US
employees the start date can be within 48 hours. Otherwise, do not offer anything
within 2 weeks. When a [conditional offer](#extending-an-offer) has been accepted
you should immediately:

1. Create the contract in Deel, and purchase the [background check](/handbook/company/security/human-resources/#screening).
   * Create or add the their job title to Deel.
   * Copy the "Job Description" from the handbook as "Scope of work" on Deel (and save it as a template for this role).
   * Important note: If the EOR with Deel is a new one, we need to ask Deel to initiate the IP Transfer process. The existing EORs include: India, Germany, Canada, UK, and Spain. We also have it in place in the US, but as of October 1, 2025 US team members are employed via a PEO.
   * Add Equity to the offer according to [the Equity guidelines](/handbook/peopleops/compensation/#equity)
1. Invite the prospective employee to join Deel, assign them to their designated department, and deliver their offer letters through the Deel platform.
1. Announce it to the rest of the team on Slack in the [#announcements channel](https://flowforgeworkspace.slack.com/archives/C06EQCXUGA3)
1. [Create an onboarding issue](https://github.com/FlowFuse/admin/issues/new/choose){rel="nofollow"} on the admin GitHub project
1. Send the candidates the Modified PIIAA Agreement. It is stored in the FlowFuse Admin Drive in the Legal > IP Folder. There are different templates for different countries. If it is the first time hiring in the country, we will need to engage Legal to create the template. Make sure to ask them to have local counsel review.
  
   Signing Requirements: The PIIAA must be signed on or before the candidate's first day. Use the template that corresponds to their state/country. After execution, save the signed document in Legal → IP → Signed PIIAA.
   * Contractors who DO NOT need PIIAA:
     *   Direct contractors with FlowFuse
     *   Their existing contract already includes IP assignment
   * Contractors who DO need PIIAA:
     *   Contractors hired through Deel Shield
     *   Because their IP assignment is NOT automatically transferred
1. Add their stock options to the stock option request spreadsheets
   * Copy or create a new monthly request sheet from [this template](https://docs.google.com/spreadsheets/d/1AG75qONjObto3g2oJH_SC4gjgRsYJmKUI3fjrZuktm0/edit#gid=1970623412){rel="nofollow"}
1. [Close the role](/handbook/peopleops/hiring/#closing-a-job)
1. Update the handbooks so that the role isn't listed as an opening on the website ([Reference PR](https://github.com/FlowFuse/website/pull/3300)) 

### Background Screening

FlowFuse will utilize Deel to conduct background checks on individuals in the
United States. These checks are essential for compliance purposes, particularly
for employees located in the US.

### Tax Residency

During the onboarding process on our EOR provider platform, candidates must either be citizens of the country where they will be working or possess a valid visa. Any requests for changes in tax residency should be communicated to the HR department and CEO at least 2 months in advance. This includes changing States within the US.

## Onboarding

Before your first day of work at FlowFuse, you will receive an email requesting your GitHub username
and preferred company email address. An issue will be created on our [internal issue tracker](https://github.com/FlowFuse/admin/issues/new/choose){rel="nofollow"} with steps for you and
the team to complete once you start.

On the day you start, a message will be sent to your personal email address to grant you access to your FlowFuse email address.
This process ensures that all new joiners receive access either on their first day or up to 24 hours before their official start date.

Upon setting up your password, it is essential to [turn on the 2-Step Verification](https://support.google.com/accounts/answer/185839?hl=en&co=GENIE.Platform%3DDesktop). Failure to do so may result in being locked out of your account after a few days, requiring assistance from an admin to regain access.

Once your FlowFuse email is set up, you will have access to invitations to other services and platforms, including 1Password. [Set this up](https://support.1password.com/explore/team-member/) as soon as possible to add a security layer to all your FlowFuse accounts.

On your first day, once your email and 1Password accounts are set up, it is important to prioritize
gaining access to Slack, the FlowFuse GitHub organization, and completing your onboarding issue.
Additionally, your manager will assign tasks for you to begin working on during
your first week. Further details on Onboarding will be available in your Onboarding issue. 

### Onboarding Buddy

As part of your onboarding, you'll be assigned an onboarding buddy who is there to help make you successful.
The onboarding buddy should be a person outside of your team. This helps ensure we're building a culture across the company.
You should reach out to your onboarding buddy regularly in your first 90 days.

The onboarding buddy’s responsibilities are:
- Welcome the new team member and act as a primary point of contact during the first 90 days.
- Introduce themselves in Slack on the new team member’s first day to establish an immediate connection.
- Help the team member navigate internal tools, processes, and communication channels.
- Check in periodically to ensure the team member is settling in and answer basic questions.
- Direct the team member to the right documentation or people when needed.

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

At FlowFuse, we conduct Exit Interviews for employees who choose to leave the company voluntarily.
This provides us with valuable feedback on their experience, reasons for leaving, and areas for
improvement. Their manager schedules these interviews during the employee's last week to ensure
they have an opportunity to share their insights. Our aim is to use this feedback to enhance our
workplace culture and practices. Please follow the [predefined questions](https://docs.google.com/document/d/1az9PddrvVk1TH1TPXJGXmavxBpo9OpcWbylN4gQBoe8/edit){rel="nofollow"} to guide the conversation.

### Equipment return or buyback
All company-issued devices must either be returned or may be purchased by the employee. Devices remain company property for the first three (3) years of an employee’s tenure and must be returned unless the employee chooses to purchase them. A buyback amount will be established by the team. Once the buyback amount is confirmed, the employee may choose to purchase the device.

If the employee chooses to buy the device:
- Share the [SVB wiring](https://drive.google.com/file/d/1943zVMYXA7B-EfjM4GRwN_lsAGQFHQj5/view?usp=sharing) details with the employee:
- Notify Finance in advance by emailing billing@flowfuse.com that a wire transfer is expected.
- Instruct the employee to send a copy of the wire transfer confirmation once the payment has been completed.

US employees should follow these instructions:
If they would prefer to send a check instead of a wire transfer, mail the check to the SVB address as shown in the wire instructions, with Attn: Branch Operations. In the memo line for the check, include FlowFuse and the FlowFuse account number. Mail the check via Certified Mail, and message the CEO with the tracking number.

If the employee chooses to return the device:
- This should be discussed with their manager.

### Offboarding Issue

After announcing the departure in Slack, the manager will create a new offboarding issue for each instance of a team member leaving.
The template maintained on GitHub, create a new issue though [this link](https://github.com/FlowFuse/admin/issues/new/choose).

Final pay consists of the statutory minimal payment dictated by our payroll provider Deel, and an optional extra severance package.
Such a package might be dependent on on business requirements, standing of the employee, among other factors.

The company will reimburse any outstanding expenses that comply with [our handbook](/handbook/peopleops/expenses/#reimbursement)
