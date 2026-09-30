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

Post in **#proj-flowfuse-demos** explaining which script you're about to record,
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

## Demo Candidates
The following is an outstanding list of wanted demos - if you claim a demo on this page, make sure to drop a message in **#proj-flowfuse-demos**. Each demo builds one of the following use cases. They are stretch goals: you will probably not deliver the full spec in an hour, and where you stop is part of the result. If you record more than one demo, cover all three use cases before you record a second demo of the same one.

Every use case is written the same way:

- **The story:** who has the problem, and the moment it hurts. 
- **FlowFuse on show:** the platform features the story should feature. Tick them off as you go. A feature you meant to use but could not is a GitHub issue, so make sure you document.
- **What to build**, **the hour** and **done looks like:** the spec, a suggested pace, and the moment that proves it worked.

### Production optimisation: wells and pumping

**The story:** A production engineer looks after 40 rod-pumped wells spread over a field with patchy cellular coverage. Every pump runs at the speed it was set to months ago. Some are pumping off, wasting power and hammering their rods. Others are running too slowly and leaving oil in the ground. She finds out which is which by driving out to each pad. The demo shows her doing it from a dashboard instead: the platform spots the problem wells, AI recommends a new setting, she approves it, and the change reaches the pump controller. The same pattern applies to any pumping station, such as water, wastewater or transfer pumps.

**FlowFuse on show:**

| Step | Feature |
|---|---|
| Read the pump controller or drive | Edge instance on a gateway at the pad, [Modbus](/docs/flowfuse-nodes/edge/modbus/) certified node |
| Survive the cellular link dropping | [Store and forward](/blueprints/getting-started/store-and-forward/) blueprint on the edge instance |
| Move data from pads to the field view | [Team MQTT Broker](/docs/user/teambroker/) with the FlowFuse MQTT nodes, topics as `field/pad/well/measurement` |
| Keep well tests, settings history and approvals | [FlowFuse Tables](/docs/user/ff-tables/) on the hub instance, queried with the Query node |
| Classify the well and recommend a setting | [LLM nodes](/docs/flowfuse-nodes/ai/llm-nodes/) on the hub instance |
| Give each engineer their own wells | Dashboard with personalised multi-user views |
| Roll the improved edge flow to every pad | Device groups and a DevOps Pipeline, with a snapshot before the change |
| Build faster | FlowFuse Expert in the editor, for the Modbus mapping, the SQL and the dashboard |

**Sources:**
- A rod pump controller or VSD (variable speed drive) over Modbus TCP or RTU: strokes per minute or drive frequency, motor current, motor power, runtime, and run/stop state.
- The surface dynamometer card from the rod pump controller: load against rod position for each stroke. This is the richest single signal on a rod-pumped well.
- For ESPs (electric submersible pumps): intake pressure, discharge pressure, motor temperature and vibration from the downhole gauge, read through the drive.
- Tubing and casing pressure, and a flow meter or the latest well test for production rate.
- Oil price and power tariff as configuration.
- For the demo: real field hardware is rarely available, so use a pump bench, with a VSD driving a pump over Modbus TCP and real pressure and flow transmitters. The rule on real data still applies: a bench you can throttle beats a simulator.

**What to build:**
- **Edge flow, per pad:** poll the controller, compute pump fillage and energy per stroke locally, buffer when the link is down, and publish to the Team MQTT Broker. Accept a setpoint over MQTT and write it to the controller's holding register, only if it is inside limits configured on the edge. The edge enforces the safe range itself, whatever the hub sends.
- **Tables schema on the hub:** `wells`, `well_tests`, `readings_hourly`, `recommendations` (well, current and proposed setting, reason, expected effect, status) and `setpoint_changes` (who approved, when, and the before and after values). Use Expert to generate the SQL.
- **AI in the loop:** every hour, an LLM node receives each well's summary: fillage trend, card features such as peak and minimum load, current, rate against potential, and energy per barrel. It returns a classification (normal, fluid pound, gas interference, worn pump or unknown), a recommended setting, the expected effect, and the evidence it used. The response is parsed into the `recommendations` table, never acted on directly.
- **Approval:** the engineer approves, edits or rejects each recommendation on the dashboard. Approval publishes the setpoint to the pad, and the write, the person and the values are stored in `setpoint_changes`.
- **Verification:** 24 hours after a change, compare the measured effect with the prediction and write both to the recommendation.

