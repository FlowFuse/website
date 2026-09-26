---
title: "Shop-Floor Demos"
---
# Shop-floor monitoring demos

As a manufacturing iPaaS provider, AI and feature development needs to be constantly tested in scenarios as close as possible to real world usage. This helps quicker iteration on our AI application-building capabilities, and shows external stakeholders and future customers the capabilities FlowFuse has and the pace of our development.

Two outputs are required from this program:

1. Footage as _input_ for cleanly recorded demo's we can put in front of prospects and users, showing the platform being used end to end.
2. GitHub issues for **every** point of friction found. With it, the AI engineering team can rank what to fix now, next month, and later.

## The script must be followed

Earlier recordings under this program drifted into loose, improvised tours of
the platform instead of the journey they were meant to record. **That is not
acceptable — the script is the whole point of the exercise, and it must be
followed exactly, in order, start to finish.**

- The script is written and maintained by marketing, not by this page. It is a
  **narrow set of journey steps for an end customer to complete** — not a
  guided tour of FlowFuse, not a showcase of whatever feature the recorder
  finds interesting, and not an opportunity to improvise a better flow on the
  spot. If a step feels slow or awkward, record it as scripted anyway and log
  the friction as a GitHub issue afterwards — do not skip it, reorder it, or
  substitute your own approach.
- Anyone recording a demo is assigned one of the current scripts before they
  start, and records that script only. Do not mix steps from more than one
  script into a single recording.
- If you deviate from the script partway through, that recording is not
  usable as marketing footage. Stop, note what happened, and pick it up again
  as a fresh one-take recording another time — don't try to patch it by
  improvising the rest.
- Anyone at the company can be asked to record one of these demos, regardless
  of rank or job title. You do not need to be an engineer to run a script
  exactly as written — that's the point: it shows what an end customer
  following the same steps would experience.

## Recording and Filming

### What is being demo'd

First and foremost, the product is being tested, not the person filming. The
demo follows the assigned script exactly, showing what an end customer would
experience completing that specific set of journey steps — not a tour of
FlowFuse's capabilities in general.

The recording is a point-to-point representation: no editing, one take. A
demo runs about **10 minutes** — that's the target length a script is written
for, so a completed run should land close to it. If the script cannot be
completed in that time, stop where you are; that's a valid result and shows
where time is being lost.

### Rules for the demo

1. One take. No pauses, no second take when things go south. The product fails if/when things go wrong; that's not the recorder's fault, it shows what went right and wrong.
2. Follow the assigned script exactly, in the order it's written. See [The script must be followed](#the-script-must-be-followed) above.
3. Start from the empty team, on camera. Show it is empty.
4. Use only what's available to customers too.
   - Yes:
     - Blueprints
     - FlowFuse Expert / third-party MCP
     - Docs
     - Google / ChatGPT
   - No:
     - Pre-made flows / snapshots
     - Content you have access to but new users don't
     - Slack hotline to other engineers during the demo
5. Narration is optional. If you do narrate, say what you want to achieve, think, or hope to get as a result, and verbalize details you read and pick up on, or details you wanted to see/read but are missing.
6. When you leave the product — opening the docs, a Google search, initiating a terminal SSH session, or so — record these too.

### Before you record

Post in **#depth-marketing** explaining which script you're about to record,
before you start. This lets marketing track which journeys have been covered
and flag if something's already been recorded or is a priority.

### Setup the demo

1. Install OBS, ensure you can record your screen and audio (see also OBS settings below).
2. Turn on "Do Not Disturb". Ensure your notifications are off, chat and mail closed, no customer names, tokens, or credentials visible at any point. Nothing is edited afterwards, so anything on screen is published.
3. A fresh team, empty, on the tier a customer would have. No pre-existing instances, no library content you made earlier.
4. A data source ready, per the script. Simulated data is fine for now. Where the script calls for a real data source, use real hardware with protocols like:
   1. Modbus TCP
   2. OPC-UA
   3. MQTT + legacy protocol

### OBS settings

OBS is open source video/audio capture software that's great for this demo. Record at least your screen and audio; having your webcam recording would be appreciated.

The settings to work with:

- 1920x1080, 30 fps, full screen capture of the display you will work on.
- Recording format MKV, remux to MP4 afterwards.
- Quality: CRF 20 or 6000 kbps, hardware encoder if available.
- Microphone on a separate audio track, if you're narrating.
- Check free disk space is above 20 GB before starting.
- Record, do not stream.

### Post-demo action items

#### GitHub issues

The list of blockers you ran into, or items to smooth over, should each have an attached issue. Many issues are likely already reported and being scheduled — search for those issues and leave a comment *for each demo you ran into this issue* so engineers can resolve it. Keep a list of the issues.

#### Upload the recording

1. Remux to MP4. Name it `DEMO_<application>_<yourname>_<YYYYMMDD>.mp4`.
2. Upload the file to our company Google Drive. Do not edit or trim.
3. Once the upload finishes, reply in your **#depth-marketing** announcement thread from before you recorded, with a link to the uploaded file.
4. Clean up the team, and other created assets that were part of the demo.
5. Post the list of issues in a text file next to the demo.

#### Iterate on this page

Help other team members by answering any questions you had to figure out yourself to complete your demo, and add them to the handbook where they're not script-specific. Script content itself lives with marketing, not here — flag issues with a script to marketing directly rather than editing it into this page.

#### Ping ZJ

ZJ will review each demo, and the issues we ran into. Point him to the directory where your recording is. If there's a blocker or must-fix item, let him know directly so it can be actioned prior to watching the full demo.
