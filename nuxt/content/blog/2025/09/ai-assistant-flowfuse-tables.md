---
title: Query Your Database with Natural Language Using FlowFuse Expert
navTitle: Query Your Database with Natural Language Using FlowFuse Expert
---

Getting data from your database used to mean writing SQL queries. Not anymore. The FlowFuse Expert now lets you ask for what you want in plain English and automatically generates the SQL for you in query node.

<!--more-->

## Removing Technical Barriers

Industrial operations generate massive amounts of valuable data from sensors, equipment, and PLCs. This data can drive optimization and cost savings, but extracting insights often requires SQL skills that not every team member possesses.

FlowFuse already makes it simple to connect to databases and build data flows using its Query nodes. However, the need to manually write SQL queries has remained a significant barrier for many users.

To address this, FlowFuse continues its mission of making industrial automation accessible to everyone, regardless of coding expertise. Features like the FlowFuse Expert have already reduced complexity by enabling users to create custom functions and UI components using natural language.

With FlowFuse [2.21](/blog/2025/08/flowfuse-release-2-21/), this ease of use extends to database queries as well. Users can now ask questions in plain English and have SQL automatically generated, removing the last major hurdle and empowering a broader audience to gain actionable insights quickly and easily.

## Getting Started

Let's see how this works with a practical example. This feature combines two FlowFuse components:

- **FlowFuse Tables** provides the database connectivity and Query nodes
- **FlowFuse Expert** adds the natural language processing capability that converts plain English into SQL

Before you begin, make sure FlowFuse Tables is activated in your FlowFuse team. For more information, refer to [Getting Started with FlowFuse Tables](/blog/2025/08/getting-started-with-flowfuse-tables/). Then, import the following flow and deploy it to create a `sensor_readings` table for practice:



::render-flow
---
height: 300
flow: "W3siaWQiOiJlOWEzYjcxZDQwYWRkZDhiIiwidHlwZSI6Imdyb3VwIiwieiI6ImQ3NGFmZGEzZTgzYTY0NGUiLCJuYW1lIjoiQ3JlYXRlIFRhYmxlIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyI0OGIxMzgwZmY3YmZlNzE2IiwiNDRiYjg3NTBkOTYxZTQxNSIsIjRhMzk3NmUwNjJiMmRkZDIiXSwieCI6Mjc0LCJ5Ijo0MTksInciOjU3MiwiaCI6ODJ9LHsiaWQiOiI0OGIxMzgwZmY3YmZlNzE2IiwidHlwZSI6ImluamVjdCIsInoiOiJkNzRhZmRhM2U4M2E2NDRlIiwiZyI6ImU5YTNiNzFkNDBhZGRkOGIiLCJuYW1lIjoiIiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6dHJ1ZSwib25jZURlbGF5IjoiMSIsInRvcGljIjoiIiwieCI6MzcwLCJ5Ijo0NjAsIndpcmVzIjpbWyI0NGJiODc1MGQ5NjFlNDE1Il1dfSx7ImlkIjoiNDRiYjg3NTBkOTYxZTQxNSIsInR5cGUiOiJ0YWJsZXMtcXVlcnkiLCJ6IjoiZDc0YWZkYTNlODNhNjQ0ZSIsImciOiJlOWEzYjcxZDQwYWRkZDhiIiwibmFtZSI6IkNyZWF0ZSBUYWJsZSIsInF1ZXJ5IjoiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcHVibGljLnNlbnNvcl9yZWFkaW5ncyAoIChcbiAgICBpZCBTRVJJQUwgUFJJTUFSWSBLRVksXG4gICAgdGltZXN0YW1wIFRJTUVTVEFNUFRaIE5PVCBOVUxMIERFRkFVTFQgTk9XKCksXG4gICAgc2Vuc29yX2lkIFZBUkNIQVIoNTApIE5PVCBOVUxMLFxuICAgIGxvY2F0aW9uIFZBUkNIQVIoMTAwKSxcbiAgICB0ZW1wZXJhdHVyZSBERUNJTUFMKDUsMilcbik7XG4iLCJzcGxpdCI6ZmFsc2UsInJvd3NQZXJNc2ciOjEsIngiOjU1MCwieSI6NDYwLCJ3aXJlcyI6W1siNGEzOTc2ZTA2MmIyZGRkMiJdXX0seyJpZCI6IjRhMzk3NmUwNjJiMmRkZDIiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZDc0YWZkYTNlODNhNjQ0ZSIsImciOiJlOWEzYjcxZDQwYWRkZDhiIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzQwLCJ5Ijo0NjAsIndpcmVzIjpbXX0seyJpZCI6IjY4ZmJjZGIwM2UzYTUzNDYiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiZDc0YWZkYTNlODNhNjQ0ZSIsInN0eWxlIjp7InN0cm9rZSI6IiNiMmIzYmQiLCJzdHJva2Utb3BhY2l0eSI6IjEiLCJmaWxsIjoiI2YyZjNmYiIsImZpbGwtb3BhY2l0eSI6IjAuNSIsImxhYmVsIjp0cnVlLCJsYWJlbC1wb3NpdGlvbiI6Im53IiwiY29sb3IiOiIjMzIzMzNiIn0sIm5vZGVzIjpbIjRmMjRhYjViNTYyOGExYmEiLCJmYmYzNmE3YjNjNTk0NjFkIl0sIngiOjg1NCwieSI6NDE5LCJ3IjozOTIsImgiOjgyfSx7ImlkIjoiNGYyNGFiNWI1NjI4YTFiYSIsInR5cGUiOiJjYXRjaCIsInoiOiJkNzRhZmRhM2U4M2E2NDRlIiwiZyI6IjY4ZmJjZGIwM2UzYTUzNDYiLCJuYW1lIjoiIiwic2NvcGUiOm51bGwsInVuY2F1Z2h0IjpmYWxzZSwieCI6OTQwLCJ5Ijo0NjAsIndpcmVzIjpbWyJmYmYzNmE3YjNjNTk0NjFkIl1dfSx7ImlkIjoiZmJmMzZhN2IzYzU5NDYxZCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNzRhZmRhM2U4M2E2NDRlIiwiZyI6IjY4ZmJjZGIwM2UzYTUzNDYiLCJuYW1lIjoiZGVidWcgNiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjoxMTQwLCJ5Ijo0NjAsIndpcmVzIjpbXX0seyJpZCI6IjAxMTM3ZDAyYzQ4MzI5NjIiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiZDc0YWZkYTNlODNhNjQ0ZSIsIm5hbWUiOiIiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbImU0NjVkNDMyOGQ5ZDQyZDkiLCJmODI2OWNmNDEyYjQyMDBmIiwiMmNlODAxNjQzZTAxNTEwYiIsIjQwZDQ4ZmZiOTBlNTY3NGEiXSwieCI6Mjc0LCJ5Ijo1MTksInciOjk3MiwiaCI6ODJ9LHsiaWQiOiJlNDY1ZDQzMjhkOWQ0MmQ5IiwidHlwZSI6ImluamVjdCIsInoiOiJkNzRhZmRhM2U4M2E2NDRlIiwiZyI6IjAxMTM3ZDAyYzQ4MzI5NjIiLCJuYW1lIjoiSW5zZXJ0IHNpbXVsYXRlZCBEYXRhIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4Ijo0MjAsInkiOjU2MCwid2lyZXMiOltbIjQwZDQ4ZmZiOTBlNTY3NGEiXV19LHsiaWQiOiJmODI2OWNmNDEyYjQyMDBmIiwidHlwZSI6ImRlYnVnIiwieiI6ImQ3NGFmZGEzZTgzYTY0NGUiLCJnIjoiMDExMzdkMDJjNDgzMjk2MiIsIm5hbWUiOiJkZWJ1ZyAyIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjExNDAsInkiOjU2MCwid2lyZXMiOltdfSx7ImlkIjoiMmNlODAxNjQzZTAxNTEwYiIsInR5cGUiOiJ0YWJsZXMtcXVlcnkiLCJ6IjoiZDc0YWZkYTNlODNhNjQ0ZSIsImciOiIwMTEzN2QwMmM0ODMyOTYyIiwibmFtZSI6IiIsInF1ZXJ5IjoiSU5TRVJUIElOVE8gcHVibGljLnNlbnNvcl9yZWFkaW5ncyAoc2Vuc29yX2lkLCB0aW1lc3RhbXAsIGxvY2F0aW9uLCB0ZW1wZXJhdHVyZSkgXG5WQUxVRVMgKCRzZW5zb3JfaWQsICR0aW1lc3RhbXAsICRsb2NhdGlvbiwgJHRlbXBlcmF0dXJlKTtcbiIsInNwbGl0IjpmYWxzZSwicm93c1Blck1zZyI6MSwieCI6OTMwLCJ5Ijo1NjAsIndpcmVzIjpbWyJmODI2OWNmNDEyYjQyMDBmIl1dfSx7ImlkIjoiNDBkNDhmZmI5MGU1Njc0YSIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiJkNzRhZmRhM2U4M2E2NDRlIiwiZyI6IjAxMTM3ZDAyYzQ4MzI5NjIiLCJuYW1lIjoiR2VuZXJhdGUgbGFzdCA3IGRheXMgc2Vuc29yIGRhdGEiLCJmdW5jIjoiLy8gR2VuZXJhdGUgc2ltdWxhdGVkIHNlbnNvciByZWFkaW5ncyBmb3IgdGhlIGxhc3QgNyBkYXlzLCBhdCBldmVyeSBldmVuIGhvdXJcbmxldCBub3cgPSBuZXcgRGF0ZSgpO1xubGV0IHN0YXJ0ID0gbmV3IERhdGUobm93LmdldFRpbWUoKSAtICg3ICogMjQgKiA2MCAqIDYwICogMTAwMCkpOyAvLyA3IGRheXMgYWdvXG5sZXQgcmVhZGluZ3MgPSBbXTtcblxuLy8gQ29sbGVjdCBhbGwgcmVhZGluZ3MgZmlyc3RcbmZvciAobGV0IHRzID0gbmV3IERhdGUoc3RhcnQpOyB0cyA8PSBub3c7IHRzLnNldEhvdXJzKHRzLmdldEhvdXJzKCkgKyAxKSkge1xuICAgIGlmICh0cy5nZXRIb3VycygpICUgMiA9PT0gMCkge1xuICAgICAgICByZWFkaW5ncy5wdXNoKHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAgIHNlbnNvcl9pZDogXCJzZW5zb3ItMVwiLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUodHMpLCAvLyBjbG9uZSB0aW1lc3RhbXBcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogXCJMYWIgQVwiLFxuICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiBOdW1iZXIoKDIwICsgTWF0aC5yYW5kb20oKSAqIDEwKS50b0ZpeGVkKDIpKSAvLyBFbnN1cmUgbnVtYmVyIHR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vLyBTZW5kIHRoZW0gb25lIGJ5IG9uZSB3aXRoIGRlbGF5XG5yZWFkaW5ncy5mb3JFYWNoKChyZWFkaW5nLCBpKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG5vZGUuc2VuZChyZWFkaW5nKTtcbiAgICB9LCBpICogMjAwKTsgLy8gMjAwbXMgZGVsYXkgYmV0d2VlbiBtZXNzYWdlc1xufSk7XG5cbnJldHVybiBudWxsOyAvLyBQcmV2ZW50IGltbWVkaWF0ZSBtc2cgc2VuZGluZ1xuIiwib3V0cHV0cyI6MSwidGltZW91dCI6MCwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4Ijo3MDAsInkiOjU2MCwid2lyZXMiOltbIjJjZTgwMTY0M2UwMTUxMGIiXV19LHsiaWQiOiI4OWM1MjY4MDI2M2U2Y2JhIiwidHlwZSI6Imdsb2JhbC1jb25maWciLCJlbnYiOltdLCJtb2R1bGVzIjp7IkBmbG93ZnVzZS9uci10YWJsZXMtbm9kZXMiOiIwLjEuMCJ9fV0="
---
::