**Dashboard:**
- Field view: every well with its state (producing, down or pumped off), rate against potential, and deferred production today in barrels and in money.
- Well view: rate, runtime percentage, fillage and kWh per barrel against the last 7 days, and the latest dynamometer card drawn over the well's reference card.
- Recommendations queue: pending changes, ranked by money at stake, each with approve, edit and reject.
- Two rankings side by side: wells by deferred production, and wells by energy per barrel. The two lists differ, and both matter.

**Alerting:**
- Well down unexpectedly: notify the field operator immediately, with the last card and 30 minutes of motor current attached.
- Pad gateway offline: covered by FlowFuse instance monitoring and email alerts. Show it once, by pulling the network cable on camera.
- Fillage below the threshold for 3 consecutive strokes or more: raise a recommendation, not an alarm.
- Motor current or temperature trending up over 24 hours at an unchanged setting: notify maintenance. This is early wear, not a production problem.

**The hour:**
- 0–15 min: edge instance on the gateway, Modbus connected, readings on MQTT.
- 15–30 min: hub instance, Tables schema, field and well dashboards.
- 30–45 min: LLM recommendation loop and the approval flow.
- 45–60 min: approve a change on camera and watch the bench respond, then push an edge flow update through the pipeline to the device group.

**Done looks like:** A recommendation made by AI, approved by a person, written to the drive through the edge, with the pump's response visible on the dashboard and the whole trail in FlowFuse Tables.

### AI context orchestration: turning data into MCP

**The story:** A reliability engineer at a plant has approval to use Claude or Copilot, but it knows nothing about the plant. The answer to "why did line 2 keep stopping last week?" is spread across a PLC, a SQL historian, CSV exports from a legacy MES dropped on a file share, and a PDF fault code manual. Nobody has joined these, and IT will not open the historian to an AI tool. The demo shows the engineer using that same approved agent, connected to FlowFuse, to build a governed context layer. The agent then answers the question, and so can any other approved agent.

**FlowFuse on show:**

| Step | Feature |
|---|---|
| Agent builds the integration flows | [FlowFuse MCP server](/docs/user/mcp/): an external agent (Claude, Copilot, ChatGPT) with a team grant builds and deploys the flows |
| Access is limited to what was granted | The consent screen: specific teams only, and an expiry. Show it on camera |
| Reach the live device | [OPC UA](/docs/flowfuse-nodes/edge/opcua/) or [Modbus](/docs/flowfuse-nodes/edge/modbus/) certified nodes on an edge instance |
| Curate the context | [FlowFuse Tables](/docs/user/ff-tables/): asset model, fault codes, cleaned MES records, and document chunks |
| Parse the manuals | The [RAG chat agent](/blueprints/ai/rag-chat-agent/) blueprint pattern, with chunks stored in Tables |
| Expose the context | [MCP nodes](/docs/flowfuse-nodes/mcp/): MCP Tool, MCP Resource, MCP Prompt and MCP Response |
| Secure the endpoint | FlowFuse User Authentication on the instance, with a token for the agent |
| Ask from inside FlowFuse | FlowFuse Expert in Insights mode (beta), connected to the same MCP server |
| Promote from test to production | A DevOps Pipeline from a dev instance to a production instance, with snapshots |
| Prove what happened | The team audit log, showing each action the agent took |

**Sources (use at least three, of different kinds):**
- A live device over OPC UA or Modbus.
- A SQL database or historian, queried read-only.
- Files: CSV or Excel exports from a legacy system.
- Documents: SOPs, maintenance manuals or fault code tables as PDF or text.
- A REST API from an ERP, MES or CMMS.

**What to build:**
- **Let the agent do the building.** Connect your approved agent to the FlowFuse MCP server, grant it one team, and ask it to create the application and instances and build the ingestion flows. Step in with the editor and Expert where it gets stuck. Where it got stuck is a finding.
- **Tables as the context store:** `assets` (site, line, machine, tag names, units), `fault_codes` (code, meaning, recommended action, source document and page), `downtime_events` cleaned from the MES exports, and `doc_chunks` for the manuals. Joining and cleaning happens once here, not every time the agent asks.
- **Tools for questions, not for sources.** One MCP Tool node per question an engineer actually asks. `get_downtime_by_line(line, start, end)` beats `run_sql(query)`. Each tool has a clear name, a description written for the agent, a typed input schema, and output with units, timestamps and asset names.
- **An MCP Resource for the asset model**, so the agent can resolve "line 2" to the right machines and tags without guessing.
- **An MCP Prompt** that packages a common job, such as "investigate a downtime spike", which steps through the right tools in order.
- **Read-only by default.** If a tool writes, name it for what it writes and require confirmation.
- **Promote it.** Build on a dev instance, then push through a DevOps Pipeline to production, so the MCP server the agents use in production is the one you tested.

**Evaluation:**
- Before you start, write down five questions with known answers, at least two of which need more than one source. For example: "Which line had the most downtime last week, and what does the manual say about its most frequent fault code?"
- At the end, ask all five on camera, in Insights mode and in the external agent. For each answer record correct, partly correct or wrong, and which tools were called.
- Open the audit log and show what the agent did during the build.

**The hour:**
- 0–10 min: connect the external agent to FlowFuse on camera, including the consent screen.
- 10–35 min: the agent builds the ingestion flows and the Tables schema, with you stepping in where needed.
- 35–50 min: MCP tools, resource and prompt, with authentication switched on.
- 50–60 min: the five questions in both agents, then the audit log.

**Done looks like:** Two different agents answer the same cross-source question correctly from the same MCP server, the tool calls are visible, and the audit log shows how it was built.

### Smart alerting: alerts people can act on

**The story:** It is 02:40 on night shift and the filler on line 3 has alarmed for the fourth time. The engineer on call gets the same message as always: a tag name and a value. They cannot tell whether it is the same fault as last Tuesday, whether anyone changed anything, or who fixed it last time. By morning three people have looked at it, the day shift knows nothing about it, and it happens again at 09:15. The demo shows the same fault arriving in Slack as one incident, addressed to the engineer by name, with its context, a probable cause, and what fixed it last time. It gets resolved, and the resolution feeds the next incident and the shift report.

**FlowFuse on show:**

| Step | Feature |
|---|---|
| Collect alarms and process values | Edge instance with [OPC UA](/docs/flowfuse-nodes/edge/opcua/) or [Modbus](/docs/flowfuse-nodes/edge/modbus/), publishing to the [Team MQTT Broker](/docs/user/teambroker/) |
| Store every alarm, incident, resolution and report | [FlowFuse Tables](/docs/user/ff-tables/) on the hub instance, as the system of record for alerting |
| Find similar past incidents | The Query node against Tables, with SQL generated by Expert |
| Draft the probable cause | [LLM nodes](/docs/flowfuse-nodes/ai/llm-nodes/), grounded in what the Query node returned |
| Find the right procedure | [RAG chat agent](/blueprints/ai/rag-chat-agent/) blueprint pattern over the SOPs |
| Greet the engineer in Slack | A Slack app posting from the flow, mentioning the assigned engineer, with buttons that call back into an HTTP endpoint on the instance |
| Incident console and "my incidents" | Dashboard with personalised multi-user views |
| Shift report | [PDF report generator](/blueprints/manufacturing/pdf-report-generator/) blueprint |
| Ask about the night | MCP nodes exposing incidents from Tables, queried in Insights mode (beta) or an external agent |
| Watch the watcher | FlowFuse instance monitoring and email alerts on the alerting instance itself |

**Sources:**
- Alarms and process values from a PLC or SCADA over OPC UA, Modbus or MQTT.
- Work orders from a CMMS, if you have access to one.
- SOPs and troubleshooting guides as documents.
- The shift roster, as a table in Tables, with each engineer's Slack user ID.
- A Slack workspace where you can install an app. Use a demo workspace, not the company one, so nothing private appears on camera.