After deployment, press the "Insert simulated Data" inject button to populate your table with a week's worth of hourly sensor readings. This sample data will help you explore Query node capabilities.

> **Note:** FlowFuse Tables is currently available for Enterprise users only.

Now, let us test the natural language querying powered by the FlowFuse Expert:  
1. Add an Inject node to your flow  
2. Connect it to your Query node  
3. Open the Query node and locate the new "Assistant" codelens  
4. Enter: "Show me all readings from today"  
5. Click **Ask the FlowFuse Expert**. The FlowFuse Expert will process your natural language request and automatically generate the corresponding SQL query in the Query node's SQL field. Click Done.  
6. Connect a Debug node to see the results  
7. Deploy the flow and click the Inject button to test it.

![FlowFuse Expert in Query Node](/blog/2025/09/images/flowfuse-ai-assistance-table-demo.gif){data-zoomable}  
_FlowFuse Expert in Query Node_

## Practical Query Examples

With your sample data in place, here are some immediately useful queries to try:

### Performance Analysis

**Track temperature averages:**  
Prompt: "What's the average temperature for this week?"

<lite-youtube videoid="MZxrI9SEegE" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

**Identify peak readings:**  
Prompt: "Find the highest temperature reading this month"

<lite-youtube videoid="jDIRH2i_1Uk" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

### Time-Based Analysis

**Hourly patterns:**  
Prompt: "Average temperature per hour today"

<lite-youtube videoid="m4L9ZHE6tdI" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

## Advanced Query Capabilities

Beyond basic queries, the FlowFuse Expert can handle sophisticated analysis:

**Complex filtering:**  
Prompt: "Show readings where temperature > 20, temperature < 25, and temperature ≠ 22"

<lite-youtube videoid="MtzcbmFg1-4" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

**Statistical operations:**  
Prompt: "Calculate standard deviation of temperature readings this month"

<lite-youtube videoid="aJ8znXOn9Hc" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

These examples demonstrate how the FlowFuse Expert simplifies advanced analysis, turning complex database operations into easy, natural-language requests.

## What's Next

The FlowFuse Expert now brings natural language capabilities to database queries in FlowFuse Tables. This removes the complexity of SQL, allowing industrial teams to extract insights using simple conversational commands.

FlowFuse's mission has always been to democratize industrial automation and reduce complexity for engineers and operational teams. As part of this commitment, more AI-powered features are on the roadmap to simplify industrial workflows even further.

Ready to transform how your team works with data? [Book a demo](https://app.flowfuse.com/account/create) and see how FlowFuse makes building industrial applications simple and accessible.