**What to build:**
- **Tables schema:** `alarm_events` (every raw alarm), `incidents` (grouped alarms, severity, owner, state, and times raised, acknowledged and resolved), `incident_context` (attached trends, the matching SOP section, and similar past incidents), `resolutions` (confirmed cause and the action taken), `shift_roster` (engineer, assets, shift times, Slack user ID) and `shift_reports`. Store the Slack message ID on each incident so every update lands in the same thread.
- **Grouping:** related alarms within a short window become one incident with one notification, not one message per tag. Chattering alarms are suppressed, but still counted in `alarm_events`.
- **Enrichment:** each incident gets the last 30 minutes of related trends, the matching SOP section, and the three most similar past incidents with their resolutions, found with a SQL query on asset, alarm and time of day.
- **Probable cause:** an LLM node receives only that assembled context and returns a ranked list of likely causes, each with its evidence. It is labelled as a probable cause, never stated as fact, and "not enough information" is an acceptable answer.
- **The Slack greeting:** the incident goes to whoever is on shift for that asset in `shift_roster`, as a Slack message that greets them by name and hands them the problem: what happened and where, how long it has been going on, the probable cause with its evidence, what fixed the most similar past incident and who fixed it, the SOP section to follow, and a link to the incident view on the dashboard. For example: "@Sam, the filler on line 3 has stopped 4 times since 02:10 on a low-pressure alarm. Most likely cause: a blocked supply filter. Pressure dropped before each stop, and the same fault on 14 Sep was cleared by replacing the filter (Priya). SOP 7.2 covers it."
- **Act from Slack:** the message has Acknowledge, Resolve and "Not me" buttons. Slack calls an HTTP In endpoint on the instance, which checks Slack's request signature before it changes anything in Tables. "Not me" hands the incident to the next engineer on the roster for that asset. Resolve asks for the confirmed cause and the action taken, so resolution capture happens where the engineer already is.
- **One thread per incident:** new alarms in the same incident, escalations and the resolution are posted as replies in the incident's thread, not as new messages.
- **Escalation:** if nobody acknowledges within a configured time, the flow mentions the shift lead in the thread, then the next level. Escalation stops as soon as the incident is resolved.
- **Resolution capture:** closing an incident requires confirming or correcting the cause and saying what was done. That row in `resolutions` is what makes the next similar incident faster, so show the second occurrence finding the first.
- **Shift report:** at shift end, an LLM node summarises incidents raised and resolved, what is still open and who owns it, and what the next shift should watch. Every line links back to an incident. It is stored in `shift_reports`, rendered to PDF, and posted to the team's Slack channel at handover, with open incidents linked to their threads.
- **Ask the night:** expose `incidents`, `resolutions` and `shift_reports` as MCP tools, so the incoming supervisor can ask "what happened on nights, and is anything still open on line 3?"

**Dashboard:**
- Open incidents with severity, age, owner and acknowledgement state, and a "my incidents" view per logged-in user.
- Incident view: timeline, attached trends, probable causes with evidence, and similar past incidents with how they were fixed.
- Alarm health: alarms per operator per hour, the 10 most frequent alarms, and chattering alarms. Industry guidance such as ISA-18.2 treats more than a handful of alarms per operator per hour as a flood, so show where the demo stands against that.
- Time to acknowledge and time to resolve, per shift.

**The hour:**
- 0–15 min: edge instance, alarm collection, Tables schema.
- 15–35 min: grouping, enrichment and the probable cause.
- 35–50 min: the Slack greeting, then acknowledge and resolve from Slack on camera, ideally on a phone.
- 50–60 min: trigger the same fault again and show the first incident being found, then generate the shift report and ask about it through MCP.

**Done looks like:** A real fault reaches the assigned engineer in Slack as one message, by name, with context and a probable cause. They resolve it from Slack and the resolution is captured. The repeat fault finds that resolution, and the whole sequence appears in the shift report.

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
